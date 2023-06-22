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

import { SettlementRequisitionFormService, SettlementRequisitionFormGroup } from './settlement-requisition-form.service';
import { ISettlementRequisition } from '../settlement-requisition.model';
import { SettlementRequisitionService } from '../service/settlement-requisition.service';
import { ISettlementCurrency } from '../../settlement-currency/settlement-currency.model';
import { IJobSheet } from '../../job-sheet/job-sheet.model';
import { IDeliveryNote } from '../../delivery-note/delivery-note.model';
import { IPaymentInvoice } from '../../payment-invoice/payment-invoice.model';
import { IApplicationUser } from '../../../erp-pages/application-user/application-user.model';
import { ApplicationUserService } from '../../../erp-pages/application-user/service/application-user.service';
import { SettlementCurrencyService } from '../../settlement-currency/service/settlement-currency.service';
import { PaymentInvoiceService } from '../../payment-invoice/service/payment-invoice.service';
import { JobSheetService } from '../../job-sheet/service/job-sheet.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { DeliveryNoteService } from '../../delivery-note/service/delivery-note.service';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { PaymentStatus } from '../../../erp-common/enumerations/payment-status.model';
import { v4 as uuidv4 } from 'uuid';
import { SearchWithPagination } from '../../../../core/request/request.model';
import { ISettlement } from '../../settlement/settlement.model';
import { SettlementService } from '../../settlement/service/settlement.service';
import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from '../../../../config/input.constants';

@Component({
  selector: 'jhi-settlement-requisition-update',
  templateUrl: './settlement-requisition-update.component.html',
})
export class SettlementRequisitionUpdateComponent implements OnInit {
  isSaving = false;
  settlementRequisition: ISettlementRequisition | null = null;
  paymentStatusValues = Object.keys(PaymentStatus);
  tod = dayjs();

  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  applicationUsersSharedCollection: IApplicationUser[] = [];
  dealersSharedCollection: IDealer[] = [];
  paymentInvoicesSharedCollection: IPaymentInvoice[] = [];
  deliveryNotesSharedCollection: IDeliveryNote[] = [];
  jobSheetsSharedCollection: IJobSheet[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: SettlementRequisitionFormGroup = this.settlementRequisitionFormService.createSettlementRequisitionFormGroup();

  constructor(
    protected settlementRequisitionService: SettlementRequisitionService,
    protected settlementRequisitionFormService: SettlementRequisitionFormService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected applicationUserService: ApplicationUserService,
    protected dealerService: DealerService,
    protected paymentInvoiceService: PaymentInvoiceService,
    protected deliveryNoteService: DeliveryNoteService,
    protected jobSheetService: JobSheetService,
    protected businessDocumentService: BusinessDocumentService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  compareApplicationUser = (o1: IApplicationUser | null, o2: IApplicationUser | null): boolean =>
    this.applicationUserService.compareApplicationUser(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  comparePaymentInvoice = (o1: IPaymentInvoice | null, o2: IPaymentInvoice | null): boolean =>
    this.paymentInvoiceService.comparePaymentInvoice(o1, o2);

  compareDeliveryNote = (o1: IDeliveryNote | null, o2: IDeliveryNote | null): boolean =>
    this.deliveryNoteService.compareDeliveryNote(o1, o2);

  compareJobSheet = (o1: IJobSheet | null, o2: IJobSheet | null): boolean => this.jobSheetService.compareJobSheet(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ settlementRequisition }) => {
      this.settlementRequisition = settlementRequisition;


      if (settlementRequisition.id === undefined) {
        // settlementRequisition.timeOfRequisition = dayjs();
        settlementRequisition.paymentStatus = PaymentStatus.IN_PROCESS;

        const reqSerial = uuidv4();
        this.editForm.patchValue({
          serialNumber: reqSerial,
          requisitionNumber: reqSerial.substring(0,8),
          timeOfRequisition: this.tod.format(DATE_TIME_FORMAT)
        })

        // TODO REVIEW EDIT ROUTE
        if (settlementRequisition) {
          this.updateForm(settlementRequisition);
        }

        if (settlementRequisition.id !== undefined) {
          this.copyForm(settlementRequisition);
        }
      }

      this.loadRelationshipsOptions();
    });

    this.updatePreferredSignatories();
    this.updatePreferredCurrency();
  }

  updatePreferredSignatories(): void {
    if (this.editForm.get(['id'])?.value === undefined ) {
      this.universallyUniqueMappingService.findMap("globallyPreferredSettlementRequisitionUpdateSignatoryName")
        .subscribe((mapped) => {
          this.dealerService.search(<SearchWithPagination>{page: 0,size: 0,sort: [],query: mapped.body?.mappedValue})
            .subscribe(({ body: vals }) => {
              if (vals) {
                this.editForm.get(['signatures'])?.setValue(vals)
              }
            });
        });
    }
  }

