///
/// Erp System - Mark II No 26 (Baruch Series) Client v 0.1.2-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';

import { IAssetRegistration, AssetRegistration } from '../asset-registration.model';
import { AssetRegistrationService } from '../service/asset-registration.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { IAssetCategory } from '../../asset-category/asset-category.model';
import { IJobSheet } from '../../../erp-settlements/job-sheet/job-sheet.model';
import { SettlementService } from '../../../erp-settlements/settlement/service/settlement.service';
import { IDeliveryNote } from '../../../erp-settlements/delivery-note/delivery-note.model';
import { PurchaseOrderService } from '../../../erp-settlements/purchase-order/service/purchase-order.service';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { JobSheetService } from '../../../erp-settlements/job-sheet/service/job-sheet.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { ServiceOutletService } from '../../../erp-granular/service-outlet/service/service-outlet.service';
import { DeliveryNoteService } from '../../../erp-settlements/delivery-note/service/delivery-note.service';
import { AssetCategoryService } from '../../asset-category/service/asset-category.service';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { IPaymentInvoice } from '../../../erp-settlements/payment-invoice/payment-invoice.model';
import { ISettlement } from '../../../erp-settlements/settlement/settlement.model';
import { IPurchaseOrder } from '../../../erp-settlements/purchase-order/purchase-order.model';
import { PaymentInvoiceService } from '../../../erp-settlements/payment-invoice/service/payment-invoice.service';
import { PlaceholderSuggestionService } from '../../../erp-common/suggestion/placeholder-suggestion.service';
import { SettlementSuggestionService } from '../../../erp-common/suggestion/settlement-suggestion.service';
import { DealerSuggestionService } from '../../../erp-common/suggestion/dealer-suggestion.service';
import { PaymentInvoiceSuggestionService } from '../../../erp-common/suggestion/payment-invoice-suggestion.service';
import { PurchaseOrderSuggestionService } from '../../../erp-common/suggestion/purchase-order-suggestion.service';
import { DeliveryNotesSuggestionService } from '../../../erp-common/suggestion/delivery-notes-suggestion.service';
import { JobSheetSuggestionService } from '../../../erp-common/suggestion/job-sheet-suggestion.service';
import { ServiceOutletSuggestionService } from '../../../erp-common/suggestion/service-outlet-suggestion.service';
import { AssetCategorySuggestionService } from '../../../erp-common/suggestion/asset-category-suggestion.service';

