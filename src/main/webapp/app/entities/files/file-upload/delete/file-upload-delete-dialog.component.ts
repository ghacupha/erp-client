import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFileUpload } from '../file-upload.model';
import { FileUploadService } from '../service/file-upload.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './file-upload-delete-dialog.component.html',
})
export class FileUploadDeleteDialogComponent {
  fileUpload?: IFileUpload;

  constructor(protected fileUploadService: FileUploadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fileUploadService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
