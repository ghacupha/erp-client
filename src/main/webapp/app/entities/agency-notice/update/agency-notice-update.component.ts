import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAgencyNotice, AgencyNotice } from '../agency-notice.model';
import { AgencyNoticeService } from '../service/agency-notice.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { AgencyStatusType } from 'app/entities/enumerations/agency-status-type.model';

@Component({
  selector: 'jhi-agency-notice-update',
  templateUrl: './agency-notice-update.component.html',
})
export class AgencyNoticeUpdateComponent implements OnInit {
  isSaving = false;
  agencyStatusTypeValues = Object.keys(AgencyStatusType);

  dealersSharedCollection: IDealer[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    referenceNumber: [null, [Validators.required]],
    referenceDate: [],
    assessmentAmount: [null, [Validators.required]],
    agencyStatus: [null, [Validators.required]],
    assessmentNotice: [],
    assessmentNoticeContentType: [],
    correspondents: [],
    settlementCurrency: [],
    assessor: [],
    placeholders: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected agencyNoticeService: AgencyNoticeService,
    protected dealerService: DealerService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agencyNotice }) => {
      this.updateForm(agencyNotice);

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
    const agencyNotice = this.createFromForm();
    if (agencyNotice.id !== undefined) {
      this.subscribeToSaveResponse(this.agencyNoticeService.update(agencyNotice));
    } else {
      this.subscribeToSaveResponse(this.agencyNoticeService.create(agencyNotice));
    }
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackSettlementCurrencyById(index: number, item: ISettlementCurrency): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgencyNotice>>): void {
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

  protected updateForm(agencyNotice: IAgencyNotice): void {
    this.editForm.patchValue({
      id: agencyNotice.id,
      referenceNumber: agencyNotice.referenceNumber,
      referenceDate: agencyNotice.referenceDate,
      assessmentAmount: agencyNotice.assessmentAmount,
      agencyStatus: agencyNotice.agencyStatus,
      assessmentNotice: agencyNotice.assessmentNotice,
      assessmentNoticeContentType: agencyNotice.assessmentNoticeContentType,
      correspondents: agencyNotice.correspondents,
      settlementCurrency: agencyNotice.settlementCurrency,
      assessor: agencyNotice.assessor,
      placeholders: agencyNotice.placeholders,
    });

    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      ...(agencyNotice.correspondents ?? []),
      agencyNotice.assessor
    );
    this.settlementCurrenciesSharedCollection = this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
      this.settlementCurrenciesSharedCollection,
      agencyNotice.settlementCurrency
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(agencyNotice.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing(
            dealers,
            ...(this.editForm.get('correspondents')!.value ?? []),
            this.editForm.get('assessor')!.value
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
            settlementCurrencies,
            this.editForm.get('settlementCurrency')!.value
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

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

  protected createFromForm(): IAgencyNotice {
    return {
      ...new AgencyNotice(),
      id: this.editForm.get(['id'])!.value,
      referenceNumber: this.editForm.get(['referenceNumber'])!.value,
      referenceDate: this.editForm.get(['referenceDate'])!.value,
      assessmentAmount: this.editForm.get(['assessmentAmount'])!.value,
      agencyStatus: this.editForm.get(['agencyStatus'])!.value,
      assessmentNoticeContentType: this.editForm.get(['assessmentNoticeContentType'])!.value,
      assessmentNotice: this.editForm.get(['assessmentNotice'])!.value,
      correspondents: this.editForm.get(['correspondents'])!.value,
      settlementCurrency: this.editForm.get(['settlementCurrency'])!.value,
      assessor: this.editForm.get(['assessor'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
