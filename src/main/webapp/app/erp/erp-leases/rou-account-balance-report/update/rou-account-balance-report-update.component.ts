///
/// Erp System - Mark X No 7 (Jehoiada Series) Client 1.7.5
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
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IRouAccountBalanceReport, RouAccountBalanceReport } from '../rou-account-balance-report.model';
import { RouAccountBalanceReportService } from '../service/rou-account-balance-report.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IFiscalMonth } from '../../../erp-pages/fiscal-month/fiscal-month.model';
import { FiscalMonthService } from '../../../erp-pages/fiscal-month/service/fiscal-month.service';
import { IApplicationUser } from '../../../erp-pages/application-user/application-user.model';
import { ApplicationUserService } from '../../../erp-pages/application-user/service/application-user.service';
import { uuidv7 } from 'uuidv7';

@Component({
  selector: 'jhi-rou-account-balance-report-update',
  templateUrl: './rou-account-balance-report-update.component.html',
})
export class RouAccountBalanceReportUpdateComponent implements OnInit {
  isSaving = false;

  applicationUsersSharedCollection: IApplicationUser[] = [];
  fiscalMonthsSharedCollection: IFiscalMonth[] = [];

  editForm = this.fb.group({
    id: [],
    requestId: [null, [Validators.required]],
    timeOfRequest: [],
    reportIsCompiled: [],
    fileChecksum: [],
    tampered: [],
    filename: [null, []],
    reportParameters: [],
    reportFile: [],
    reportFileContentType: [],
    requestedBy: [],
    reportingMonth: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected rouAccountBalanceReportService: RouAccountBalanceReportService,
    protected applicationUserService: ApplicationUserService,
    protected fiscalMonthService: FiscalMonthService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rouAccountBalanceReport }) => {
      if (rouAccountBalanceReport.id === undefined) {
        const today = dayjs();
        rouAccountBalanceReport.timeOfRequest = today;

        rouAccountBalanceReport.requestId = uuidv7();

        rouAccountBalanceReport.filename = uuidv7();
      }

      this.updateForm(rouAccountBalanceReport);

      this.loadRelationshipsOptions();
    });
  }

  updateReportingMonth(update: IFiscalMonth): void {
    this.editForm.patchValue({
      reportingMonth: update
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
    const rouAccountBalanceReport = this.createFromForm();
    if (rouAccountBalanceReport.id !== undefined) {
      this.subscribeToSaveResponse(this.rouAccountBalanceReportService.update(rouAccountBalanceReport));
    } else {
      this.subscribeToSaveResponse(this.rouAccountBalanceReportService.create(rouAccountBalanceReport));
    }
  }

  trackApplicationUserById(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  trackFiscalMonthById(index: number, item: IFiscalMonth): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRouAccountBalanceReport>>): void {
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

  protected updateForm(rouAccountBalanceReport: IRouAccountBalanceReport): void {
    this.editForm.patchValue({
      id: rouAccountBalanceReport.id,
      requestId: rouAccountBalanceReport.requestId,
      timeOfRequest: rouAccountBalanceReport.timeOfRequest ? rouAccountBalanceReport.timeOfRequest.format(DATE_TIME_FORMAT) : null,
      reportIsCompiled: rouAccountBalanceReport.reportIsCompiled,
      fileChecksum: rouAccountBalanceReport.fileChecksum,
      tampered: rouAccountBalanceReport.tampered,
      filename: rouAccountBalanceReport.filename,
      reportParameters: rouAccountBalanceReport.reportParameters,
      reportFile: rouAccountBalanceReport.reportFile,
      reportFileContentType: rouAccountBalanceReport.reportFileContentType,
      requestedBy: rouAccountBalanceReport.requestedBy,
      reportingMonth: rouAccountBalanceReport.reportingMonth,
    });

    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing(
      this.applicationUsersSharedCollection,
      rouAccountBalanceReport.requestedBy
    );
    this.fiscalMonthsSharedCollection = this.fiscalMonthService.addFiscalMonthToCollectionIfMissing(
      this.fiscalMonthsSharedCollection,
      rouAccountBalanceReport.reportingMonth
    );
  }

  protected loadRelationshipsOptions(): void {
    this.applicationUserService
      .query()
      .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
      .pipe(
        map((applicationUsers: IApplicationUser[]) =>
          this.applicationUserService.addApplicationUserToCollectionIfMissing(applicationUsers, this.editForm.get('requestedBy')!.value)
        )
      )
      .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));

    this.fiscalMonthService
      .query()
      .pipe(map((res: HttpResponse<IFiscalMonth[]>) => res.body ?? []))
      .pipe(
        map((fiscalMonths: IFiscalMonth[]) =>
          this.fiscalMonthService.addFiscalMonthToCollectionIfMissing(fiscalMonths, this.editForm.get('reportingMonth')!.value)
        )
      )
      .subscribe((fiscalMonths: IFiscalMonth[]) => (this.fiscalMonthsSharedCollection = fiscalMonths));
  }

  protected createFromForm(): IRouAccountBalanceReport {
    return {
      ...new RouAccountBalanceReport(),
      id: this.editForm.get(['id'])!.value,
      requestId: this.editForm.get(['requestId'])!.value,
      timeOfRequest: this.editForm.get(['timeOfRequest'])!.value
        ? dayjs(this.editForm.get(['timeOfRequest'])!.value, DATE_TIME_FORMAT)
        : undefined,
      reportIsCompiled: this.editForm.get(['reportIsCompiled'])!.value,
      fileChecksum: this.editForm.get(['fileChecksum'])!.value,
      tampered: this.editForm.get(['tampered'])!.value,
      filename: this.editForm.get(['filename'])!.value,
      reportParameters: this.editForm.get(['reportParameters'])!.value,
      reportFileContentType: this.editForm.get(['reportFileContentType'])!.value,
      reportFile: this.editForm.get(['reportFile'])!.value,
      requestedBy: this.editForm.get(['requestedBy'])!.value,
      reportingMonth: this.editForm.get(['reportingMonth'])!.value,
    };
  }
}
