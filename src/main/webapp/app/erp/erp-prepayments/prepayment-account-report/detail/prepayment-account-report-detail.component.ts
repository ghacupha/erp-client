///
/// Erp System - Mark IX No 5 (Iddo Series) Client 1.6.4
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
import { ActivatedRoute, ParamMap } from '@angular/router';

import { IPrepaymentAccountReport } from '../prepayment-account-report.model';
import dayjs from 'dayjs';

@Component({
  selector: 'jhi-prepayment-account-report-detail',
  templateUrl: './prepayment-account-report-detail.component.html',
})
export class PrepaymentAccountReportDetailComponent implements OnInit {
  prepaymentAccountReport: IPrepaymentAccountReport | null = null;

  reportDate: string | null = '';

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentAccountReport }) => {
      this.prepaymentAccountReport = prepaymentAccountReport;
    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.reportDate = dayjs(params.get('reportDate')).format("DD/MM/YYYY");
    });
  }

  previousState(): void {
    window.history.back();
  }
}