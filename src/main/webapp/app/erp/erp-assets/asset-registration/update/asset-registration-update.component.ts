///
/// Erp System - Mark III No 16 (Caleb Series) Client 1.3.8
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAssetRegistration, AssetRegistration } from '../asset-registration.model';
import { AssetRegistrationService } from '../service/asset-registration.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { IAssetCategory } from '../../asset-category/asset-category.model';
import { IJobSheet } from '../../../erp-settlements/job-sheet/job-sheet.model';
import { IDeliveryNote } from '../../../erp-settlements/delivery-note/delivery-note.model';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { IPaymentInvoice } from '../../../erp-settlements/payment-invoice/payment-invoice.model';
import { ISettlement } from '../../../erp-settlements/settlement/settlement.model';
import { IPurchaseOrder } from '../../../erp-settlements/purchase-order/purchase-order.model';
import { IAssetWarranty } from '../../asset-warranty/asset-warranty.model';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { IAssetAccessory } from '../../asset-accessory/asset-accessory.model';

@Component({
  selector: 'jhi-asset-registration-update',
  templateUrl: './asset-registration-update.component.html',
})
export class AssetRegistrationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    assetNumber: [null, [Validators.required]],
    assetTag: [null, [Validators.required]],
    assetDetails: [],
    assetCost: [null, [Validators.required]],
    comments: [],
    commentsContentType: [],
    placeholders: [],
    paymentInvoices: [],
    serviceOutlet: [null, Validators.required],
    settlements: [null, Validators.required],
    assetCategory: [null, Validators.required],
    purchaseOrders: [],
    deliveryNotes: [],
    jobSheets: [],
    dealer: [null, Validators.required],
    designatedUsers: [],
    modelNumber: [],
    serialNumber: [],
    businessDocuments: [],
    assetWarranties: [],
    universallyUniqueMappings: [],
    assetAccessories: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected assetRegistrationService: AssetRegistrationService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetRegistration }) => {
      this.updateForm(assetRegistration);
    });
  }

  updateServiceOutlet(update: IServiceOutlet): void {
    this.editForm.patchValue({
      serviceOutlet: update
    });
  }

  updateDealer(dealerUpdate: IDealer): void {
    this.editForm.patchValue({
      dealer: dealerUpdate,
    });
  }

  updateAssetCategory(update: IAssetCategory): void {
    this.editForm.patchValue({
      assetCategory: update
    });
  }

  updateDesignatedUsers(update: IDealer[]): void {
    this.editForm.patchValue({
      designatedUsers: [...update]
    });
  }

  updatePurchaseOrders(update: IPurchaseOrder[]): void {
    this.editForm.patchValue({
      purchaseOrders: [...update]
    });
  }

  updateDeliveryNotes(update: IDeliveryNote[]): void {
    this.editForm.patchValue({
      deliveryNotes: [...update]
    });
  }

  updateJobSheets(update: IJobSheet[]): void {
    this.editForm.patchValue({
      jobSheets: [...update]
    });
  }

  updateBusinessDocuments(update: IBusinessDocument[]): void {
    this.editForm.patchValue({
      businessDocuments: [...update]
    });
  }

  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholders: [...update]
    });
  }

  updatePaymentInvoices(update: IPaymentInvoice[]): void {
    this.editForm.patchValue({
      paymentInvoices: update
    });
  }

  updateSettlements(updates: ISettlement[]): void {
    this.editForm.patchValue({
      settlements: [...updates]
    });
  }

  updateAssetWarranties(updates: IAssetWarranty[]): void {
    this.editForm.patchValue({
      assetWarranties: [...updates]
    });
  }

  updateAssetAccessories(updates: IAssetAccessory[]): void {
    this.editForm.patchValue({
      assetAccessories: [...updates]
    });
  }

  updateUniversallyUniqueMappings(updates: IUniversallyUniqueMapping[]): void {
    this.editForm.patchValue({
      universallyUniqueMappings: [...updates]
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateBusinessDocument(update: IBusinessDocument[]): void {
    this.editForm.patchValue({
      businessDocuments: [...update],
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
    const assetRegistration = this.createFromForm();
    if (assetRegistration.id !== undefined) {
      this.subscribeToSaveResponse(this.assetRegistrationService.update(assetRegistration));
    } else {
      this.subscribeToSaveResponse(this.assetRegistrationService.create(assetRegistration));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssetRegistration>>): void {
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

  protected updateForm(assetRegistration: IAssetRegistration): void {
    this.editForm.patchValue({
      id: assetRegistration.id,
      assetNumber: assetRegistration.assetNumber,
      assetTag: assetRegistration.assetTag,
      assetDetails: assetRegistration.assetDetails,
      assetCost: assetRegistration.assetCost,
      comments: assetRegistration.comments,
      commentsContentType: assetRegistration.commentsContentType,
      placeholders: assetRegistration.placeholders,
      paymentInvoices: assetRegistration.paymentInvoices,
      serviceOutlet: assetRegistration.serviceOutlet,
      settlements: assetRegistration.settlements,
      assetCategory: assetRegistration.assetCategory,
      purchaseOrders: assetRegistration.purchaseOrders,
      deliveryNotes: assetRegistration.deliveryNotes,
      jobSheets: assetRegistration.jobSheets,
      dealer: assetRegistration.dealer,
      designatedUsers: assetRegistration.designatedUsers,
      modelNumber: assetRegistration.modelNumber,
      serialNumber: assetRegistration.serialNumber,
      businessDocuments: assetRegistration.businessDocuments,
      assetWarranties: assetRegistration.assetWarranties,
      universallyUniqueMappings: assetRegistration.universallyUniqueMappings,
      assetAccessories: assetRegistration.assetAccessories,
      settlementCurrency: assetRegistration.settlementCurrency
    });

  }

  protected createFromForm(): IAssetRegistration {
    return {
      ...new AssetRegistration(),
      id: this.editForm.get(['id'])!.value,
      assetNumber: this.editForm.get(['assetNumber'])!.value,
      assetTag: this.editForm.get(['assetTag'])!.value,
      assetDetails: this.editForm.get(['assetDetails'])!.value,
      assetCost: this.editForm.get(['assetCost'])!.value,
      commentsContentType: this.editForm.get(['commentsContentType'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      paymentInvoices: this.editForm.get(['paymentInvoices'])!.value,
      serviceOutlet: this.editForm.get(['serviceOutlet'])!.value,
      settlements: this.editForm.get(['settlements'])!.value,
      assetCategory: this.editForm.get(['assetCategory'])!.value,
      purchaseOrders: this.editForm.get(['purchaseOrders'])!.value,
      deliveryNotes: this.editForm.get(['deliveryNotes'])!.value,
      jobSheets: this.editForm.get(['jobSheets'])!.value,
      dealer: this.editForm.get(['dealer'])!.value,
      designatedUsers: this.editForm.get(['designatedUsers'])!.value,
      modelNumber: this.editForm.get(['modelNumber'])!.value,
      serialNumber: this.editForm.get(['serialNumber'])!.value,
      settlementCurrency: this.editForm.get(['settlementCurrency'])!.value,
      businessDocuments: this.editForm.get(['businessDocuments'])!.value,
      assetWarranties: this.editForm.get(['assetWarranties'])!.value,
      universallyUniqueMappings: this.editForm.get(['universallyUniqueMappings'])!.value,
      assetAccessories: this.editForm.get(['assetAccessories'])!.value,
    };
  }
}
