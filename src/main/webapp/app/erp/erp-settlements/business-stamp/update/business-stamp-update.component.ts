import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';

import { IBusinessStamp, BusinessStamp } from '../business-stamp.model';
import { BusinessStampService } from '../service/business-stamp.service';
import { IDealer } from '../../../erp-common/models/dealer.model';
import { IPlaceholder } from '../../../erp-common/models/placeholder.model';
import { DealerService } from '../../../erp-common/services/dealer.service';
import { PlaceholderService } from '../../../erp-common/services/placeholder.service';
import { DealerSuggestionService } from '../../../erp-common/suggestion/dealer-suggestion.service';
import { PlaceholderSuggestionService } from '../../../erp-common/suggestion/placeholder-suggestion.service';
import { IPaymentLabel } from '../../../erp-common/models/payment-label.model';

@Component({
  selector: 'jhi-business-stamp-update',
  templateUrl: './business-stamp-update.component.html',
})
export class BusinessStampUpdateComponent implements OnInit {
  isSaving = false;

  dealersSharedCollection: IDealer[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    stampDate: [],
    purpose: [],
    details: [],
    stampHolder: [null, Validators.required],
    placeholders: [],
  });

  minAccountLengthTerm = 3;

  placeholdersLoading = false;
  placeholderControlInput$ = new Subject<string>();
  placeholderLookups$: Observable<IPlaceholder[]> = of([]);

  stampHoldersLoading = false;
  stampHolderControlInput$ = new Subject<string>();
  stampHolderLookups$: Observable<IDealer[]> = of([]);

  constructor(
    protected businessStampService: BusinessStampService,
    protected dealerService: DealerService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected dealerSuggestionService: DealerSuggestionService,
    protected placeholderSuggestionService: PlaceholderSuggestionService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessStamp }) => {
      this.updateForm(businessStamp);

      this.loadRelationshipsOptions();
    });

    this.loadStampHolders();
    this.loadPlaceholders();
  }

  loadPlaceholders(): void {
    this.placeholderLookups$ = concat(
      of([]), // default items
      this.placeholderControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.placeholdersLoading = true),
        switchMap(term => this.placeholderSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.placeholdersLoading = false)
        ))
      ),
      of([...this.placeholdersSharedCollection])
    );
  }

  loadStampHolders(): void {
    this.stampHolderLookups$ = concat(
      of([]), // default items
      this.stampHolderControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.stampHoldersLoading = true),
        switchMap(term => this.dealerSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.stampHoldersLoading = false)
        ))
      ),
      of([...this.dealersSharedCollection])
    );
  }

  trackDealerByFn(item: IDealer): number {
    return item.id!;
  }

  trackPlaceholdersByFn(item: IPaymentLabel): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const businessStamp = this.createFromForm();
    if (businessStamp.id !== undefined) {
      this.subscribeToSaveResponse(this.businessStampService.update(businessStamp));
    } else {
      this.subscribeToSaveResponse(this.businessStampService.create(businessStamp));
    }
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  getSelectedPlaceholder(option: IPlaceholder, selectedVals?: IPlaceholder[]): IPlaceholder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessStamp>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(businessStamp: IBusinessStamp): void {
    this.editForm.patchValue({
      id: businessStamp.id,
      stampDate: businessStamp.stampDate,
      purpose: businessStamp.purpose,
      details: businessStamp.details,
      stampHolder: businessStamp.stampHolder,
      placeholders: businessStamp.placeholders,
    });

    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      businessStamp.stampHolder
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(businessStamp.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing(dealers, this.editForm.get('stampHolder')!.value))
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }

  protected createFromForm(): IBusinessStamp {
    return {
      ...new BusinessStamp(),
      id: this.editForm.get(['id'])!.value,
      stampDate: this.editForm.get(['stampDate'])!.value,
      purpose: this.editForm.get(['purpose'])!.value,
      details: this.editForm.get(['details'])!.value,
      stampHolder: this.editForm.get(['stampHolder'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
