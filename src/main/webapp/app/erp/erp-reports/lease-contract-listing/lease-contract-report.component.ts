///
/// Erp System - Mark III No 17 (Caleb Series) Client 1.3.9
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
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../core/util/alert.service';
import * as dayjs from 'dayjs';
import { ILeaseContract } from './lease-contract-report.model';
import { LeaseContractReportService } from './lease-contract-report.service';

@Component({
  selector: 'jhi-lease-contract-listing',
  templateUrl: './lease-contract-report.component.html',
  styleUrls: ['./lease-contract-report.component.scss'],
})
export class LeaseContractReportComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: any = new Subject<any>();

  dataArray: ILeaseContract[] = [];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected jhiAlertService: AlertService,
    private log: NGXLogger,
    private listService: LeaseContractReportService,
    protected modalService: NgbModal
  ) {
    this.firstPassDataUpdate();
  }

  ngOnInit(): void {
    this.dtOptions = this.getDataTableOptions();
    this.secondPassDataUpdate();
  }

  onError(errorMessage: string): void {
    // todo this.jhiAlertService.addAlert(errorMessage, null);
    this.log.error(`Error while extracting data from API ${errorMessage}`);

    this.previousView();
  }

  private getDataTableOptions(): DataTables.Settings {
    return (this.dtOptions = {
      searching: true,
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
    });
  }

  private secondPassDataUpdate(): void {
    this.listService.query({ billerId: 1494, from: dayjs(), to: dayjs() }).subscribe(
      res => {
        this.dataArray = res.body ?? [];
        // TODO test whether data-tables are created once and only once
        this.dtTrigger.next();
      },
      err => this.onError(err.toString()),
      () => this.log.info(`Extracted ${this.dataArray.length} view items from API`)
    );
  }

  private firstPassDataUpdate(): void {
    this.listService.query({ billerId: 1494, from: dayjs(), to: dayjs() }).subscribe(
      res => {
        this.dataArray = res.body ?? [];
        // TODO test whether data-tables are created once and only once
        // this.dtTrigger.next()
      },
      err => this.onError(err.toString()),
      () => this.log.info(`Extracted ${this.dataArray.length} view items from API`)
    );
  }



  private previousView(): void {
    const navigation = this.router.navigate(['ledger-translation-list']);
    navigation.then(() => {
      this.log.debug(`Well! This was not supposed to happen. Review request parameters and reiterate`);
    });
  }
}
