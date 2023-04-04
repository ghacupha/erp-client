///
/// Erp System - Mark III No 12 (Caleb Series) Client 1.2.6
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

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILedgerTranslationList } from './ledger-translation-list.model';
import { LedgerTranslationListService } from './ledger-translation-list.service';
import { EventManager } from '../../../core/util/event-manager.service';

@Component({
  templateUrl: './ledger-translation-list-delete-dialog.component.html',
})
export class LedgerTranslationListDeleteDialogComponent {
  ledgerTranslationList?: ILedgerTranslationList;

  constructor(
    protected ledgerTranslationListService: LedgerTranslationListService,
    public activeModal: NgbActiveModal,
    protected eventManager: EventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ledgerTranslationListService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ledgerTranslationListListModification');
      this.activeModal.close();
    });
  }
}
