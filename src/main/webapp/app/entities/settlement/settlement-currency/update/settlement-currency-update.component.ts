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
