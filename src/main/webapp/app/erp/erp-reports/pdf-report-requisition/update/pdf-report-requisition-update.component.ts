import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPdfReportRequisition, PdfReportRequisition } from '../pdf-report-requisition.model';
import { PdfReportRequisitionService } from '../service/pdf-report-requisition.service';
import { IReportTemplate } from '../../report-template/report-template.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { ReportTemplateService } from '../../report-template/service/report-template.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-pdf-report-requisition-update',
  templateUrl: './pdf-report-requisition-update.component.html',
})
export class PdfReportRequisitionUpdateComponent implements OnInit {
  isSaving = false;
  reportStatusTypesValues = Object.keys(ReportStatusTypes);

  reportTemplatesSharedCollection: IReportTemplate[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    reportName: [null, [Validators.required]],
    reportDate: [],
    userPassword: [null, []],
    ownerPassword: [null, [Validators.required]],
    reportStatus: [],
    reportId: [null, [Validators.required]],
    reportTemplate: [null, Validators.required],
    placeholders: [],
  });

  constructor(
    protected pdfReportRequisitionService: PdfReportRequisitionService,
    protected reportTemplateService: ReportTemplateService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pdfReportRequisition }) => {
      this.updateForm(pdfReportRequisition);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pdfReportRequisition = this.createFromForm();
    if (pdfReportRequisition.id !== undefined) {
      this.subscribeToSaveResponse(this.pdfReportRequisitionService.update(pdfReportRequisition));
    } else {
      this.subscribeToSaveResponse(this.pdfReportRequisitionService.create(pdfReportRequisition));
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPdfReportRequisition>>): void {
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

  protected updateForm(pdfReportRequisition: IPdfReportRequisition): void {
    this.editForm.patchValue({
      id: pdfReportRequisition.id,
      reportName: pdfReportRequisition.reportName,
      reportDate: pdfReportRequisition.reportDate,
      userPassword: pdfReportRequisition.userPassword,
      ownerPassword: pdfReportRequisition.ownerPassword,
      reportStatus: pdfReportRequisition.reportStatus,
      reportId: pdfReportRequisition.reportId,
      reportTemplate: pdfReportRequisition.reportTemplate,
      placeholders: pdfReportRequisition.placeholders,
    });

    this.reportTemplatesSharedCollection = this.reportTemplateService.addReportTemplateToCollectionIfMissing(
      this.reportTemplatesSharedCollection,
      pdfReportRequisition.reportTemplate
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(pdfReportRequisition.placeholders ?? [])
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

  protected createFromForm(): IPdfReportRequisition {
    return {
      ...new PdfReportRequisition(),
      id: this.editForm.get(['id'])!.value,
      reportName: this.editForm.get(['reportName'])!.value,
      reportDate: this.editForm.get(['reportDate'])!.value,
      userPassword: this.editForm.get(['userPassword'])!.value,
      ownerPassword: this.editForm.get(['ownerPassword'])!.value,
      reportStatus: this.editForm.get(['reportStatus'])!.value,
      reportId: this.editForm.get(['reportId'])!.value,
      reportTemplate: this.editForm.get(['reportTemplate'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
