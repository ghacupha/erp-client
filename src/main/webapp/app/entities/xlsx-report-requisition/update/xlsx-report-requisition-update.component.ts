import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { XlsxReportRequisitionFormService, XlsxReportRequisitionFormGroup } from './xlsx-report-requisition-form.service';
import { IXlsxReportRequisition } from '../xlsx-report-requisition.model';
import { XlsxReportRequisitionService } from '../service/xlsx-report-requisition.service';
import { IReportTemplate } from 'app/entities/report-template/report-template.model';
import { ReportTemplateService } from 'app/entities/report-template/service/report-template.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

@Component({
  selector: 'jhi-xlsx-report-requisition-update',
  templateUrl: './xlsx-report-requisition-update.component.html',
})
export class XlsxReportRequisitionUpdateComponent implements OnInit {
  isSaving = false;
  xlsxReportRequisition: IXlsxReportRequisition | null = null;
  reportStatusTypesValues = Object.keys(ReportStatusTypes);

  reportTemplatesSharedCollection: IReportTemplate[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm: XlsxReportRequisitionFormGroup = this.xlsxReportRequisitionFormService.createXlsxReportRequisitionFormGroup();

  constructor(
    protected xlsxReportRequisitionService: XlsxReportRequisitionService,
    protected xlsxReportRequisitionFormService: XlsxReportRequisitionFormService,
    protected reportTemplateService: ReportTemplateService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareReportTemplate = (o1: IReportTemplate | null, o2: IReportTemplate | null): boolean =>
    this.reportTemplateService.compareReportTemplate(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ xlsxReportRequisition }) => {
      this.xlsxReportRequisition = xlsxReportRequisition;
      if (xlsxReportRequisition) {
        this.updateForm(xlsxReportRequisition);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const xlsxReportRequisition = this.xlsxReportRequisitionFormService.getXlsxReportRequisition(this.editForm);
    if (xlsxReportRequisition.id !== null) {
      this.subscribeToSaveResponse(this.xlsxReportRequisitionService.update(xlsxReportRequisition));
    } else {
      this.subscribeToSaveResponse(this.xlsxReportRequisitionService.create(xlsxReportRequisition));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IXlsxReportRequisition>>): void {
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

  protected updateForm(xlsxReportRequisition: IXlsxReportRequisition): void {
    this.xlsxReportRequisition = xlsxReportRequisition;
    this.xlsxReportRequisitionFormService.resetForm(this.editForm, xlsxReportRequisition);

    this.reportTemplatesSharedCollection = this.reportTemplateService.addReportTemplateToCollectionIfMissing<IReportTemplate>(
      this.reportTemplatesSharedCollection,
      xlsxReportRequisition.reportTemplate
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(xlsxReportRequisition.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(xlsxReportRequisition.parameters ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.reportTemplateService
      .query()
      .pipe(map((res: HttpResponse<IReportTemplate[]>) => res.body ?? []))
      .pipe(
        map((reportTemplates: IReportTemplate[]) =>
          this.reportTemplateService.addReportTemplateToCollectionIfMissing<IReportTemplate>(
            reportTemplates,
            this.xlsxReportRequisition?.reportTemplate
          )
        )
      )
      .subscribe((reportTemplates: IReportTemplate[]) => (this.reportTemplatesSharedCollection = reportTemplates));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.xlsxReportRequisition?.placeholders ?? [])
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
            ...(this.xlsxReportRequisition?.parameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }
}
