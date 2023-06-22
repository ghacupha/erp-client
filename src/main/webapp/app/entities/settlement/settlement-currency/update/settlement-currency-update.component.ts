import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SettlementCurrencyFormService, SettlementCurrencyFormGroup } from './settlement-currency-form.service';
import { ISettlementCurrency } from '../settlement-currency.model';
import { SettlementCurrencyService } from '../service/settlement-currency.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-settlement-currency-update',
  templateUrl: './settlement-currency-update.component.html',
})
export class SettlementCurrencyUpdateComponent implements OnInit {
  isSaving = false;
  settlementCurrency: ISettlementCurrency | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: SettlementCurrencyFormGroup = this.settlementCurrencyFormService.createSettlementCurrencyFormGroup();

  constructor(
    protected settlementCurrencyService: SettlementCurrencyService,
    protected settlementCurrencyFormService: SettlementCurrencyFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ settlementCurrency }) => {
      this.settlementCurrency = settlementCurrency;
      if (settlementCurrency) {
        this.updateForm(settlementCurrency);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const settlementCurrency = this.settlementCurrencyFormService.getSettlementCurrency(this.editForm);
    if (settlementCurrency.id !== null) {
      this.subscribeToSaveResponse(this.settlementCurrencyService.update(settlementCurrency));
    } else {
      this.subscribeToSaveResponse(this.settlementCurrencyService.create(settlementCurrency));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISettlementCurrency>>): void {
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

  protected updateForm(settlementCurrency: ISettlementCurrency): void {
    this.settlementCurrency = settlementCurrency;
    this.settlementCurrencyFormService.resetForm(this.editForm, settlementCurrency);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(settlementCurrency.placeholders ?? [])
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
            ...(this.settlementCurrency?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
