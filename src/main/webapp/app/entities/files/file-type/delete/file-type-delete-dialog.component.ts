///
/// Erp System - Mark VII No 1 (Gideon Series) Client 1.5.5
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

import { IFileType } from '../file-type.model';
import { FileTypeService } from '../service/file-type.service';

@Component({
  templateUrl: './file-type-delete-dialog.component.html',
})
export class FileTypeDeleteDialogComponent {
  fileType?: IFileType;

  constructor(protected fileTypeService: FileTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fileTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
