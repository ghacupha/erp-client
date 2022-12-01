///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
