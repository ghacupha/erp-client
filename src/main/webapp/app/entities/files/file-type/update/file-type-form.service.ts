///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFileType, NewFileType } from '../file-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFileType for edit and NewFileTypeFormGroupInput for create.
 */
type FileTypeFormGroupInput = IFileType | PartialWithRequiredKeyOf<NewFileType>;

type FileTypeFormDefaults = Pick<NewFileType, 'id' | 'placeholders'>;

type FileTypeFormGroupContent = {
  id: FormControl<IFileType['id'] | NewFileType['id']>;
  fileTypeName: FormControl<IFileType['fileTypeName']>;
  fileMediumType: FormControl<IFileType['fileMediumType']>;
  description: FormControl<IFileType['description']>;
  fileTemplate: FormControl<IFileType['fileTemplate']>;
  fileTemplateContentType: FormControl<IFileType['fileTemplateContentType']>;
  fileType: FormControl<IFileType['fileType']>;
  placeholders: FormControl<IFileType['placeholders']>;
};

export type FileTypeFormGroup = FormGroup<FileTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FileTypeFormService {
  createFileTypeFormGroup(fileType: FileTypeFormGroupInput = { id: null }): FileTypeFormGroup {
    const fileTypeRawValue = {
      ...this.getFormDefaults(),
      ...fileType,
    };
    return new FormGroup<FileTypeFormGroupContent>({
      id: new FormControl(
        { value: fileTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fileTypeName: new FormControl(fileTypeRawValue.fileTypeName, {
        validators: [Validators.required],
      }),
      fileMediumType: new FormControl(fileTypeRawValue.fileMediumType, {
        validators: [Validators.required],
      }),
      description: new FormControl(fileTypeRawValue.description),
      fileTemplate: new FormControl(fileTypeRawValue.fileTemplate),
      fileTemplateContentType: new FormControl(fileTypeRawValue.fileTemplateContentType),
      fileType: new FormControl(fileTypeRawValue.fileType, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(fileTypeRawValue.placeholders ?? []),
    });
  }

  getFileType(form: FileTypeFormGroup): IFileType | NewFileType {
    return form.getRawValue() as IFileType | NewFileType;
  }

  resetForm(form: FileTypeFormGroup, fileType: FileTypeFormGroupInput): void {
    const fileTypeRawValue = { ...this.getFormDefaults(), ...fileType };
    form.reset(
      {
        ...fileTypeRawValue,
        id: { value: fileTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FileTypeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
