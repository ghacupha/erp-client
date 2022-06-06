import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { v4 as uuidv4 } from 'uuid';
import { IXlsxReportRequisition, XlsxReportRequisition } from '../xlsx-report-requisition.model';
import { XlsxReportRequisitionService } from '../service/xlsx-report-requisition.service';
import { DataUtils } from 'app/core/util/data-util.service';
import { ReportStatusTypes } from '../../../erp-common/enumerations/report-status-types.model';
import { ReportTemplateService } from '../../report-template/service/report-template.service';
import { IReportTemplate } from '../../report-template/report-template.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-xlsx-report-requisition-update',
  templateUrl: './xlsx-report-requisition-update.component.html',
})
export class XlsxReportRequisitionUpdateComponent implements OnInit {
  isSaving = false;
  reportStatusTypesValues = Object.keys(ReportStatusTypes);

  reportTemplatesSharedCollection: IReportTemplate[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    reportName: [null, [Validators.required]],
    reportDate: [],
    userPassword: [null, []],
    reportStatus: [],
    reportId: [null, [Validators.required]],
    reportTemplate: [null, Validators.required],
    placeholders: [],
  });

  constructor(
    protected xlsxReportRequisitionService: XlsxReportRequisitionService,
    protected reportTemplateService: ReportTemplateService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: DataUtils,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ xlsxReportRequisition }) => {
      this.updateForm(xlsxReportRequisition);

      this.loadRelationshipsOptions();
    });

    this.editForm.patchValue({
      reportStatus: ReportStatusTypes.GENERATING,
      reportId: uuidv4(),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const xlsxReportRequisition = this.createFromForm();
    if (xlsxReportRequisition.id !== undefined) {
      this.subscribeToSaveResponse(this.xlsxReportRequisitionService.update(xlsxReportRequisition));
    } else {
      this.subscribeToSaveResponse(this.xlsxReportRequisitionService.create(xlsxReportRequisition));
    }
  }

  trackReportTemplateById(index: number, item: IReportTemplate): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IXlsxReportRequisition>>): void {
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

  protected updateForm(xlsxReportRequisition: IXlsxReportRequisition): void {
    this.editForm.patchValue({
      id: xlsxReportRequisition.id,
      reportName: xlsxReportRequisition.reportName,
      reportDate: xlsxReportRequisition.reportDate,
      userPassword: xlsxReportRequisition.userPassword,
      reportStatus: xlsxReportRequisition.reportStatus,
      reportId: xlsxReportRequisition.reportId,
      reportTemplate: xlsxReportRequisition.reportTemplate,
      placeholders: xlsxReportRequisition.placeholders,
    });

    this.reportTemplatesSharedCollection = this.reportTemplateService.addReportTemplateToCollectionIfMissing(
      this.reportTemplatesSharedCollection,
      xlsxReportRequisition.reportTemplate
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(xlsxReportRequisition.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.reportTemplateService
      .query()
      .pipe(map((res: HttpResponse<IReportTemplate[]>) => res.body ?? []))
      .pipe(
        map((reportTemplates: IReportTemplate[]) =>
          this.reportTemplateService.addReportTemplateToCollectionIfMissing(reportTemplates, this.editForm.get('reportTemplate')!.value)
        )
      )
      .subscribe((reportTemplates: IReportTemplate[]) => (this.reportTemplatesSharedCollection = reportTemplates));

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

  protected createFromForm(): IXlsxReportRequisition {
    return {
      ...new XlsxReportRequisition(),
      id: this.editForm.get(['id'])!.value,
      reportName: this.editForm.get(['reportName'])!.value,
      reportDate: this.editForm.get(['reportDate'])!.value,
      userPassword: this.editForm.get(['userPassword'])!.value,
      reportStatus: this.editForm.get(['reportStatus'])!.value,
      reportId: this.editForm.get(['reportId'])!.value,
      reportTemplate: this.editForm.get(['reportTemplate'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
