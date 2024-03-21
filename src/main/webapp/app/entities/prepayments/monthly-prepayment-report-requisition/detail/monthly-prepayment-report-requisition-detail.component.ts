import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonthlyPrepaymentReportRequisition } from '../monthly-prepayment-report-requisition.model';

@Component({
  selector: 'jhi-monthly-prepayment-report-requisition-detail',
  templateUrl: './monthly-prepayment-report-requisition-detail.component.html',
})
export class MonthlyPrepaymentReportRequisitionDetailComponent implements OnInit {
  monthlyPrepaymentReportRequisition: IMonthlyPrepaymentReportRequisition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ monthlyPrepaymentReportRequisition }) => {
      this.monthlyPrepaymentReportRequisition = monthlyPrepaymentReportRequisition;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
