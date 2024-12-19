///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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

import { ITransactionAccount, TransactionAccount } from '../transaction-account.model';
import { TransactionAccountService } from '../service/transaction-account.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import {
  copyingTransactionAccountStatus,
  creatingTransactionAccountStatus,
  editingTransactionAccountStatus,
  transactionAccountUpdateSelectedInstance
} from '../../../store/selectors/transaction-account-update-status.selectors';

@Component({
  selector: 'jhi-transaction-account-update',
  templateUrl: './transaction-account-update.component.html',
})
export class TransactionAccountUpdateComponent implements OnInit {
  isSaving = false;

  // Setting up default form states
  weAreCopying = false;
  weAreEditing = false;
  weAreCreating = false;
  selectedItem = {...new TransactionAccount()}

  transactionAccountsSharedCollection: ITransactionAccount[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    accountNumber: [null, [Validators.required]],
    accountName: [null, [Validators.required]],
    notes: [],
    notesContentType: [],
    parentAccount: [],
    placeholders: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected transactionAccountService: TransactionAccountService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected store: Store<State>,
  ) {
    this.store.pipe(select(copyingTransactionAccountStatus)).subscribe(stat => this.weAreCopying = stat);
    this.store.pipe(select(editingTransactionAccountStatus)).subscribe(stat => this.weAreEditing = stat);
    this.store.pipe(select(creatingTransactionAccountStatus)).subscribe(stat => this.weAreCreating = stat);
    this.store.pipe(select(transactionAccountUpdateSelectedInstance)).subscribe(copied => this.selectedItem = copied);
  }

  ngOnInit(): void {
    if (this.weAreEditing) {
      this.updateForm(this.selectedItem);
    }

    if (this.weAreCopying) {
      this.updateForm(this.selectedItem);
    }

    if (this.weAreCreating) {
      this.loadRelationshipsOptions();
    }
  }

  trackPlaceholdersByFn(item: IPlaceholder): number {
    return item.id!;
  }

  trackTransactionAccountsByFn(item: ITransactionAccount): number {
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
    this.subscribeToSaveResponse(this.transactionAccountService.create(this.createFromForm()));
  }

  edit(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.transactionAccountService.update(this.createFromForm()));
  }

  copy(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.transactionAccountService.create(this.copyFromForm()));
  }

  trackTransactionAccountById(index: number, item: ITransactionAccount): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  updateParentAccount(value: ITransactionAccount): void {
      this.editForm.patchValue({
        parentAccount: value
      });
  }

  updatePlaceholders(value: IPlaceholder[]): void {
      this.editForm.patchValue({
        placeholders: [...value]
      });
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionAccount>>): void {
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

  protected updateForm(transactionAccount: ITransactionAccount): void {
    this.editForm.patchValue({
      id: transactionAccount.id,
      accountNumber: transactionAccount.accountNumber,
      accountName: transactionAccount.accountName,
      notes: transactionAccount.notes,
      notesContentType: transactionAccount.notesContentType,
      parentAccount: transactionAccount.parentAccount,
      placeholders: transactionAccount.placeholders,
    });

    this.transactionAccountsSharedCollection = this.transactionAccountService.addTransactionAccountToCollectionIfMissing(
      this.transactionAccountsSharedCollection,
      transactionAccount.parentAccount
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(transactionAccount.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.transactionAccountService
      .query()
      .pipe(map((res: HttpResponse<ITransactionAccount[]>) => res.body ?? []))
      .pipe(
        map((transactionAccounts: ITransactionAccount[]) =>
          this.transactionAccountService.addTransactionAccountToCollectionIfMissing(
            transactionAccounts,
            this.editForm.get('parentAccount')!.value
          )
        )
      )
      .subscribe((transactionAccounts: ITransactionAccount[]) => (this.transactionAccountsSharedCollection = transactionAccounts));

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

  protected createFromForm(): ITransactionAccount {
    return {
      ...new TransactionAccount(),
      id: this.editForm.get(['id'])!.value,
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      accountName: this.editForm.get(['accountName'])!.value,
      notesContentType: this.editForm.get(['notesContentType'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      parentAccount: this.editForm.get(['parentAccount'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }

  protected copyFromForm(): ITransactionAccount {
    return {
      ...new TransactionAccount(),
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      accountName: this.editForm.get(['accountName'])!.value,
      notesContentType: this.editForm.get(['notesContentType'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      parentAccount: this.editForm.get(['parentAccount'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
