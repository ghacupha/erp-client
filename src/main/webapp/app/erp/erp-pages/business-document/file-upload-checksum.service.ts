import { sha512 } from 'hash-wasm';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

/**
 * This service calculates the checksums on a live form-group and updates the field according to the
 * file uploaded
 */
@Injectable({ providedIn: 'root' })
export class FileUploadChecksumService {

  updateFileUploadChecksum(editForm: FormGroup, fileUploadField: string, fileUploadCheckSumField: string, checksumAlgorithm: string): void {
    editForm.get([`${fileUploadField}`])?.valueChanges.subscribe((fileAttachment) => {
      sha512(this.fileDataArray(fileAttachment)).then(sha512Token => {
        editForm.get([`${fileUploadCheckSumField}`])?.setValue(sha512Token)
      });
    });
  }

  fileDataArray(b64String: string): Uint8Array {
    const byteCharacters = atob(b64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }
}
