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

import { PrepaymentMarshallingFormService, PrepaymentMarshallingFormGroup } from './prepayment-marshalling-form.service';
import { IPrepaymentMarshalling } from '../prepayment-marshalling.model';
import { PrepaymentMarshallingService } from '../service/prepayment-marshalling.service';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayments/prepayment-account/service/prepayment-account.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-prepayment-marshalling-update',
  templateUrl: './prepayment-marshalling-update.component.html',
})
export class PrepaymentMarshallingUpdateComponent implements OnInit {
  isSaving = false;
  prepaymentMarshalling: IPrepaymentMarshalling | null = null;

  prepaymentAccountsSharedCollection: IPrepaymentAccount[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: PrepaymentMarshallingFormGroup = this.prepaymentMarshallingFormService.createPrepaymentMarshallingFormGroup();

  constructor(
    protected prepaymentMarshallingService: PrepaymentMarshallingService,
    protected prepaymentMarshallingFormService: PrepaymentMarshallingFormService,
    protected prepaymentAccountService: PrepaymentAccountService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePrepaymentAccount = (o1: IPrepaymentAccount | null, o2: IPrepaymentAccount | null): boolean =>
    this.prepaymentAccountService.comparePrepaymentAccount(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentMarshalling }) => {
      this.prepaymentMarshalling = prepaymentMarshalling;
      if (prepaymentMarshalling) {
        this.updateForm(prepaymentMarshalling);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepaymentMarshalling = this.prepaymentMarshallingFormService.getPrepaymentMarshalling(this.editForm);
    if (prepaymentMarshalling.id !== null) {
      this.subscribeToSaveResponse(this.prepaymentMarshallingService.update(prepaymentMarshalling));
    } else {
      this.subscribeToSaveResponse(this.prepaymentMarshallingService.create(prepaymentMarshalling));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentMarshalling>>): void {
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

  protected updateForm(prepaymentMarshalling: IPrepaymentMarshalling): void {
    this.prepaymentMarshalling = prepaymentMarshalling;
    this.prepaymentMarshallingFormService.resetForm(this.editForm, prepaymentMarshalling);

    this.prepaymentAccountsSharedCollection = this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
      this.prepaymentAccountsSharedCollection,
      prepaymentMarshalling.prepaymentAccount
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(prepaymentMarshalling.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.prepaymentAccountService
      .query()
      .pipe(map((res: HttpResponse<IPrepaymentAccount[]>) => res.body ?? []))
      .pipe(
        map((prepaymentAccounts: IPrepaymentAccount[]) =>
          this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
            prepaymentAccounts,
            this.prepaymentMarshalling?.prepaymentAccount
          )
        )
      )
      .subscribe((prepaymentAccounts: IPrepaymentAccount[]) => (this.prepaymentAccountsSharedCollection = prepaymentAccounts));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.prepaymentMarshalling?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
