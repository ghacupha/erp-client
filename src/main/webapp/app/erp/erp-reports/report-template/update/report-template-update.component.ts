import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReportTemplate, ReportTemplate } from '../report-template.model';
import { ReportTemplateService } from '../service/report-template.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { sha512 } from 'hash-wasm';

@Component({
  selector: 'jhi-report-template-update',
  templateUrl: './report-template-update.component.html',
})
export class ReportTemplateUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    catalogueNumber: [null, [Validators.required]],
    description: [],
    notes: [],
    notesContentType: [],
    reportFile: [],
    reportFileContentType: [],
    compileReportFile: [],
    compileReportFileContentType: [],
    placeholders: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected reportTemplateService: ReportTemplateService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportTemplate }) => {
      this.updateForm(reportTemplate);

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
    const reportTemplate = this.createFromForm();
    if (reportTemplate.id !== undefined) {
      this.subscribeToSaveResponse(this.reportTemplateService.update(reportTemplate));
    } else {
      this.subscribeToSaveResponse(this.reportTemplateService.create(reportTemplate));
    }
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportTemplate>>): void {
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

  protected updateForm(reportTemplate: IReportTemplate): void {
    this.editForm.patchValue({
      id: reportTemplate.id,
      catalogueNumber: reportTemplate.catalogueNumber,
      description: reportTemplate.description,
      notes: reportTemplate.notes,
      notesContentType: reportTemplate.notesContentType,
      reportFile: reportTemplate.reportFile,
      reportFileContentType: reportTemplate.reportFileContentType,
      compileReportFile: reportTemplate.compileReportFile,
      compileReportFileContentType: reportTemplate.compileReportFileContentType,
      placeholders: reportTemplate.placeholders,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(reportTemplate.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
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

  protected createFromForm(): IReportTemplate {

    let checkSumPlaceholder: IPlaceholder | null = {};

    sha512(this.editForm.get(['reportFile'])!.value).then(tk => {
      this.placeholderService.create({
        description: this.editForm.get(['catalogueNumber'])!.value,
        token: tk,
      }).subscribe(pl => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (pl) {
          checkSumPlaceholder = pl.body;
        }
        this.editForm.patchValue({
          placeholders: [ checkSumPlaceholder],
        });
      });
    });

    return {
      ...new ReportTemplate(),
      id: this.editForm.get(['id'])!.value,
      catalogueNumber: this.editForm.get(['catalogueNumber'])!.value,
      description: this.editForm.get(['description'])!.value,
      notesContentType: this.editForm.get(['notesContentType'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      reportFileContentType: this.editForm.get(['reportFileContentType'])!.value,
      reportFile: this.editForm.get(['reportFile'])!.value,
      compileReportFileContentType: this.editForm.get(['compileReportFileContentType'])!.value,
      compileReportFile: this.editForm.get(['compileReportFile'])!.value,
      placeholders: [this.editForm.get(['placeholders'])!.value, checkSumPlaceholder],
    };
  }
}
