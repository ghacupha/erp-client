import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ReportContentTypeFormService, ReportContentTypeFormGroup } from './report-content-type-form.service';
import { IReportContentType } from '../report-content-type.model';
import { ReportContentTypeService } from '../service/report-content-type.service';
import { ISystemContentType } from 'app/entities/system/system-content-type/system-content-type.model';
import { SystemContentTypeService } from 'app/entities/system/system-content-type/service/system-content-type.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-report-content-type-update',
  templateUrl: './report-content-type-update.component.html',
})
export class ReportContentTypeUpdateComponent implements OnInit {
  isSaving = false;
  reportContentType: IReportContentType | null = null;

  systemContentTypesSharedCollection: ISystemContentType[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: ReportContentTypeFormGroup = this.reportContentTypeFormService.createReportContentTypeFormGroup();

  constructor(
    protected reportContentTypeService: ReportContentTypeService,
    protected reportContentTypeFormService: ReportContentTypeFormService,
    protected systemContentTypeService: SystemContentTypeService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSystemContentType = (o1: ISystemContentType | null, o2: ISystemContentType | null): boolean =>
    this.systemContentTypeService.compareSystemContentType(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportContentType }) => {
      this.reportContentType = reportContentType;
      if (reportContentType) {
        this.updateForm(reportContentType);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reportContentType = this.reportContentTypeFormService.getReportContentType(this.editForm);
    if (reportContentType.id !== null) {
      this.subscribeToSaveResponse(this.reportContentTypeService.update(reportContentType));
    } else {
      this.subscribeToSaveResponse(this.reportContentTypeService.create(reportContentType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportContentType>>): void {
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

  protected updateForm(reportContentType: IReportContentType): void {
    this.reportContentType = reportContentType;
    this.reportContentTypeFormService.resetForm(this.editForm, reportContentType);

    this.systemContentTypesSharedCollection = this.systemContentTypeService.addSystemContentTypeToCollectionIfMissing<ISystemContentType>(
      this.systemContentTypesSharedCollection,
      reportContentType.systemContentType
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(reportContentType.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.systemContentTypeService
      .query()
      .pipe(map((res: HttpResponse<ISystemContentType[]>) => res.body ?? []))
      .pipe(
        map((systemContentTypes: ISystemContentType[]) =>
          this.systemContentTypeService.addSystemContentTypeToCollectionIfMissing<ISystemContentType>(
            systemContentTypes,
            this.reportContentType?.systemContentType
          )
        )
      )
      .subscribe((systemContentTypes: ISystemContentType[]) => (this.systemContentTypesSharedCollection = systemContentTypes));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.reportContentType?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
