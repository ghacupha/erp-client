///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.5.1
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
import { ILedgerTranslationList } from './ledger-translation-list.model';
import { LedgerDtViewService } from './ledger-dt-view.service';
import { AlertService } from '../../../core/util/alert.service';
import { LedgerTranslationListDeleteDialogComponent } from './ledger-translation-list-delete-dialog.component';

@Component({
  selector: 'jhi-ledger-dt-view',
  templateUrl: './ledger-dt-view.component.html',
  styleUrls: ['./ledger-dt-view.component.scss'],
})
export class LedgerDtViewComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: any = new Subject<any>();

  ledgerDataArray!: ILedgerTranslationList[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected jhiAlertService: AlertService,
    private log: NGXLogger,
    private listService: LedgerDtViewService,
    protected modalService: NgbModal
  ) {
    this.firstPassDataUpdate();
  }

  ngOnInit(): void {
    this.dtOptions = this.getDataTableOptions();
    this.secondPassDataUpdate();
  }

  delete(viewItem: ILedgerTranslationList): void {
    const modalRef = this.modalService.open(LedgerTranslationListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ledgerTranslationList = viewItem;
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
    this.listService.query().subscribe(
      res => {
        this.ledgerDataArray = res.body ?? [];
        // TODO test whether data-tables are created once and only once
        this.dtTrigger.next();
      },
      err => this.onError(err.toString()),
      () => this.log.info(`Extracted ${this.ledgerDataArray.length} view items from API`)
    );
  }

  private firstPassDataUpdate(): void {
    this.listService.query().subscribe(
      res => {
        this.ledgerDataArray = res.body ?? [];
        // TODO test whether data-tables are created once and only once
        // this.dtTrigger.next()
      },
      err => this.onError(err.toString()),
      () => this.log.info(`Extracted ${this.ledgerDataArray.length} view items from API`)
    );
  }



  private previousView(): void {
    const navigation = this.router.navigate(['ledger-translation-list']);
    navigation.then(() => {
      this.log.debug(`Well! This was not supposed to happen. Review request parameters and reiterate`);
    });
  }
}
