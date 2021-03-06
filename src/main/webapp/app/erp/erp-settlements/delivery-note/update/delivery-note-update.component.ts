import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';

import { IDeliveryNote, DeliveryNote } from '../delivery-note.model';
import { DeliveryNoteService } from '../service/delivery-note.service';
import { DealerSuggestionService } from '../../../erp-common/suggestion/dealer-suggestion.service';
import { PlaceholderSuggestionService } from '../../../erp-common/suggestion/placeholder-suggestion.service';
import { IPaymentLabel } from '../../../erp-common/models/payment-label.model';
import { BusinessStampSuggestionService } from '../../../erp-common/suggestion/business-stamp-suggestion.service';
import { IDealer } from '../../../erp-common/models/dealer.model';
import { IBusinessStamp } from '../../business-stamp/business-stamp.model';
import { DealerService } from '../../../erp-common/services/dealer.service';
import { PurchaseOrderService } from '../../purchase-order/service/purchase-order.service';
import { PurchaseOrderSuggestionService } from '../../../erp-common/suggestion/purchase-order-suggestion.service';
import { IPurchaseOrder } from '../../../erp-common/models/purchase-order.model';
import { IPlaceholder } from '../../../erp-common/models/placeholder.model';
import { BusinessStampService } from '../../business-stamp/service/business-stamp.service';
import { PlaceholderService } from '../../../erp-common/services/placeholder.service';

