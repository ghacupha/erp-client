///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ReportStatusFormService, ReportStatusFormGroup } from './report-status-form.service';
import { IReportStatus } from '../report-status.model';
import { ReportStatusService } from '../service/report-status.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IProcessStatus } from 'app/entities/system/process-status/process-status.model';
import { ProcessStatusService } from 'app/entities/system/process-status/service/process-status.service';

@Component({
  selector: 'jhi-report-status-update',
  templateUrl: './report-status-update.component.html',
})
export class ReportStatusUpdateComponent implements OnInit {
  isSaving = false;
  reportStatus: IReportStatus | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  processStatusesSharedCollection: IProcessStatus[] = [];

  editForm: ReportStatusFormGroup = this.reportStatusFormService.createReportStatusFormGroup();

  constructor(
    protected reportStatusService: ReportStatusService,
    protected reportStatusFormService: ReportStatusFormService,
    protected placeholderService: PlaceholderService,
    protected processStatusService: ProcessStatusService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareProcessStatus = (o1: IProcessStatus | null, o2: IProcessStatus | null): boolean =>
    this.processStatusService.compareProcessStatus(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportStatus }) => {
      this.reportStatus = reportStatus;
      if (reportStatus) {
        this.updateForm(reportStatus);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reportStatus = this.reportStatusFormService.getReportStatus(this.editForm);
    if (reportStatus.id !== null) {
      this.subscribeToSaveResponse(this.reportStatusService.update(reportStatus));
    } else {
      this.subscribeToSaveResponse(this.reportStatusService.create(reportStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportStatus>>): void {
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

  protected updateForm(reportStatus: IReportStatus): void {
    this.reportStatus = reportStatus;
    this.reportStatusFormService.resetForm(this.editForm, reportStatus);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(reportStatus.placeholders ?? [])
    );
    this.processStatusesSharedCollection = this.processStatusService.addProcessStatusToCollectionIfMissing<IProcessStatus>(
      this.processStatusesSharedCollection,
      reportStatus.processStatus
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
            ...(this.reportStatus?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.processStatusService
      .query()
      .pipe(map((res: HttpResponse<IProcessStatus[]>) => res.body ?? []))
      .pipe(
        map((processStatuses: IProcessStatus[]) =>
          this.processStatusService.addProcessStatusToCollectionIfMissing<IProcessStatus>(processStatuses, this.reportStatus?.processStatus)
        )
      )
      .subscribe((processStatuses: IProcessStatus[]) => (this.processStatusesSharedCollection = processStatuses));
  }
}
