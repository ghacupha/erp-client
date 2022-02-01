import { Component, OnInit } from '@angular/core';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, of, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { DealerService } from '../../erp-common/services/dealer.service';
import { IPaymentLabel } from '../../erp-common/models/payment-label.model';
import { Dealer, IDealer } from '../../erp-common/models/dealer.model';
import { PaymentLabelService } from '../../erp-common/services/payment-label.service';
import { PlaceholderService } from '../../erp-common/services/placeholder.service';
import { DealerSuggestionService } from '../../erp-common/suggestion/dealer-suggestion.service';

@Component({
  selector: "jhi-dealer-maintenance",
  templateUrl: './dealer-maintenance-form.component.html'
})
export class DealerMaintenanceFormComponent implements OnInit {
  isSaving = false;

  paymentLabelsSharedCollection: IPaymentLabel[] = [];
  dealersSharedCollection: IDealer[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    dealerName: [null, [Validators.required]],
    taxNumber: [],
    postalAddress: [],
    physicalAddress: [],
    accountName: [],
    accountNumber: [],
    bankersName: [],
    bankersBranch: [],
    bankersSwiftCode: [],
    paymentLabels: [],
    dealerGroup: [],
    placeholders: [],
  });

  minAccountLengthTerm = 3;

  dealersLoading = false;
  dealerGroupInput$ = new Subject<string>();
  dealerLookups$: Observable<IDealer[]> = of([]);

  constructor(
    protected dealerService: DealerService,
    protected paymentLabelService: PaymentLabelService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected dealerSuggestionService: DealerSuggestionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dealer }) => {
      this.updateForm(dealer);
      this.loadRelationshipsOptions();
    });

    this.loadDealers();
  }

  loadDealers(): void {
    this.dealerLookups$ = concat(
      of([]), // default items
      this.dealerGroupInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.dealersLoading = true),
        switchMap(term => this.dealerSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.dealersLoading = false)
        ))
      )
    );
  }

  trackDealerGroupByFn(item: IDealer): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dealer = this.createFromForm();
    if (dealer.id !== undefined) {
      this.subscribeToSaveResponse(this.dealerService.update(dealer));
    } else {
      this.subscribeToSaveResponse(this.dealerService.create(dealer));
    }
  }

  trackPaymentLabelById(index: number, item: IPaymentLabel): number {
    return item.id!;
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  getSelectedPaymentLabel(option: IPaymentLabel, selectedVals?: IPaymentLabel[]): IPaymentLabel {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDealer>>): void {
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

  protected updateForm(dealer: IDealer): void {
    this.editForm.patchValue({
      id: dealer.id,
      dealerName: dealer.dealerName,
      taxNumber: dealer.taxNumber,
      postalAddress: dealer.postalAddress,
      physicalAddress: dealer.physicalAddress,
      accountName: dealer.accountName,
      accountNumber: dealer.accountNumber,
      bankersName: dealer.bankersName,
      bankersBranch: dealer.bankersBranch,
      bankersSwiftCode: dealer.bankersSwiftCode,
      paymentLabels: dealer.paymentLabels,
      dealerGroup: dealer.dealerGroup,
      placeholders: dealer.placeholders,
    });

    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing(
      this.paymentLabelsSharedCollection,
      ...(dealer.paymentLabels ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(this.dealersSharedCollection, dealer.dealerGroup);
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(dealer.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.paymentLabelService
      .query()
      .pipe(map((res: HttpResponse<IPaymentLabel[]>) => res.body ?? []))
      .pipe(
        map((paymentLabels: IPaymentLabel[]) =>
          this.paymentLabelService.addPaymentLabelToCollectionIfMissing(paymentLabels, ...(this.editForm.get('paymentLabels')!.value ?? []))
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing(dealers, this.editForm.get('dealerGroup')!.value))
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

  protected createFromForm(): IDealer {
    return {
      ...new Dealer(),
      id: this.editForm.get(['id'])!.value,
      dealerName: this.editForm.get(['dealerName'])!.value,
      taxNumber: this.editForm.get(['taxNumber'])!.value,
      postalAddress: this.editForm.get(['postalAddress'])!.value,
      physicalAddress: this.editForm.get(['physicalAddress'])!.value,
      accountName: this.editForm.get(['accountName'])!.value,
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      bankersName: this.editForm.get(['bankersName'])!.value,
      bankersBranch: this.editForm.get(['bankersBranch'])!.value,
      bankersSwiftCode: this.editForm.get(['bankersSwiftCode'])!.value,
      paymentLabels: this.editForm.get(['paymentLabels'])!.value,
      dealerGroup: this.editForm.get(['dealerGroup'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
