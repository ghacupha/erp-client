///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WorkProjectRegisterFormService, WorkProjectRegisterFormGroup } from './work-project-register-form.service';
import { IWorkProjectRegister } from '../work-project-register.model';
import { WorkProjectRegisterService } from '../service/work-project-register.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

@Component({
  selector: 'jhi-work-project-register-update',
  templateUrl: './work-project-register-update.component.html',
})
export class WorkProjectRegisterUpdateComponent implements OnInit {
  isSaving = false;
  workProjectRegister: IWorkProjectRegister | null = null;

  dealersSharedCollection: IDealer[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: WorkProjectRegisterFormGroup = this.workProjectRegisterFormService.createWorkProjectRegisterFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected workProjectRegisterService: WorkProjectRegisterService,
    protected workProjectRegisterFormService: WorkProjectRegisterFormService,
    protected dealerService: DealerService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected placeholderService: PlaceholderService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workProjectRegister }) => {
      this.workProjectRegister = workProjectRegister;
      if (workProjectRegister) {
        this.updateForm(workProjectRegister);
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
    const workProjectRegister = this.workProjectRegisterFormService.getWorkProjectRegister(this.editForm);
    if (workProjectRegister.id !== null) {
      this.subscribeToSaveResponse(this.workProjectRegisterService.update(workProjectRegister));
    } else {
      this.subscribeToSaveResponse(this.workProjectRegisterService.create(workProjectRegister));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkProjectRegister>>): void {
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

  protected updateForm(workProjectRegister: IWorkProjectRegister): void {
    this.workProjectRegister = workProjectRegister;
    this.workProjectRegisterFormService.resetForm(this.editForm, workProjectRegister);

    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      ...(workProjectRegister.dealers ?? [])
    );
    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        workProjectRegister.settlementCurrency
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(workProjectRegister.placeholders ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(workProjectRegister.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(dealers, ...(this.workProjectRegister?.dealers ?? []))
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.workProjectRegister?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.workProjectRegister?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.workProjectRegister?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
