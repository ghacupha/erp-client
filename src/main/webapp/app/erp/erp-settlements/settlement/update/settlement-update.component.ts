import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SettlementFormService, SettlementFormGroup } from './settlement-form.service';
import { ISettlement } from '../settlement.model';
import { SettlementService } from '../service/settlement.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { ISettlementCurrency } from '../../settlement-currency/settlement-currency.model';
import { IPaymentLabel } from '../../../erp-pages/payment-label/payment-label.model';
import { PaymentLabelService } from '../../../erp-pages/payment-label/service/payment-label.service';
import { IPaymentInvoice } from '../../payment-invoice/payment-invoice.model';
import { SettlementCurrencyService } from '../../settlement-currency/service/settlement-currency.service';
import { PaymentCategoryService } from '../../payments/payment-category/service/payment-category.service';
import { PaymentInvoiceService } from '../../payment-invoice/service/payment-invoice.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { IPaymentCategory } from '../../payments/payment-category/payment-category.model';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import dayjs from 'dayjs/esm';
import { SearchWithPagination } from '../../../../core/request/request.model';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { PaymentCalculatorService } from '../service/payment-calculator.service';

@Component({
  selector: 'jhi-settlement-update',
  templateUrl: './settlement-update.component.html',
})
export class SettlementUpdateComponent implements OnInit {
  isSaving = false;
  settlement: ISettlement | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  paymentLabelsSharedCollection: IPaymentLabel[] = [];
  paymentCategoriesSharedCollection: IPaymentCategory[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  dealersSharedCollection: IDealer[] = [];
  paymentInvoicesSharedCollection: IPaymentInvoice[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: SettlementFormGroup = this.settlementFormService.createSettlementFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected settlementService: SettlementService,
    protected settlementFormService: SettlementFormService,
    protected placeholderService: PlaceholderService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected paymentLabelService: PaymentLabelService,
    protected paymentCategoryService: PaymentCategoryService,
    protected dealerService: DealerService,
    protected paymentInvoiceService: PaymentInvoiceService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected businessDocumentService: BusinessDocumentService,
    protected paymentCalculatorService: PaymentCalculatorService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  comparePaymentLabel = (o1: IPaymentLabel | null, o2: IPaymentLabel | null): boolean =>
    this.paymentLabelService.comparePaymentLabel(o1, o2);

  comparePaymentCategory = (o1: IPaymentCategory | null, o2: IPaymentCategory | null): boolean =>
    this.paymentCategoryService.comparePaymentCategory(o1, o2);

  compareSettlement = (o1: ISettlement | null, o2: ISettlement | null): boolean => this.settlementService.compareSettlement(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  comparePaymentInvoice = (o1: IPaymentInvoice | null, o2: IPaymentInvoice | null): boolean =>
    this.paymentInvoiceService.comparePaymentInvoice(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ settlement }) => {
      this.settlement = settlement;
      if (settlement) {
        this.updateForm(settlement);
      }

      this.loadRelationshipsOptions();
    });

    this.updateTodaysDate();
    this.updatePreferredCurrency();
    this.updatePreferredCategory();
    this.updatePreferredSignatories();
    this.updatePreferredPaymentLabels();
    this.updatePreferredBillerGivenInvoice();
    this.updatePreferredPaymentAmountGivenInvoice();
    this.updatePreferredCurrencyGivenInvoice();
    this.updatePreferredPaymentLabelsGivenInvoice();
    this.updatePaymentAmountGivenPaymentCategory();
    this.updateDescriptionGivenInvoicePurchaseOrder();
  }

