///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.5.1
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
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IWorkInProgressTransfer, WorkInProgressTransfer } from '../work-in-progress-transfer.model';
import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';
import { IWorkInProgressRegistration } from 'app/entities/assets/work-in-progress-registration/work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from 'app/entities/assets/work-in-progress-registration/service/work-in-progress-registration.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

@Component({
  selector: 'jhi-work-in-progress-transfer-update',
  templateUrl: './work-in-progress-transfer-update.component.html',
})
export class WorkInProgressTransferUpdateComponent implements OnInit {
  isSaving = false;

  workInProgressRegistrationsSharedCollection: IWorkInProgressRegistration[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    targetAssetNumber: [],
    workInProgressRegistrations: [],
    placeholders: [],
    businessDocuments: [],
  });

  constructor(
    protected workInProgressTransferService: WorkInProgressTransferService,
    protected workInProgressRegistrationService: WorkInProgressRegistrationService,
    protected placeholderService: PlaceholderService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workInProgressTransfer }) => {
      this.updateForm(workInProgressTransfer);

      this.loadRelationshipsOptions();
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

  trackWorkInProgressRegistrationById(index: number, item: IWorkInProgressRegistration): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackBusinessDocumentById(index: number, item: IBusinessDocument): number {
    return item.id!;
  }

  getSelectedWorkInProgressRegistration(
    option: IWorkInProgressRegistration,
    selectedVals?: IWorkInProgressRegistration[]
  ): IWorkInProgressRegistration {
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
      workInProgressRegistrations: workInProgressTransfer.workInProgressRegistrations,
      placeholders: workInProgressTransfer.placeholders,
      businessDocuments: workInProgressTransfer.businessDocuments,
    });

    this.workInProgressRegistrationsSharedCollection =
      this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
        this.workInProgressRegistrationsSharedCollection,
        ...(workInProgressTransfer.workInProgressRegistrations ?? [])
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(workInProgressTransfer.placeholders ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing(
      this.businessDocumentsSharedCollection,
      ...(workInProgressTransfer.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.workInProgressRegistrationService
      .query()
      .pipe(map((res: HttpResponse<IWorkInProgressRegistration[]>) => res.body ?? []))
      .pipe(
        map((workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
            workInProgressRegistrations,
            ...(this.editForm.get('workInProgressRegistrations')!.value ?? [])
          )
        )
      )
      .subscribe(
        (workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          (this.workInProgressRegistrationsSharedCollection = workInProgressRegistrations)
      );

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
  }

  protected createFromForm(): IWorkInProgressTransfer {
    return {
      ...new WorkInProgressTransfer(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      targetAssetNumber: this.editForm.get(['targetAssetNumber'])!.value,
      workInProgressRegistrations: this.editForm.get(['workInProgressRegistrations'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      businessDocuments: this.editForm.get(['businessDocuments'])!.value,
    };
  }
}
