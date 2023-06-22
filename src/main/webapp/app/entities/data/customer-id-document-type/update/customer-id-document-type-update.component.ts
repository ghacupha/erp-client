import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CustomerIDDocumentTypeFormService, CustomerIDDocumentTypeFormGroup } from './customer-id-document-type-form.service';
import { ICustomerIDDocumentType } from '../customer-id-document-type.model';
import { CustomerIDDocumentTypeService } from '../service/customer-id-document-type.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-customer-id-document-type-update',
  templateUrl: './customer-id-document-type-update.component.html',
})
export class CustomerIDDocumentTypeUpdateComponent implements OnInit {
  isSaving = false;
  customerIDDocumentType: ICustomerIDDocumentType | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: CustomerIDDocumentTypeFormGroup = this.customerIDDocumentTypeFormService.createCustomerIDDocumentTypeFormGroup();

  constructor(
    protected customerIDDocumentTypeService: CustomerIDDocumentTypeService,
    protected customerIDDocumentTypeFormService: CustomerIDDocumentTypeFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerIDDocumentType }) => {
      this.customerIDDocumentType = customerIDDocumentType;
      if (customerIDDocumentType) {
        this.updateForm(customerIDDocumentType);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerIDDocumentType = this.customerIDDocumentTypeFormService.getCustomerIDDocumentType(this.editForm);
    if (customerIDDocumentType.id !== null) {
      this.subscribeToSaveResponse(this.customerIDDocumentTypeService.update(customerIDDocumentType));
    } else {
      this.subscribeToSaveResponse(this.customerIDDocumentTypeService.create(customerIDDocumentType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerIDDocumentType>>): void {
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

  protected updateForm(customerIDDocumentType: ICustomerIDDocumentType): void {
    this.customerIDDocumentType = customerIDDocumentType;
    this.customerIDDocumentTypeFormService.resetForm(this.editForm, customerIDDocumentType);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(customerIDDocumentType.placeholders ?? [])
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
            ...(this.customerIDDocumentType?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
