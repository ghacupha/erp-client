import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, LeaseLiabilityScheduleItemService } from '../service/lease-liability-schedule-item.service';
import { LeaseLiabilityScheduleItemDeleteDialogComponent } from '../delete/lease-liability-schedule-item-delete-dialog.component';
import { FilterOptions, IFilterOptions, IFilterOption } from 'app/shared/filter/filter.model';

@Component({
  selector: 'jhi-lease-liability-schedule-item',
  templateUrl: './lease-liability-schedule-item.component.html',
})
export class LeaseLiabilityScheduleItemComponent implements OnInit {
  leaseLiabilityScheduleItems?: ILeaseLiabilityScheduleItem[];
  isLoading = false;

  predicate = 'id';
  ascending = true;
  currentSearch = '';
  filters: IFilterOptions = new FilterOptions();

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  constructor(
    protected leaseLiabilityScheduleItemService: LeaseLiabilityScheduleItemService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: ILeaseLiabilityScheduleItem): number =>
    this.leaseLiabilityScheduleItemService.getLeaseLiabilityScheduleItemIdentifier(item);

  search(query: string): void {
    this.page = 1;
    this.currentSearch = query;
    this.navigateToWithComponentValues();
  }

  ngOnInit(): void {
    this.load();

    this.filters.filterChanges.subscribe(filterOptions => this.handleNavigation(1, this.predicate, this.ascending, filterOptions));
  }

  delete(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): void {
    const modalRef = this.modalService.open(LeaseLiabilityScheduleItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.leaseLiabilityScheduleItem = leaseLiabilityScheduleItem;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending, this.filters.filterOptions, this.currentSearch);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending, this.filters.filterOptions, this.currentSearch);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending, this.filters.filterOptions, this.currentSearch))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
    this.filters.initializeFromParams(params);
    if (params.has('search') && params.get('search') !== '') {
      this.currentSearch = params.get('search') as string;
    }
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.leaseLiabilityScheduleItems = dataFromBody;
  }

  protected fillComponentAttributesFromResponseBody(data: ILeaseLiabilityScheduleItem[] | null): ILeaseLiabilityScheduleItem[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(
    page?: number,
    predicate?: string,
    ascending?: boolean,
    filterOptions?: IFilterOption[],
    currentSearch?: string
  ): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      eagerload: true,
      query: currentSearch,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });
    if (this.currentSearch && this.currentSearch !== '') {
      return this.leaseLiabilityScheduleItemService.search(queryObject).pipe(tap(() => (this.isLoading = false)));
    } else {
      return this.leaseLiabilityScheduleItemService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
    }
  }

  protected handleNavigation(
    page = this.page,
    predicate?: string,
    ascending?: boolean,
    filterOptions?: IFilterOption[],
    currentSearch?: string
  ): void {
    const queryParamsObj: any = {
      search: currentSearch,
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    filterOptions?.forEach(filterOption => {
      queryParamsObj[filterOption.nameAsQueryParam()] = filterOption.values;
    });

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
