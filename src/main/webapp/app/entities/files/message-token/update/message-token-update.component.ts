import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MessageTokenFormService, MessageTokenFormGroup } from './message-token-form.service';
import { IMessageToken } from '../message-token.model';
import { MessageTokenService } from '../service/message-token.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-message-token-update',
  templateUrl: './message-token-update.component.html',
})
export class MessageTokenUpdateComponent implements OnInit {
  isSaving = false;
  messageToken: IMessageToken | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: MessageTokenFormGroup = this.messageTokenFormService.createMessageTokenFormGroup();

  constructor(
    protected messageTokenService: MessageTokenService,
    protected messageTokenFormService: MessageTokenFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ messageToken }) => {
      this.messageToken = messageToken;
      if (messageToken) {
        this.updateForm(messageToken);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const messageToken = this.messageTokenFormService.getMessageToken(this.editForm);
    if (messageToken.id !== null) {
      this.subscribeToSaveResponse(this.messageTokenService.update(messageToken));
    } else {
      this.subscribeToSaveResponse(this.messageTokenService.create(messageToken));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageToken>>): void {
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

  protected updateForm(messageToken: IMessageToken): void {
    this.messageToken = messageToken;
    this.messageTokenFormService.resetForm(this.editForm, messageToken);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(messageToken.placeholders ?? [])
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
            ...(this.messageToken?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
