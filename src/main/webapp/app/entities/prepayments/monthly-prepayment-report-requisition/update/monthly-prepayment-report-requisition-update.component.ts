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

import { IMonthlyPrepaymentReportRequisition, MonthlyPrepaymentReportRequisition } from '../monthly-prepayment-report-requisition.model';
import { MonthlyPrepaymentReportRequisitionService } from '../service/monthly-prepayment-report-requisition.service';
import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';
import { FiscalYearService } from 'app/entities/system/fiscal-year/service/fiscal-year.service';

@Component({
  selector: 'jhi-monthly-prepayment-report-requisition-update',
  templateUrl: './monthly-prepayment-report-requisition-update.component.html',
})
export class MonthlyPrepaymentReportRequisitionUpdateComponent implements OnInit {
  isSaving = false;

  fiscalYearsSharedCollection: IFiscalYear[] = [];

  editForm = this.fb.group({
    id: [],
    fiscalYear: [null, Validators.required],
  });

  constructor(
    protected monthlyPrepaymentReportRequisitionService: MonthlyPrepaymentReportRequisitionService,
    protected fiscalYearService: FiscalYearService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ monthlyPrepaymentReportRequisition }) => {
      this.updateForm(monthlyPrepaymentReportRequisition);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const monthlyPrepaymentReportRequisition = this.createFromForm();
    if (monthlyPrepaymentReportRequisition.id !== undefined) {
      this.subscribeToSaveResponse(this.monthlyPrepaymentReportRequisitionService.update(monthlyPrepaymentReportRequisition));
    } else {
      this.subscribeToSaveResponse(this.monthlyPrepaymentReportRequisitionService.create(monthlyPrepaymentReportRequisition));
    }
  }

  trackFiscalYearById(index: number, item: IFiscalYear): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonthlyPrepaymentReportRequisition>>): void {
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

  protected updateForm(monthlyPrepaymentReportRequisition: IMonthlyPrepaymentReportRequisition): void {
    this.editForm.patchValue({
      id: monthlyPrepaymentReportRequisition.id,
      fiscalYear: monthlyPrepaymentReportRequisition.fiscalYear,
    });

    this.fiscalYearsSharedCollection = this.fiscalYearService.addFiscalYearToCollectionIfMissing(
      this.fiscalYearsSharedCollection,
      monthlyPrepaymentReportRequisition.fiscalYear
    );
  }

  protected loadRelationshipsOptions(): void {
    this.fiscalYearService
      .query()
      .pipe(map((res: HttpResponse<IFiscalYear[]>) => res.body ?? []))
      .pipe(
        map((fiscalYears: IFiscalYear[]) =>
          this.fiscalYearService.addFiscalYearToCollectionIfMissing(fiscalYears, this.editForm.get('fiscalYear')!.value)
        )
      )
      .subscribe((fiscalYears: IFiscalYear[]) => (this.fiscalYearsSharedCollection = fiscalYears));
  }

  protected createFromForm(): IMonthlyPrepaymentReportRequisition {
    return {
      ...new MonthlyPrepaymentReportRequisition(),
      id: this.editForm.get(['id'])!.value,
      fiscalYear: this.editForm.get(['fiscalYear'])!.value,
    };
  }
}