  updatePreferredCurrency(): void {
    this.universallyUniqueMappingService.findMap("globallyPreferredSettlementIso4217CurrencyCode")
      .subscribe(mapped => {
          this.settlementCurrencyService.search(<SearchWithPagination>{ page: 0, size: 0, sort: [], query: mapped.body?.mappedValue })
            .subscribe(({ body: currencies }) => {
              if (currencies) {
                this.editForm.get(['settlementCurrency'])?.setValue(currencies[0]);
              }
            });
        }
      );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateBusinessDocument(update: IBusinessDocument[]): void {
    this.editForm.patchValue({
      businessDocuments: [...update],
    });
  }

  updateCurrencies(update: ISettlementCurrency): void {
    this.editForm.patchValue({
      settlementCurrency: update
    });
  }

  updateCurrentOwner(update: IApplicationUser): void {
    this.editForm.patchValue({
      currentOwner: update
    });
  }

  updateNativeOwner(update: IApplicationUser): void {
    this.editForm.patchValue({
      nativeOwner: update
    });
  }

  updateBiller(dealerUpdate: IDealer): void {
    this.editForm.patchValue({
      biller: dealerUpdate,
    });
  }

  updateNativeDepartment(dealerUpdate: IDealer): void {
    this.editForm.patchValue({
      nativeDepartment: dealerUpdate,
    });
  }

  updatePaymentInvoices(update: IPaymentInvoice[]): void {
    this.editForm.patchValue({
      paymentInvoices: update
    });
  }

  updateSignatories(dealerUpdate: IDealer[]): void {
    this.editForm.patchValue({
      signatures: [...dealerUpdate]
    });
  }

  // updateSettlements(updates: ISettlement[]): void {
  //   this.editForm.patchValue({
  //     settlements: [...updates]
  //   });
  // }

  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholders: [...update]
    });
  }

  updateApplicationMapping(update: IUniversallyUniqueMapping[]): void {
    this.editForm.patchValue({
      applicationMappings: [...update]
    });
  }

  updateJobSheetItems(update: IJobSheet[]): void {
    this.editForm.patchValue({
      jobSheets: [...update]
    });
  }

  updateDeliveryNotesItems(update: IDeliveryNote[]): void {
    this.editForm.patchValue({
      deliveryNotes: [...update]
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const settlementRequisition = this.settlementRequisitionFormService.getSettlementRequisition(this.editForm);
    if (settlementRequisition.id !== null) {
      this.subscribeToSaveResponse(this.settlementRequisitionService.update(settlementRequisition));
    } else {
      this.subscribeToSaveResponse(this.settlementRequisitionService.create(settlementRequisition));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISettlementRequisition>>): void {
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

  protected updateForm(settlementRequisition: ISettlementRequisition): void {
    this.settlementRequisition = settlementRequisition;
    this.settlementRequisitionFormService.resetForm(this.editForm, settlementRequisition);

    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        settlementRequisition.settlementCurrency
      );
    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
      this.applicationUsersSharedCollection,
      settlementRequisition.currentOwner,
      settlementRequisition.nativeOwner
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      settlementRequisition.nativeDepartment,
      settlementRequisition.biller,
      ...(settlementRequisition.signatures ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing<IPaymentInvoice>(
      this.paymentInvoicesSharedCollection,
      ...(settlementRequisition.paymentInvoices ?? [])
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
      this.deliveryNotesSharedCollection,
      ...(settlementRequisition.deliveryNotes ?? [])
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(
      this.jobSheetsSharedCollection,
      ...(settlementRequisition.jobSheets ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(settlementRequisition.businessDocuments ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(settlementRequisition.applicationMappings ?? [])
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(settlementRequisition.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.settlementRequisition?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.applicationUserService
      .query()
      .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
      .pipe(
        map((applicationUsers: IApplicationUser[]) =>
          this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
            applicationUsers,
            this.settlementRequisition?.currentOwner,
            this.settlementRequisition?.nativeOwner
          )
        )
      )
      .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(
            dealers,
            this.settlementRequisition?.nativeDepartment,
            this.settlementRequisition?.biller,
            ...(this.settlementRequisition?.signatures ?? [])
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.paymentInvoiceService
      .query()
      .pipe(map((res: HttpResponse<IPaymentInvoice[]>) => res.body ?? []))
      .pipe(
        map((paymentInvoices: IPaymentInvoice[]) =>
          this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing<IPaymentInvoice>(
            paymentInvoices,
            ...(this.settlementRequisition?.paymentInvoices ?? [])
          )
        )
      )
      .subscribe((paymentInvoices: IPaymentInvoice[]) => (this.paymentInvoicesSharedCollection = paymentInvoices));

    this.deliveryNoteService
      .query()
      .pipe(map((res: HttpResponse<IDeliveryNote[]>) => res.body ?? []))
      .pipe(
        map((deliveryNotes: IDeliveryNote[]) =>
          this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
            deliveryNotes,
            ...(this.settlementRequisition?.deliveryNotes ?? [])
          )
        )
      )
      .subscribe((deliveryNotes: IDeliveryNote[]) => (this.deliveryNotesSharedCollection = deliveryNotes));

    this.jobSheetService
      .query()
      .pipe(map((res: HttpResponse<IJobSheet[]>) => res.body ?? []))
      .pipe(
        map((jobSheets: IJobSheet[]) =>
          this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(jobSheets, ...(this.settlementRequisition?.jobSheets ?? []))
        )
      )
      .subscribe((jobSheets: IJobSheet[]) => (this.jobSheetsSharedCollection = jobSheets));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.settlementRequisition?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.settlementRequisition?.applicationMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.settlementRequisition?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
