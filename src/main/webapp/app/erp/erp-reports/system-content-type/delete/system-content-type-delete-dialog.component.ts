///
/// Erp System - Mark IX No 2 (Hilkiah Series) Client 1.6.3
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

import { ISystemContentType } from '../system-content-type.model';
import { SystemContentTypeService } from '../service/system-content-type.service';

@Component({
  templateUrl: './system-content-type-delete-dialog.component.html',
})
export class SystemContentTypeDeleteDialogComponent {
  systemContentType?: ISystemContentType;

  constructor(protected systemContentTypeService: SystemContentTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.systemContentTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