@Component({
  selector: 'jhi-asset-registration-update',
  templateUrl: './asset-registration-update.component.html',
})
export class AssetRegistrationUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];
  paymentInvoicesSharedCollection: IPaymentInvoice[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  assetCategoriesSharedCollection: IAssetCategory[] = [];
  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  deliveryNotesSharedCollection: IDeliveryNote[] = [];
  jobSheetsSharedCollection: IJobSheet[] = [];
  dealersSharedCollection: IDealer[] = [];

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
    serviceOutlets: [null, Validators.required],
    settlements: [null, Validators.required],
    assetCategory: [null, Validators.required],
    purchaseOrders: [],
    deliveryNotes: [],
    jobSheets: [],
    dealer: [null, Validators.required],
    designatedUsers: [],
  });

  minAccountLengthTerm = 3;

  placeholdersLoading = false;
  placeholderControlInput$ = new Subject<string>();
  placeholderLookups$: Observable<IPlaceholder[]> = of([]);

  paymentInvoicesLoading = false;
  paymentInvoiceControlInput$ = new Subject<string>();
  paymentInvoiceLookups$: Observable<IPaymentInvoice[]> = of([]);

  settlementsLoading = false;
  settlementControlInput$ = new Subject<string>();
  settlementLookups$: Observable<ISettlement[]> = of([]);

  dealersLoading = false;
  dealersInput$ = new Subject<string>();
  dealerLookups$: Observable<IDealer[]> = of([]);

  designatedUsersLoading = false;
  designatedUsersControlInput$ = new Subject<string>();
  designatedUsersLookups$: Observable<IDealer[]> = of([]);

  purchaseOrdersLoading = false;
  purchaseOrderControlInput$ = new Subject<string>();
  purchaseOrderLookups$: Observable<IPurchaseOrder[]> = of([]);

  serviceOutletsLoading = false;
  serviceOutletControlInput$ = new Subject<string>();
  serviceOutletLookups$: Observable<IServiceOutlet[]> = of([]);

  assetCategoriesLoading = false;
  assetCategoryControlInput$ = new Subject<string>();
  assetCategoryLookups$: Observable<IAssetCategory[]> = of([]);

  deliveryNotesLoading = false;
  deliveryNotesControlInput$ = new Subject<string>();
  deliveryNoteLookups$: Observable<IDeliveryNote[]> = of([]);

  jobSheetsLoading = false;
  jobSheetsControlInput$ = new Subject<string>();
  jobSheetLookups$: Observable<IJobSheet[]> = of([]);

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected assetRegistrationService: AssetRegistrationService,
    protected placeholderService: PlaceholderService,
    protected paymentInvoiceService: PaymentInvoiceService,
    protected serviceOutletService: ServiceOutletService,
    protected settlementService: SettlementService,
    protected assetCategoryService: AssetCategoryService,
    protected purchaseOrderService: PurchaseOrderService,
    protected deliveryNoteService: DeliveryNoteService,
    protected jobSheetService: JobSheetService,
    protected dealerService: DealerService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected placeholderSuggestionService: PlaceholderSuggestionService,
    protected settlementSuggestionService: SettlementSuggestionService,
    protected dealerSuggestionService: DealerSuggestionService,
    protected paymentInvoiceSuggestionService: PaymentInvoiceSuggestionService,
    protected purchaseOrderSuggestionService: PurchaseOrderSuggestionService,
    protected deliveryNotesSuggestionService: DeliveryNotesSuggestionService,
    protected jobSheetsSuggestionService: JobSheetSuggestionService,
    protected serviceOutletSuggestionService: ServiceOutletSuggestionService,
    protected assetCategorySuggestionService: AssetCategorySuggestionService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetRegistration }) => {
      this.updateForm(assetRegistration);

      this.loadRelationshipsOptions();
    });

    // fire-up typeahead items
    this.loadPlaceholders();
    this.loadSettlements();
    this.loadDealers();
    this.loadPaymentInvoices();
    this.loadDesignatedUsers();
    this.loadPurchaseOrders();

    this.loadDeliveryNotes();
    this.loadJobSheets();
    this.loadServiceOutlets();
    this.loadAssetCategory();
  }

  // Load dynamic AssetCategory instances from the input-search stream
  loadAssetCategory(): void {
    this.assetCategoryLookups$ = concat(
      of([]), // default items
      this.assetCategoryControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.assetCategoriesLoading = true),
        switchMap(term => this.assetCategorySuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.assetCategoriesLoading = false)
        ))
      ),
      of([...this.serviceOutletsSharedCollection])
    );
  }

  // Load dynamic ServiceOutlet instances from the input-search stream
  loadServiceOutlets(): void {
    this.serviceOutletLookups$ = concat(
      of([]), // default items
      this.serviceOutletControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.serviceOutletsLoading = true),
        switchMap(term => this.serviceOutletSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.serviceOutletsLoading = false)
        ))
      ),
      of([...this.serviceOutletsSharedCollection])
    );
  }

  // Load dynamic JobSheets instances from input-search stream
  loadJobSheets(): void {
    this.jobSheetLookups$ = concat(
      of([]), // default items
      this.jobSheetsControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.jobSheetsLoading = true),
        switchMap(term => this.jobSheetsSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.jobSheetsLoading = false)
        ))
      ),
      of([...this.jobSheetsSharedCollection])
    );
  }

  // Load dynamic DeliveryNotes from input stream
  loadDeliveryNotes(): void {
    this.deliveryNoteLookups$ = concat(
      of([]), // default items
      this.deliveryNotesControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.deliveryNotesLoading = true),
        switchMap(term => this.deliveryNotesSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.deliveryNotesLoading = false)
        ))
      ),
      of([...this.deliveryNotesSharedCollection])
    );
  }

  loadPaymentInvoices(): void {
    this.paymentInvoiceLookups$ = concat(
      of([]), // default items
      this.paymentInvoiceControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.paymentInvoicesLoading = true),
        switchMap(term => this.paymentInvoiceSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.paymentInvoicesLoading = false)
        ))
      ),
      of([...this.paymentInvoicesSharedCollection])
    );
  }

  loadDealers(): void {
    this.dealerLookups$ = concat(
      of([]), // default items
      this.dealersInput$.pipe(
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
      ),
      of([...this.dealersSharedCollection])
    );
  }

  loadDesignatedUsers(): void {
    this.designatedUsersLookups$ = concat(
      of([]), // default items
      this.designatedUsersControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.designatedUsersLoading = true),
        switchMap(term => this.dealerSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.designatedUsersLoading = false)
        ))
      ),
      of([...this.dealersSharedCollection])
    );
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

  loadSettlements(): void {
    this.settlementLookups$ = concat(
      of([]), // default items
      this.settlementControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.settlementsLoading = true),
        switchMap(term => this.settlementSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.settlementsLoading = false)
        ))
      ),
      of([...this.settlementsSharedCollection])
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
        tap(() => this. purchaseOrdersLoading = true),
        switchMap(term => this.purchaseOrderSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this. purchaseOrdersLoading = false)
        ))
      ),
      of([...this.purchaseOrdersSharedCollection])
    );
  }

  trackPurchaseOrderByFn(item: IPurchaseOrder): number {
    return item.id!;
  }

  trackServiceOutletByFn(item: IServiceOutlet): number {
    return item.id!;
  }

  trackJobSheetByFn(item: IJobSheet): number {
    return item.id!;
  }

  trackAssetCategoryByFn(item: IAssetCategory): number {
    return item.id!;
  }

  trackDeliveryNoteByFn(item: IDeliveryNote): number {
    return item.id!;
  }

  trackPaymentInvoiceByFn(item: IPaymentInvoice): number {
    return item.id!;
  }

  trackDealerByFn(item: IDealer): number {
    return item.id!;
  }

  trackPlaceholdersByFn(item: IPlaceholder): number {
    return item.id!;
  }

  trackSettlementByFn(item: ISettlement): number {
    return item.id!;
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

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackPaymentInvoiceById(index: number, item: IPaymentInvoice): number {
    return item.id!;
  }

  trackServiceOutletById(index: number, item: IServiceOutlet): number {
    return item.id!;
  }

  trackSettlementById(index: number, item: ISettlement): number {
    return item.id!;
  }

  trackAssetCategoryById(index: number, item: IAssetCategory): number {
    return item.id!;
  }

  trackPurchaseOrderById(index: number, item: IPurchaseOrder): number {
    return item.id!;
  }

  trackDeliveryNoteById(index: number, item: IDeliveryNote): number {
    return item.id!;
  }

  trackJobSheetById(index: number, item: IJobSheet): number {
    return item.id!;
  }

  trackDealerById(index: number, item: IDealer): number {
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

  getSelectedPaymentInvoice(option: IPaymentInvoice, selectedVals?: IPaymentInvoice[]): IPaymentInvoice {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedServiceOutlet(option: IServiceOutlet, selectedVals?: IServiceOutlet[]): IServiceOutlet {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedSettlement(option: ISettlement, selectedVals?: ISettlement[]): ISettlement {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedPurchaseOrder(option: IPurchaseOrder, selectedVals?: IPurchaseOrder[]): IPurchaseOrder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedDeliveryNote(option: IDeliveryNote, selectedVals?: IDeliveryNote[]): IDeliveryNote {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedJobSheet(option: IJobSheet, selectedVals?: IJobSheet[]): IJobSheet {
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
      serviceOutlets: assetRegistration.serviceOutlets,
      settlements: assetRegistration.settlements,
      assetCategory: assetRegistration.assetCategory,
      purchaseOrders: assetRegistration.purchaseOrders,
      deliveryNotes: assetRegistration.deliveryNotes,
      jobSheets: assetRegistration.jobSheets,
      dealer: assetRegistration.dealer,
      designatedUsers: assetRegistration.designatedUsers,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(assetRegistration.placeholders ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing(
      this.paymentInvoicesSharedCollection,
      ...(assetRegistration.paymentInvoices ?? [])
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing(
      this.serviceOutletsSharedCollection,
      ...(assetRegistration.serviceOutlets ?? [])
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing(
      this.settlementsSharedCollection,
      ...(assetRegistration.settlements ?? [])
    );
    this.assetCategoriesSharedCollection = this.assetCategoryService.addAssetCategoryToCollectionIfMissing(
      this.assetCategoriesSharedCollection,
      assetRegistration.assetCategory
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing(
      this.purchaseOrdersSharedCollection,
      ...(assetRegistration.purchaseOrders ?? [])
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing(
      this.deliveryNotesSharedCollection,
      ...(assetRegistration.deliveryNotes ?? [])
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing(
      this.jobSheetsSharedCollection,
      ...(assetRegistration.jobSheets ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      assetRegistration.dealer,
      ...(assetRegistration.designatedUsers ?? [])
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

    this.paymentInvoiceService
      .query()
      .pipe(map((res: HttpResponse<IPaymentInvoice[]>) => res.body ?? []))
      .pipe(
        map((paymentInvoices: IPaymentInvoice[]) =>
          this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing(
            paymentInvoices,
            ...(this.editForm.get('paymentInvoices')!.value ?? [])
          )
        )
      )
      .subscribe((paymentInvoices: IPaymentInvoice[]) => (this.paymentInvoicesSharedCollection = paymentInvoices));

    this.serviceOutletService
      .query()
      .pipe(map((res: HttpResponse<IServiceOutlet[]>) => res.body ?? []))
      .pipe(
        map((serviceOutlets: IServiceOutlet[]) =>
          this.serviceOutletService.addServiceOutletToCollectionIfMissing(
            serviceOutlets,
            ...(this.editForm.get('serviceOutlets')!.value ?? [])
          )
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing(settlements, ...(this.editForm.get('settlements')!.value ?? []))
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.assetCategoryService
      .query()
      .pipe(map((res: HttpResponse<IAssetCategory[]>) => res.body ?? []))
      .pipe(
        map((assetCategories: IAssetCategory[]) =>
          this.assetCategoryService.addAssetCategoryToCollectionIfMissing(assetCategories, this.editForm.get('assetCategory')!.value)
        )
      )
      .subscribe((assetCategories: IAssetCategory[]) => (this.assetCategoriesSharedCollection = assetCategories));

    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing(
            purchaseOrders,
            ...(this.editForm.get('purchaseOrders')!.value ?? [])
          )
        )
      )
      .subscribe((purchaseOrders: IPurchaseOrder[]) => (this.purchaseOrdersSharedCollection = purchaseOrders));

    this.deliveryNoteService
      .query()
      .pipe(map((res: HttpResponse<IDeliveryNote[]>) => res.body ?? []))
      .pipe(
        map((deliveryNotes: IDeliveryNote[]) =>
          this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing(deliveryNotes, ...(this.editForm.get('deliveryNotes')!.value ?? []))
        )
      )
      .subscribe((deliveryNotes: IDeliveryNote[]) => (this.deliveryNotesSharedCollection = deliveryNotes));

    this.jobSheetService
      .query()
      .pipe(map((res: HttpResponse<IJobSheet[]>) => res.body ?? []))
      .pipe(
        map((jobSheets: IJobSheet[]) =>
          this.jobSheetService.addJobSheetToCollectionIfMissing(jobSheets, ...(this.editForm.get('jobSheets')!.value ?? []))
        )
      )
      .subscribe((jobSheets: IJobSheet[]) => (this.jobSheetsSharedCollection = jobSheets));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing(
            dealers,
            this.editForm.get('dealer')!.value,
            ...(this.editForm.get('designatedUsers')!.value ?? [])
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));
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
      serviceOutlets: this.editForm.get(['serviceOutlets'])!.value,
      settlements: this.editForm.get(['settlements'])!.value,
      assetCategory: this.editForm.get(['assetCategory'])!.value,
      purchaseOrders: this.editForm.get(['purchaseOrders'])!.value,
      deliveryNotes: this.editForm.get(['deliveryNotes'])!.value,
      jobSheets: this.editForm.get(['jobSheets'])!.value,
      dealer: this.editForm.get(['dealer'])!.value,
      designatedUsers: this.editForm.get(['designatedUsers'])!.value,
    };
  }
}
