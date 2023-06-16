import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DeliveryNoteFormService, DeliveryNoteFormGroup } from './delivery-note-form.service';
import { IDeliveryNote } from '../delivery-note.model';
import { DeliveryNoteService } from '../service/delivery-note.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { IBusinessStamp } from 'app/entities/business-stamp/business-stamp.model';
import { BusinessStampService } from 'app/entities/business-stamp/service/business-stamp.service';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order/service/purchase-order.service';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';

@Component({
  selector: 'jhi-delivery-note-update',
  templateUrl: './delivery-note-update.component.html',
})
export class DeliveryNoteUpdateComponent implements OnInit {
  isSaving = false;
  deliveryNote: IDeliveryNote | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  dealersSharedCollection: IDealer[] = [];
  businessStampsSharedCollection: IBusinessStamp[] = [];
  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: DeliveryNoteFormGroup = this.deliveryNoteFormService.createDeliveryNoteFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected deliveryNoteService: DeliveryNoteService,
    protected deliveryNoteFormService: DeliveryNoteFormService,
    protected placeholderService: PlaceholderService,
    protected dealerService: DealerService,
    protected businessStampService: BusinessStampService,
    protected purchaseOrderService: PurchaseOrderService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareBusinessStamp = (o1: IBusinessStamp | null, o2: IBusinessStamp | null): boolean =>
    this.businessStampService.compareBusinessStamp(o1, o2);

  comparePurchaseOrder = (o1: IPurchaseOrder | null, o2: IPurchaseOrder | null): boolean =>
    this.purchaseOrderService.comparePurchaseOrder(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryNote }) => {
      this.deliveryNote = deliveryNote;
      if (deliveryNote) {
        this.updateForm(deliveryNote);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('erpSystemApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryNote = this.deliveryNoteFormService.getDeliveryNote(this.editForm);
    if (deliveryNote.id !== null) {
      this.subscribeToSaveResponse(this.deliveryNoteService.update(deliveryNote));
    } else {
      this.subscribeToSaveResponse(this.deliveryNoteService.create(deliveryNote));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryNote>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
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
    this.deliveryNote = deliveryNote;
    this.deliveryNoteFormService.resetForm(this.editForm, deliveryNote);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(deliveryNote.placeholders ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      deliveryNote.receivedBy,
      deliveryNote.supplier,
      ...(deliveryNote.signatories ?? [])
    );
    this.businessStampsSharedCollection = this.businessStampService.addBusinessStampToCollectionIfMissing<IBusinessStamp>(
      this.businessStampsSharedCollection,
      ...(deliveryNote.deliveryStamps ?? [])
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
      this.purchaseOrdersSharedCollection,
      deliveryNote.purchaseOrder,
      ...(deliveryNote.otherPurchaseOrders ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(deliveryNote.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.deliveryNote?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(
            dealers,
            this.deliveryNote?.receivedBy,
            this.deliveryNote?.supplier,
            ...(this.deliveryNote?.signatories ?? [])
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.businessStampService
      .query()
      .pipe(map((res: HttpResponse<IBusinessStamp[]>) => res.body ?? []))
      .pipe(
        map((businessStamps: IBusinessStamp[]) =>
          this.businessStampService.addBusinessStampToCollectionIfMissing<IBusinessStamp>(
            businessStamps,
            ...(this.deliveryNote?.deliveryStamps ?? [])
          )
        )
      )
      .subscribe((businessStamps: IBusinessStamp[]) => (this.businessStampsSharedCollection = businessStamps));

    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
            purchaseOrders,
            this.deliveryNote?.purchaseOrder,
            ...(this.deliveryNote?.otherPurchaseOrders ?? [])
          )
        )
      )
      .subscribe((purchaseOrders: IPurchaseOrder[]) => (this.purchaseOrdersSharedCollection = purchaseOrders));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.deliveryNote?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
