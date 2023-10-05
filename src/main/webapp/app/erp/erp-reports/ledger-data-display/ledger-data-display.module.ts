///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule as DTModule } from 'angular-datatables';
import { LedgerDtViewComponent } from './ledger-dt-view.component';
import { RouterModule, Routes } from '@angular/router';
import { LEDGER_DT_ROUTE } from './ledger-dt.route';
import { SharedModule } from '../../../shared/shared.module';
import { LedgerTranslationListDeleteDialogComponent } from './ledger-translation-list-delete-dialog.component';

const routes: Routes = [LEDGER_DT_ROUTE];

/**
 * Module for ledger-dt-view that uses datatables library to view ledgers in excel
 * exportable format on the web view
 */
@NgModule({
  declarations: [LedgerDtViewComponent, LedgerTranslationListDeleteDialogComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule, DTModule],
  exports: [RouterModule, LedgerDtViewComponent],
  entryComponents: [LedgerDtViewComponent],
})
export class LedgerDataDisplayModule {}
