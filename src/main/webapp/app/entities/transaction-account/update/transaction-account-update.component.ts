import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TransactionAccountFormService, TransactionAccountFormGroup } from './transaction-account-form.service';
import { ITransactionAccount } from '../transaction-account.model';
import { TransactionAccountService } from '../service/transaction-account.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-transaction-account-update',
  templateUrl: './transaction-account-update.component.html',
})
export class TransactionAccountUpdateComponent implements OnInit {
  isSaving = false;
  transactionAccount: ITransactionAccount | null = null;

  transactionAccountsSharedCollection: ITransactionAccount[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: TransactionAccountFormGroup = this.transactionAccountFormService.createTransactionAccountFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected transactionAccountService: TransactionAccountService,
    protected transactionAccountFormService: TransactionAccountFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTransactionAccount = (o1: ITransactionAccount | null, o2: ITransactionAccount | null): boolean =>
    this.transactionAccountService.compareTransactionAccount(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionAccount }) => {
      this.transactionAccount = transactionAccount;
      if (transactionAccount) {
        this.updateForm(transactionAccount);
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
    const transactionAccount = this.transactionAccountFormService.getTransactionAccount(this.editForm);
    if (transactionAccount.id !== null) {
      this.subscribeToSaveResponse(this.transactionAccountService.update(transactionAccount));
    } else {
      this.subscribeToSaveResponse(this.transactionAccountService.create(transactionAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionAccount>>): void {
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

  protected updateForm(transactionAccount: ITransactionAccount): void {
    this.transactionAccount = transactionAccount;
    this.transactionAccountFormService.resetForm(this.editForm, transactionAccount);

    this.transactionAccountsSharedCollection =
      this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
        this.transactionAccountsSharedCollection,
        transactionAccount.parentAccount
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
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
          this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
            transactionAccounts,
            this.transactionAccount?.parentAccount
          )
        )
      )
      .subscribe((transactionAccounts: ITransactionAccount[]) => (this.transactionAccountsSharedCollection = transactionAccounts));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.transactionAccount?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