  updateTodaysDate(): void {
    if (this.editForm.get(['id'])?.value === undefined ) {
      this.editForm.patchValue({
        paymentDate: dayjs().startOf('day')
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

  updatePreferredCategory(): void {
    if (this.editForm.get(['id'])?.value === undefined ) {
      this.universallyUniqueMappingService.findMap("globallyPreferredSettlementUpdatePaymentCategoryName")
        .subscribe((mapped) => {
          this.paymentCategoryService.search(<SearchWithPagination>{ page: 0, size: 0, sort: [], query: mapped.body?.mappedValue })
            .subscribe(({ body: categories }) => {
              if (categories) {
                this.editForm.get(['paymentCategory'])?.setValue(categories[0]);
              }
            });
        });
    }
  }

  updatePreferredSignatories(): void {
    if (this.editForm.get(['id'])?.value === undefined ) {
      this.universallyUniqueMappingService.findMap("globallyPreferredSettlementUpdateSignatoryName")
        .subscribe((mapped) => {
          this.dealerService.search(<SearchWithPagination>{page: 0,size: 0,sort: [],query: mapped.body?.mappedValue})
            .subscribe(({ body: vals }) => {
              if (vals) {
                this.editForm.get(['signatories'])?.setValue(vals)
              }
            });
        });
    }
  }

  updatePreferredBillerGivenInvoice(): void {
    this.editForm.get(['paymentInvoices'])?.valueChanges.subscribe((invoices) => {
      const p_dealers: IDealer[] = [];
      invoices.forEach((inv: { biller: IDealer; }) => {
        p_dealers.push(inv.biller);
      })
      this.editForm.get(['biller'])?.setValue(p_dealers[0])
    });
  }

  updatePreferredCurrencyGivenInvoice(): void {
    this.editForm.get(['paymentInvoices'])?.valueChanges.subscribe((invoices) => {
      const p_crn: ISettlementCurrency[] = [];
      invoices.forEach((inv: { settlementCurrency: ISettlementCurrency; }) => {
        p_crn.push(inv.settlementCurrency);
      })
      this.editForm.get(['settlementCurrency'])?.setValue(p_crn[0])
    });
  }

  updateDescriptionGivenInvoicePurchaseOrder(): void {
    this.editForm.get(['paymentInvoices'])?.valueChanges.subscribe((invoices) => {
      const description = invoices[0].purchaseOrder.description;

      this.editForm.patchValue({
        description,
        remarks: description,
      })

    });
  }

  updatePreferredPaymentLabelsGivenInvoice(): void {
    this.editForm.get(['paymentInvoices'])?.valueChanges.subscribe((invoices) => {
      const p_labels: IPaymentLabel[] = [];
      invoices.forEach((inv: { paymentLabels: IPaymentLabel[]; }) => {
        p_labels.push(...inv.paymentLabels);
      });
      const labels = [...this.editForm.get(['paymentLabels'])?.value, ...p_labels];
      this.editForm.get(['paymentLabels'])?.setValue(labels)
    });
  }

  updatePreferredPaymentAmountGivenInvoice(): void {
    if (this.editForm.get(['id'])?.value === undefined ) {
      this.editForm.get(['paymentInvoices'])?.valueChanges.subscribe((invoices) => {
        let settlementAmount = 0;
        invoices.forEach(({ invoiceAmount }: IPaymentInvoice) => {
          settlementAmount += invoiceAmount ?? 0;
        })

        this.paymentCalculatorService.calculatePayableAmount(settlementAmount, this.editForm.get(['paymentCategory'])?.value)
          .subscribe(calculatedAmount => {
            this.editForm.patchValue({ paymentAmount: calculatedAmount })
          });
      });
    }
  }

  updatePaymentAmountGivenPaymentCategory(): void {
    if (this.editForm.get(['id'])?.value === undefined ) {
      this.editForm.get(['paymentCategory'])?.valueChanges.subscribe(cat => {

        let settlementAmount = 0;
        this.editForm.get(['paymentInvoices'])?.value.forEach(({ invoiceAmount }: IPaymentInvoice) => {
          settlementAmount += invoiceAmount ?? 0;
        })

        this.paymentCalculatorService.calculatePayableAmount(settlementAmount, cat)
          .subscribe(calculatedAmount => {
            this.editForm.patchValue({ paymentAmount: calculatedAmount })
          });
      });
    }
  }

  updatePreferredPaymentLabels(): void {
    if (this.editForm.get(['id'])?.value === undefined ) {
      this.universallyUniqueMappingService.findMap("globallyPreferredSettlementUpdatePaymentLabel")
        .subscribe((mapped) => {
          this.paymentLabelService.search(<SearchWithPagination>{ page: 0, size: 0, sort: [], query: mapped.body?.mappedValue })
            .subscribe(({ body: vals }) => {
              if (vals) {
                this.editForm.patchValue({
                  paymentLabels: [...vals]
                });
              }
            });
        });
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateBusinessDocument(update: IBusinessDocument[]): void {
    this.editForm.patchValue({
      businessDocuments: [...update],
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateDealer(dealerUpdate: IDealer): void {
    this.editForm.patchValue({
      biller: dealerUpdate,
    });
  }

  updateSignatories(dealerUpdate: IDealer[]): void {
    this.editForm.patchValue({
      signatories: [...dealerUpdate]
    });
  }

  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholders: [...update]
    });
  }

  updatePaymentLabels(update: IPaymentLabel[]): void {
    this.editForm.patchValue({
      paymentLabels: [...update]
    });
  }

  updateSettlementGroup(update: ISettlement): void {
    this.editForm.patchValue({
      groupSettlement: update
    });
  }

  updateCurrencies(update: ISettlementCurrency): void {
    this.editForm.patchValue({
      settlementCurrency: update
    });
  }

  updatePaymentCategory(update: IPaymentCategory): void {
    this.editForm.patchValue({
      paymentCategory: update
    });
  }

  updatePaymentInvoices(update: IPaymentInvoice[]): void {
    this.editForm.patchValue({
      paymentInvoices: update
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
    const settlement = this.settlementFormService.getSettlement(this.editForm);
    if (settlement.id !== null) {
      this.subscribeToSaveResponse(this.settlementService.update(settlement));
    } else {
      this.subscribeToSaveResponse(this.settlementService.create(settlement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISettlement>>): void {
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

  protected updateForm(settlement: ISettlement): void {
    this.settlement = settlement;
    this.settlementFormService.resetForm(this.editForm, settlement);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(settlement.placeholders ?? [])
    );
    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        settlement.settlementCurrency
      );
    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
      this.paymentLabelsSharedCollection,
      ...(settlement.paymentLabels ?? [])
    );
    this.paymentCategoriesSharedCollection = this.paymentCategoryService.addPaymentCategoryToCollectionIfMissing<IPaymentCategory>(
      this.paymentCategoriesSharedCollection,
      settlement.paymentCategory
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(
      this.settlementsSharedCollection,
      settlement.groupSettlement
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      settlement.biller,
      ...(settlement.signatories ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing<IPaymentInvoice>(
      this.paymentInvoicesSharedCollection,
      ...(settlement.paymentInvoices ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(settlement.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(placeholders, ...(this.settlement?.placeholders ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.settlement?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.paymentLabelService
      .query()
      .pipe(map((res: HttpResponse<IPaymentLabel[]>) => res.body ?? []))
      .pipe(
        map((paymentLabels: IPaymentLabel[]) =>
          this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
            paymentLabels,
            ...(this.settlement?.paymentLabels ?? [])
          )
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));

    this.paymentCategoryService
      .query()
      .pipe(map((res: HttpResponse<IPaymentCategory[]>) => res.body ?? []))
      .pipe(
        map((paymentCategories: IPaymentCategory[]) =>
          this.paymentCategoryService.addPaymentCategoryToCollectionIfMissing<IPaymentCategory>(
            paymentCategories,
            this.settlement?.paymentCategory
          )
        )
      )
      .subscribe((paymentCategories: IPaymentCategory[]) => (this.paymentCategoriesSharedCollection = paymentCategories));

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(settlements, this.settlement?.groupSettlement)
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(
            dealers,
            this.settlement?.biller,
            ...(this.settlement?.signatories ?? [])
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
            ...(this.settlement?.paymentInvoices ?? [])
          )
        )
      )
      .subscribe((paymentInvoices: IPaymentInvoice[]) => (this.paymentInvoicesSharedCollection = paymentInvoices));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.settlement?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
