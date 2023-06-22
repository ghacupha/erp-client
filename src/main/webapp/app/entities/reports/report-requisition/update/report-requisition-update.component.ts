import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ReportRequisitionFormService, ReportRequisitionFormGroup } from './report-requisition-form.service';
import { IReportRequisition } from '../report-requisition.model';
import { ReportRequisitionService } from '../service/report-requisition.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IReportTemplate } from 'app/entities/reports/report-template/report-template.model';
import { ReportTemplateService } from 'app/entities/reports/report-template/service/report-template.service';
import { IReportContentType } from 'app/entities/reports/report-content-type/report-content-type.model';
import { ReportContentTypeService } from 'app/entities/reports/report-content-type/service/report-content-type.service';
import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

@Component({
  selector: 'jhi-report-requisition-update',
  templateUrl: './report-requisition-update.component.html',
})
export class ReportRequisitionUpdateComponent implements OnInit {
  isSaving = false;
  reportRequisition: IReportRequisition | null = null;
  reportStatusTypesValues = Object.keys(ReportStatusTypes);

  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  reportTemplatesSharedCollection: IReportTemplate[] = [];
  reportContentTypesSharedCollection: IReportContentType[] = [];

  editForm: ReportRequisitionFormGroup = this.reportRequisitionFormService.createReportRequisitionFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected reportRequisitionService: ReportRequisitionService,
    protected reportRequisitionFormService: ReportRequisitionFormService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected reportTemplateService: ReportTemplateService,
    protected reportContentTypeService: ReportContentTypeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareReportTemplate = (o1: IReportTemplate | null, o2: IReportTemplate | null): boolean =>
    this.reportTemplateService.compareReportTemplate(o1, o2);

  compareReportContentType = (o1: IReportContentType | null, o2: IReportContentType | null): boolean =>
    this.reportContentTypeService.compareReportContentType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportRequisition }) => {
      this.reportRequisition = reportRequisition;
      if (reportRequisition) {
        this.updateForm(reportRequisition);
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
    const reportRequisition = this.reportRequisitionFormService.getReportRequisition(this.editForm);
    if (reportRequisition.id !== null) {
      this.subscribeToSaveResponse(this.reportRequisitionService.update(reportRequisition));
    } else {
      this.subscribeToSaveResponse(this.reportRequisitionService.create(reportRequisition));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportRequisition>>): void {
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

  protected updateForm(reportRequisition: IReportRequisition): void {
    this.reportRequisition = reportRequisition;
    this.reportRequisitionFormService.resetForm(this.editForm, reportRequisition);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(reportRequisition.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(reportRequisition.parameters ?? [])
      );
    this.reportTemplatesSharedCollection = this.reportTemplateService.addReportTemplateToCollectionIfMissing<IReportTemplate>(
      this.reportTemplatesSharedCollection,
      reportRequisition.reportTemplate
    );
    this.reportContentTypesSharedCollection = this.reportContentTypeService.addReportContentTypeToCollectionIfMissing<IReportContentType>(
      this.reportContentTypesSharedCollection,
      reportRequisition.reportContentType
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
            ...(this.reportRequisition?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.reportRequisition?.parameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.reportTemplateService
      .query()
      .pipe(map((res: HttpResponse<IReportTemplate[]>) => res.body ?? []))
      .pipe(
        map((reportTemplates: IReportTemplate[]) =>
          this.reportTemplateService.addReportTemplateToCollectionIfMissing<IReportTemplate>(
            reportTemplates,
            this.reportRequisition?.reportTemplate
          )
        )
      )
      .subscribe((reportTemplates: IReportTemplate[]) => (this.reportTemplatesSharedCollection = reportTemplates));

    this.reportContentTypeService
      .query()
      .pipe(map((res: HttpResponse<IReportContentType[]>) => res.body ?? []))
      .pipe(
        map((reportContentTypes: IReportContentType[]) =>
          this.reportContentTypeService.addReportContentTypeToCollectionIfMissing<IReportContentType>(
            reportContentTypes,
            this.reportRequisition?.reportContentType
          )
        )
      )
      .subscribe((reportContentTypes: IReportContentType[]) => (this.reportContentTypesSharedCollection = reportContentTypes));
  }
}
