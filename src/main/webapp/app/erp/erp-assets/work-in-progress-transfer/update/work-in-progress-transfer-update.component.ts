///
/// Erp System - Mark VII No 1 (Gideon Series) Client 1.5.5
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
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IWorkInProgressTransfer, WorkInProgressTransfer } from '../work-in-progress-transfer.model';
import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { IAssetCategory } from '../../asset-category/asset-category.model';
import { SettlementService } from '../../../erp-settlements/settlement/service/settlement.service';
import { WorkInProgressTransferType } from '../../../erp-common/enumerations/work-in-progress-transfer-type.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { IWorkInProgressRegistration } from '../../work-in-progress-registration/work-in-progress-registration.model';
import { AssetCategoryService } from '../../asset-category/service/asset-category.service';
import { WorkInProgressRegistrationService } from '../../work-in-progress-registration/service/work-in-progress-registration.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { WorkProjectRegisterService } from '../../work-project-register/service/work-project-register.service';
import { IWorkProjectRegister } from '../../work-project-register/work-project-register.model';
import { ISettlement } from '../../../erp-settlements/settlement/settlement.model';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { ServiceOutletService } from '../../../erp-granular/service-outlet/service/service-outlet.service';

@Component({
  selector: 'jhi-work-in-progress-transfer-update',
  templateUrl: './work-in-progress-transfer-update.component.html',
})
export class WorkInProgressTransferUpdateComponent implements OnInit {
  isSaving = false;
  workInProgressTransferTypeValues = Object.keys(WorkInProgressTransferType);

