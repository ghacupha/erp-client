import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDealer } from '../../../entities/dealers/dealer/dealer.model';
import { concat, Observable, of, Subject } from 'rxjs';
import { DataUtils } from '../../../core/util/data-util.service';
import { EventManager } from '../../../core/util/event-manager.service';
import { DealerService } from '../../../entities/dealers/dealer/service/dealer.service';
import { DealerSuggestionService } from '../suggestion/dealer-suggestion.service';
import { ActivatedRoute } from '@angular/router';
import {
  IPrepaymentAccount,
} from '../../erp-prepayments/prepayment-account/prepayment-account.model';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { createRequestOption } from '../../../core/request/request-util';
import { ASC, DESC } from '../../../config/pagination.constants';
import { ApplicationConfigService } from '../../../core/config/application-config.service';

@Component({
  selector: 'jhi-many-to-one-dealer-form-control',
  template: `
    <div class="form-group">
      <label class="form-control-label">Dealer</label>
      <ng-select
        [items]="dealerLookups$ | async"
        bindLabel="dealerName"
        [trackByFn]="trackDealerByFn"
        [minTermLength]="minAccountLengthTerm"
        [loading]="dealersLoading"
        typeToSearchText="Please enter {{minAccountLengthTerm}} or more characters"
        [typeahead]="dealersInput$"
        formControlName="dealer"
      >
        <option [ngValue]="editForm.get('dealer')!.value"></option>
        <ng-template ng-option-tmp let-item="item" let-item$="item$" let-index="index">
          <!-- // TODO Check if we need to track selection on the many to many entities with selected: boolean-->
          <input id="item-{{index}}" type="checkbox" [checked]="item$.selected" />
          <jhi-dealer-option-view [item]='item'></jhi-dealer-option-view>
        </ng-template>
      </ng-select>
      <div *jhiHasAnyAuthority="'ROLE_DEV'">{{editForm.get(['dealer'])!.value|formatDealerId}}</div>
    </div>
    <div *ngIf="editForm.get(['dealer'])!.invalid && (editForm.get(['dealer'])!.dirty || editForm.get(['dealer'])!.touched)">
      <small class="form-text text-danger" *ngIf="editForm.get(['dealer'])?.errors?.required"> This field is required. </small>
    </div>
  `
})
export class ManyToOneDealerFormControlComponent implements OnInit {

  resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/dealers');

  @Input() inputDealer: IDealer = {};

  isSaving = false;

  dealersSharedCollection: IDealer[] = [];

  editForm = this.fb.group({
    dealer: [null, [Validators.required]],
  });

  minAccountLengthTerm = 3;

  dealersLoading = false;
  dealersInput$ = new Subject<string>();
  dealerLookups$: Observable<IDealer[]> = of([]);

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected dealerService: DealerService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  ngOnInit(): void {

    this.updateForm();

    this.loadRelationshipsOptions();

    this.loadDealers();
  }

  search(searchText: string): Observable<IDealer[]> {

    if (searchText === "") {
      return of([])
    }

    return this.http.get<IDealer[]>(
      this.resourceSearchUrl,
      { params: createRequestOption({
          query: searchText,
          page: 0,
          size: 10,
          sort: this.sort(),})}
    );
  }

  sort(): string[] {
    const predicate = 'id';
    const ascending = true;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const result = [predicate + ',' + (ascending ? ASC : DESC)];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadDealers(): void {
    this.dealerLookups$ = concat(
      of([]), // default items
      this.dealersInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.dealersLoading = true),
        switchMap(term => this.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.dealersLoading = false)
        ))
      ),
      of([...this.dealersSharedCollection])
    );
  }

  trackDealerByFn(item: IDealer): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prepaymentAccount = this.createFromForm();

    //  TODO something with this
  }

  protected updateForm(): void {
    this.editForm.patchValue({
      dealer: this.inputDealer
    });

    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      this.inputDealer
    );
  }

  protected loadRelationshipsOptions(): void {

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing(dealers, this.editForm.get('dealer')!.value)))
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));
  }

  protected createFromForm(): IDealer {
    this.inputDealer = this.editForm.get(['dealer'])!.value;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.editForm.get(['dealer'])!.value;
  }


}