@Component({
  selector: 'jhi-delivery-note-update',
  templateUrl: './delivery-note-update.component.html',
})
export class DeliveryNoteUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];
  dealersSharedCollection: IDealer[] = [];
  businessStampsSharedCollection: IBusinessStamp[] = [];
  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];

  editForm = this.fb.group({
    id: [],
    deliveryNoteNumber: [null, [Validators.required]],
    documentDate: [null, [Validators.required]],
    description: [],
    serialNumber: [],
    quantity: [],
    remarks: [],
    placeholders: [],
    receivedBy: [null, Validators.required],
    deliveryStamps: [],
    purchaseOrder: [],
    supplier: [null, Validators.required],
    signatories: [],
  });

  minAccountLengthTerm = 3;

  placeholdersLoading = false;
  placeholderControlInput$ = new Subject<string>();
  placeholderLookups$: Observable<IPlaceholder[]> = of([]);

  signatoriesLoading = false;
  signatoryControlInput$ = new Subject<string>();
  signatoryLookups$: Observable<IDealer[]> = of([]);

  suppliersLoading = false;
  supplierInput$ = new Subject<string>();
  supplierLookups$: Observable<IDealer[]> = of([]);

  receivedBysLoading = false;
  receivedByInput$ = new Subject<string>();
  receivedByLookups$: Observable<IDealer[]> = of([]);

  deliveryStampsLoading = false;
  deliveryStampsControlInput$ = new Subject<string>();
  deliveryStampLookups$: Observable<IBusinessStamp[]> = of([]);

  purchaseOrderLoading = false;
  purchaseOrderControlInput$ = new Subject<string>();
  purchaseOrderLookups$: Observable<IPurchaseOrder[]> = of([]);

  constructor(
    protected deliveryNoteService: DeliveryNoteService,
    protected placeholderService: PlaceholderService,
    protected dealerService: DealerService,
    protected businessStampService: BusinessStampService,
    protected purchaseOrderService: PurchaseOrderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected dealerSuggestionService: DealerSuggestionService,
    protected placeholderSuggestionService: PlaceholderSuggestionService,
    protected businessStampSuggestionService: BusinessStampSuggestionService,
    protected purchaseOrderSuggestionService: PurchaseOrderSuggestionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryNote }) => {
      this.updateForm(deliveryNote);

      this.loadRelationshipsOptions();
    });

    this.loadSignatories();
    this.loadSuppliers();
    this.loadReceivedBy();
    this.loadPlaceholders();
    this.loadDeliveryStamps();
    this.loadPurchaseOrders();
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

  loadSignatories(): void {
    this.signatoryLookups$ = concat(
      of([]), // default items
      this.signatoryControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.signatoriesLoading = true),
        switchMap(term => this.dealerSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.signatoriesLoading = false)
        ))
      ),
      of([...this.dealersSharedCollection])
    );
  }

  loadSuppliers(): void {
    this.supplierLookups$ = concat(
      of([]), // default items
      this.supplierInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.suppliersLoading = true),
        switchMap(term => this.dealerSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.suppliersLoading = false)
        ))
      ),
      of([...this.dealersSharedCollection])
    );
  }

  loadReceivedBy(): void {
    this.receivedByLookups$ = concat(
      of([]), // default items
      this.receivedByInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.receivedBysLoading = true),
        switchMap(term => this.dealerSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.receivedBysLoading = false)
        ))
      ),
      of([...this.dealersSharedCollection])
    );
  }

  loadDeliveryStamps(): void {
    this.deliveryStampLookups$ = concat(
      of([]), // default items
      this.deliveryStampsControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.deliveryStampsLoading = true),
        switchMap(term => this.businessStampSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.deliveryStampsLoading = false)
        ))
      ),
      of([...this.businessStampsSharedCollection])
    );
  }

  loadPurchaseOrders(): void {
    this.purchaseOrderLookups$ = concat(
      of([]), // default items
      this.purchaseOrderControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.purchaseOrderLoading = true),
        switchMap(term => this.purchaseOrderSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.purchaseOrderLoading = false)
        ))
      ),
      of([...this.purchaseOrdersSharedCollection])
    );
  }

  trackDealerByFn(item: IDealer): number {
    return item.id!;
  }

  trackPlaceholdersByFn(item: IPaymentLabel): number {
    return item.id!;
  }

  trackDeliveryStampsByFn(item: IBusinessStamp): number {
    return item.id!;
  }

  trackPurchaseOrderByFn(item: IPurchaseOrder): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryNote = this.createFromForm();
    if (deliveryNote.id !== undefined) {
      this.subscribeToSaveResponse(this.deliveryNoteService.update(deliveryNote));
    } else {
      this.subscribeToSaveResponse(this.deliveryNoteService.create(deliveryNote));
    }
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackBusinessStampById(index: number, item: IBusinessStamp): number {
    return item.id!;
  }

  trackPurchaseOrderById(index: number, item: IPurchaseOrder): number {
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

  getSelectedDealer(option: IDealer, selectedVals?: IDealer[]): IDealer {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedBusinessStamp(option: IBusinessStamp, selectedVals?: IBusinessStamp[]): IBusinessStamp {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryNote>>): void {
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

  protected updateForm(deliveryNote: IDeliveryNote): void {
    this.editForm.patchValue({
      id: deliveryNote.id,
      deliveryNoteNumber: deliveryNote.deliveryNoteNumber,
      documentDate: deliveryNote.documentDate,
      description: deliveryNote.description,
      serialNumber: deliveryNote.serialNumber,
      quantity: deliveryNote.quantity,
      placeholders: deliveryNote.placeholders,
      receivedBy: deliveryNote.receivedBy,
      deliveryStamps: deliveryNote.deliveryStamps,
      purchaseOrder: deliveryNote.purchaseOrder,
      supplier: deliveryNote.supplier,
      signatories: deliveryNote.signatories,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(deliveryNote.placeholders ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      deliveryNote.receivedBy,
      deliveryNote.supplier,
      ...(deliveryNote.signatories ?? [])
    );
    this.businessStampsSharedCollection = this.businessStampService.addBusinessStampToCollectionIfMissing(
      this.businessStampsSharedCollection,
      ...(deliveryNote.deliveryStamps ?? [])
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing(
      this.purchaseOrdersSharedCollection,
      deliveryNote.purchaseOrder
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing(
            dealers,
            this.editForm.get('receivedBy')!.value,
            this.editForm.get('supplier')!.value,
            ...(this.editForm.get('signatories')!.value ?? [])
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.businessStampService
      .query()
      .pipe(map((res: HttpResponse<IBusinessStamp[]>) => res.body ?? []))
      .pipe(
        map((businessStamps: IBusinessStamp[]) =>
          this.businessStampService.addBusinessStampToCollectionIfMissing(
            businessStamps,
            ...(this.editForm.get('deliveryStamps')!.value ?? [])
          )
        )
      )
      .subscribe((businessStamps: IBusinessStamp[]) => (this.businessStampsSharedCollection = businessStamps));

    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing(purchaseOrders, this.editForm.get('purchaseOrder')!.value)
        )
      )
      .subscribe((purchaseOrders: IPurchaseOrder[]) => (this.purchaseOrdersSharedCollection = purchaseOrders));
  }

  protected createFromForm(): IDeliveryNote {
    return {
      ...new DeliveryNote(),
      id: this.editForm.get(['id'])!.value,
      deliveryNoteNumber: this.editForm.get(['deliveryNoteNumber'])!.value,
      documentDate: this.editForm.get(['documentDate'])!.value,
      description: this.editForm.get(['description'])!.value,
      serialNumber: this.editForm.get(['serialNumber'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      receivedBy: this.editForm.get(['receivedBy'])!.value,
      deliveryStamps: this.editForm.get(['deliveryStamps'])!.value,
      purchaseOrder: this.editForm.get(['purchaseOrder'])!.value,
      supplier: this.editForm.get(['supplier'])!.value,
      signatories: this.editForm.get(['signatories'])!.value,
    };
  }
}