  placeholdersSharedCollection: IPlaceholder[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  assetCategoriesSharedCollection: IAssetCategory[] = [];
  workInProgressRegistrationsSharedCollection: IWorkInProgressRegistration[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  workProjectRegistersSharedCollection: IWorkProjectRegister[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    targetAssetNumber: [],
    transferAmount: [null, [Validators.required, Validators.min(0)]],
    transferDate: [null, [Validators.required]],
    transferType: [null, [Validators.required]],
    placeholders: [],
    businessDocuments: [],
    assetCategory: [],
    workInProgressRegistration: [],
    serviceOutlet: [],
    settlement: [],
    workProjectRegister: [],
  });

  constructor(
    protected workInProgressTransferService: WorkInProgressTransferService,
    protected placeholderService: PlaceholderService,
    protected businessDocumentService: BusinessDocumentService,
    protected assetCategoryService: AssetCategoryService,
    protected workInProgressRegistrationService: WorkInProgressRegistrationService,
    protected serviceOutletService: ServiceOutletService,
    protected settlementService: SettlementService,
    protected workProjectRegisterService: WorkProjectRegisterService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workInProgressTransfer }) => {
      this.updateForm(workInProgressTransfer);

      this.loadRelationshipsOptions();
    });
  }

  updateAssetCategory(update: IAssetCategory): void {
    this.editForm.patchValue({
      assetCategory: update
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

  updateServiceOutlet(update: IServiceOutlet): void {
    this.editForm.patchValue({
      serviceOutlet: update
    });
  }

  updateSettlement(update: ISettlement): void {
    this.editForm.patchValue({
      settlement: update
    });
  }
  updateWorkProjectRegister(update: IWorkProjectRegister): void {
    this.editForm.patchValue({
      workProjectRegister: update
    });
  }

  updateWIPRegistration(update: IWorkInProgressRegistration): void {
    this.editForm.patchValue({
      workInProgressRegistration: update
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workInProgressTransfer = this.createFromForm();
    if (workInProgressTransfer.id !== undefined) {
      this.subscribeToSaveResponse(this.workInProgressTransferService.update(workInProgressTransfer));
    } else {
      this.subscribeToSaveResponse(this.workInProgressTransferService.create(workInProgressTransfer));
    }
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackBusinessDocumentById(index: number, item: IBusinessDocument): number {
    return item.id!;
  }

  trackAssetCategoryById(index: number, item: IAssetCategory): number {
    return item.id!;
  }

  trackWorkInProgressRegistrationById(index: number, item: IWorkInProgressRegistration): number {
    return item.id!;
  }

  trackServiceOutletById(index: number, item: IServiceOutlet): number {
    return item.id!;
  }

  trackSettlementById(index: number, item: ISettlement): number {
    return item.id!;
  }

  trackWorkProjectRegisterById(index: number, item: IWorkProjectRegister): number {
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

  getSelectedBusinessDocument(option: IBusinessDocument, selectedVals?: IBusinessDocument[]): IBusinessDocument {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkInProgressTransfer>>): void {
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

  protected updateForm(workInProgressTransfer: IWorkInProgressTransfer): void {
    this.editForm.patchValue({
      id: workInProgressTransfer.id,
      description: workInProgressTransfer.description,
      targetAssetNumber: workInProgressTransfer.targetAssetNumber,
      transferAmount: workInProgressTransfer.transferAmount,
      transferDate: workInProgressTransfer.transferDate,
      transferType: workInProgressTransfer.transferType,
      placeholders: workInProgressTransfer.placeholders,
      businessDocuments: workInProgressTransfer.businessDocuments,
      assetCategory: workInProgressTransfer.assetCategory,
      workInProgressRegistration: workInProgressTransfer.workInProgressRegistration,
      serviceOutlet: workInProgressTransfer.serviceOutlet,
      settlement: workInProgressTransfer.settlement,
      workProjectRegister: workInProgressTransfer.workProjectRegister,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(workInProgressTransfer.placeholders ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing(
      this.businessDocumentsSharedCollection,
      ...(workInProgressTransfer.businessDocuments ?? [])
    );
    this.assetCategoriesSharedCollection = this.assetCategoryService.addAssetCategoryToCollectionIfMissing(
      this.assetCategoriesSharedCollection,
      workInProgressTransfer.assetCategory
    );
    // this.workInProgressRegistrationsSharedCollection =
    //   this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
    //     this.workInProgressRegistrationsSharedCollection,
    //     workInProgressTransfer.workInProgressRegistration
    //   );
    // this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing(
    //   this.serviceOutletsSharedCollection,
    //   workInProgressTransfer.serviceOutlet
    // );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing(
      this.settlementsSharedCollection,
      workInProgressTransfer.settlement
    );
    this.workProjectRegistersSharedCollection = this.workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing(
      this.workProjectRegistersSharedCollection,
      workInProgressTransfer.workProjectRegister
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

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing(
            businessDocuments,
            ...(this.editForm.get('businessDocuments')!.value ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.assetCategoryService
      .query()
      .pipe(map((res: HttpResponse<IAssetCategory[]>) => res.body ?? []))
      .pipe(
        map((assetCategories: IAssetCategory[]) =>
          this.assetCategoryService.addAssetCategoryToCollectionIfMissing(assetCategories, this.editForm.get('assetCategory')!.value)
        )
      )
      .subscribe((assetCategories: IAssetCategory[]) => (this.assetCategoriesSharedCollection = assetCategories));

    this.workInProgressRegistrationService
      .query()
      .pipe(map((res: HttpResponse<IWorkInProgressRegistration[]>) => res.body ?? []))
      .pipe(
        map((workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
            workInProgressRegistrations,
            this.editForm.get('workInProgressRegistration')!.value
          )
        )
      )
      .subscribe(
        (workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          (this.workInProgressRegistrationsSharedCollection = workInProgressRegistrations)
      );

    this.serviceOutletService
      .query()
      .pipe(map((res: HttpResponse<IServiceOutlet[]>) => res.body ?? []))
      .pipe(
        map((serviceOutlets: IServiceOutlet[]) =>
          this.serviceOutletService.addServiceOutletToCollectionIfMissing(serviceOutlets, this.editForm.get('serviceOutlet')!.value)
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing(settlements, this.editForm.get('settlement')!.value)
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.workProjectRegisterService
      .query()
      .pipe(map((res: HttpResponse<IWorkProjectRegister[]>) => res.body ?? []))
      .pipe(
        map((workProjectRegisters: IWorkProjectRegister[]) =>
          this.workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing(
            workProjectRegisters,
            this.editForm.get('workProjectRegister')!.value
          )
        )
      )
      .subscribe((workProjectRegisters: IWorkProjectRegister[]) => (this.workProjectRegistersSharedCollection = workProjectRegisters));
  }

  protected createFromForm(): IWorkInProgressTransfer {
    return {
      ...new WorkInProgressTransfer(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      targetAssetNumber: this.editForm.get(['targetAssetNumber'])!.value,
      transferAmount: this.editForm.get(['transferAmount'])!.value,
      transferDate: this.editForm.get(['transferDate'])!.value,
      transferType: this.editForm.get(['transferType'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      businessDocuments: this.editForm.get(['businessDocuments'])!.value,
      assetCategory: this.editForm.get(['assetCategory'])!.value,
      workInProgressRegistration: this.editForm.get(['workInProgressRegistration'])!.value,
      serviceOutlet: this.editForm.get(['serviceOutlet'])!.value,
      settlement: this.editForm.get(['settlement'])!.value,
      workProjectRegister: this.editForm.get(['workProjectRegister'])!.value,
    };
  }
}
