import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IsoCountryCodeFormService, IsoCountryCodeFormGroup } from './iso-country-code-form.service';
import { IIsoCountryCode } from '../iso-country-code.model';
import { IsoCountryCodeService } from '../service/iso-country-code.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-iso-country-code-update',
  templateUrl: './iso-country-code-update.component.html',
})
export class IsoCountryCodeUpdateComponent implements OnInit {
  isSaving = false;
  isoCountryCode: IIsoCountryCode | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: IsoCountryCodeFormGroup = this.isoCountryCodeFormService.createIsoCountryCodeFormGroup();

  constructor(
    protected isoCountryCodeService: IsoCountryCodeService,
    protected isoCountryCodeFormService: IsoCountryCodeFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ isoCountryCode }) => {
      this.isoCountryCode = isoCountryCode;
      if (isoCountryCode) {
        this.updateForm(isoCountryCode);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const isoCountryCode = this.isoCountryCodeFormService.getIsoCountryCode(this.editForm);
    if (isoCountryCode.id !== null) {
      this.subscribeToSaveResponse(this.isoCountryCodeService.update(isoCountryCode));
    } else {
      this.subscribeToSaveResponse(this.isoCountryCodeService.create(isoCountryCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIsoCountryCode>>): void {
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

  protected updateForm(isoCountryCode: IIsoCountryCode): void {
    this.isoCountryCode = isoCountryCode;
    this.isoCountryCodeFormService.resetForm(this.editForm, isoCountryCode);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(isoCountryCode.placeholders ?? [])
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
            ...(this.isoCountryCode?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
