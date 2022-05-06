import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
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
        [(ngModel)]='inputDealer'
        (change)="getValues()"
      >
        <option [ngValue]="inputDealer"></option>
        <ng-template ng-option-tmp let-item="item" let-item$="item$" let-index="index">
          <!-- // TODO Check if we need to track selection on the many to many entities with selected: boolean-->
          <input id="item-{{index}}" type="checkbox" [checked]="item$.selected" />
          <jhi-dealer-option-view [item]='item'></jhi-dealer-option-view>
        </ng-template>
      </ng-select>
      <div>{{inputDealer|formatDealerId}}</div>
      <div *jhiHasAnyAuthority="'ROLE_DEV'">{{inputDealer|json }}</div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ManyToOneDealerFormControlComponent),
      multi: true
    }
  ]
})
export class ManyToOneDealerFormControlComponent implements OnInit, ControlValueAccessor {

  // TODO Split class from template
  // TODO Use abstract terms for the labels and other elements of the component
  // TODO Add logs and developer views to the component to aid in telemetry
  // TODO Create similar components for other entities
  // TODO Implement entity for many-to-many relationships
  // TODO Add self validation code via NG_VALIDATOR provider


  resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/dealers');

  @HostBinding('attr.id')
  externalId = '';

  @Input() inputDealer: IDealer = {};

  @Output() dealerSelected: EventEmitter<IDealer> = new EventEmitter<IDealer>();

  isSaving = false;

  dealersSharedCollection: IDealer[] = [];

  minAccountLengthTerm = 3;

  dealersLoading = false;
  dealersInput$ = new Subject<string>();
  dealerLookups$: Observable<IDealer[]> = of([]);

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected dealerService: DealerService,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {
    this.getValues();
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

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

  writeValue(value: IDealer): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {
      this.inputDealer = value;
    }
  }

  getValues(): void {
    // eslint-disable-next-line no-console
    console.log("Picking changed values");

    this.dealerSelected.emit(this.inputDealer);
  }

  previousState(): void {
    window.history.back();
  }

  protected updateForm(): void {
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      this.inputDealer
    );
  }

  protected loadRelationshipsOptions(): void {

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing(dealers, this.inputDealer)))
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/no-empty-function
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/no-empty-function
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
