import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBusinessDocument, NewBusinessDocument } from '../business-document.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBusinessDocument for edit and NewBusinessDocumentFormGroupInput for create.
 */
type BusinessDocumentFormGroupInput = IBusinessDocument | PartialWithRequiredKeyOf<NewBusinessDocument>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBusinessDocument | NewBusinessDocument> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type BusinessDocumentFormRawValue = FormValueOf<IBusinessDocument>;

type NewBusinessDocumentFormRawValue = FormValueOf<NewBusinessDocument>;

type BusinessDocumentFormDefaults = Pick<
  NewBusinessDocument,
  'id' | 'lastModified' | 'fileTampered' | 'applicationMappings' | 'placeholders'
>;

type BusinessDocumentFormGroupContent = {
  id: FormControl<BusinessDocumentFormRawValue['id'] | NewBusinessDocument['id']>;
  documentTitle: FormControl<BusinessDocumentFormRawValue['documentTitle']>;
  description: FormControl<BusinessDocumentFormRawValue['description']>;
  documentSerial: FormControl<BusinessDocumentFormRawValue['documentSerial']>;
  lastModified: FormControl<BusinessDocumentFormRawValue['lastModified']>;
  attachmentFilePath: FormControl<BusinessDocumentFormRawValue['attachmentFilePath']>;
  documentFile: FormControl<BusinessDocumentFormRawValue['documentFile']>;
  documentFileContentType: FormControl<BusinessDocumentFormRawValue['documentFileContentType']>;
  fileTampered: FormControl<BusinessDocumentFormRawValue['fileTampered']>;
  documentFileChecksum: FormControl<BusinessDocumentFormRawValue['documentFileChecksum']>;
  createdBy: FormControl<BusinessDocumentFormRawValue['createdBy']>;
  lastModifiedBy: FormControl<BusinessDocumentFormRawValue['lastModifiedBy']>;
  originatingDepartment: FormControl<BusinessDocumentFormRawValue['originatingDepartment']>;
  applicationMappings: FormControl<BusinessDocumentFormRawValue['applicationMappings']>;
  placeholders: FormControl<BusinessDocumentFormRawValue['placeholders']>;
  fileChecksumAlgorithm: FormControl<BusinessDocumentFormRawValue['fileChecksumAlgorithm']>;
  securityClearance: FormControl<BusinessDocumentFormRawValue['securityClearance']>;
};

export type BusinessDocumentFormGroup = FormGroup<BusinessDocumentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BusinessDocumentFormService {
  createBusinessDocumentFormGroup(businessDocument: BusinessDocumentFormGroupInput = { id: null }): BusinessDocumentFormGroup {
    const businessDocumentRawValue = this.convertBusinessDocumentToBusinessDocumentRawValue({
      ...this.getFormDefaults(),
      ...businessDocument,
    });
    return new FormGroup<BusinessDocumentFormGroupContent>({
      id: new FormControl(
        { value: businessDocumentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      documentTitle: new FormControl(businessDocumentRawValue.documentTitle, {
        validators: [Validators.required],
      }),
      description: new FormControl(businessDocumentRawValue.description),
      documentSerial: new FormControl(businessDocumentRawValue.documentSerial, {
        validators: [Validators.required],
      }),
      lastModified: new FormControl(businessDocumentRawValue.lastModified),
      attachmentFilePath: new FormControl(businessDocumentRawValue.attachmentFilePath, {
        validators: [Validators.required],
      }),
      documentFile: new FormControl(businessDocumentRawValue.documentFile, {
        validators: [Validators.required],
      }),
      documentFileContentType: new FormControl(businessDocumentRawValue.documentFileContentType),
      fileTampered: new FormControl(businessDocumentRawValue.fileTampered),
      documentFileChecksum: new FormControl(businessDocumentRawValue.documentFileChecksum, {
        validators: [Validators.required],
      }),
      createdBy: new FormControl(businessDocumentRawValue.createdBy, {
        validators: [Validators.required],
      }),
      lastModifiedBy: new FormControl(businessDocumentRawValue.lastModifiedBy),
      originatingDepartment: new FormControl(businessDocumentRawValue.originatingDepartment, {
        validators: [Validators.required],
      }),
      applicationMappings: new FormControl(businessDocumentRawValue.applicationMappings ?? []),
      placeholders: new FormControl(businessDocumentRawValue.placeholders ?? []),
      fileChecksumAlgorithm: new FormControl(businessDocumentRawValue.fileChecksumAlgorithm, {
        validators: [Validators.required],
      }),
      securityClearance: new FormControl(businessDocumentRawValue.securityClearance, {
        validators: [Validators.required],
      }),
    });
  }

  getBusinessDocument(form: BusinessDocumentFormGroup): IBusinessDocument | NewBusinessDocument {
    return this.convertBusinessDocumentRawValueToBusinessDocument(
      form.getRawValue() as BusinessDocumentFormRawValue | NewBusinessDocumentFormRawValue
    );
  }

  resetForm(form: BusinessDocumentFormGroup, businessDocument: BusinessDocumentFormGroupInput): void {
    const businessDocumentRawValue = this.convertBusinessDocumentToBusinessDocumentRawValue({
      ...this.getFormDefaults(),
      ...businessDocument,
    });
    form.reset(
      {
        ...businessDocumentRawValue,
        id: { value: businessDocumentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BusinessDocumentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
      fileTampered: false,
      applicationMappings: [],
      placeholders: [],
    };
  }

  private convertBusinessDocumentRawValueToBusinessDocument(
    rawBusinessDocument: BusinessDocumentFormRawValue | NewBusinessDocumentFormRawValue
  ): IBusinessDocument | NewBusinessDocument {
    return {
      ...rawBusinessDocument,
      lastModified: dayjs(rawBusinessDocument.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertBusinessDocumentToBusinessDocumentRawValue(
    businessDocument: IBusinessDocument | (Partial<NewBusinessDocument> & BusinessDocumentFormDefaults)
  ): BusinessDocumentFormRawValue | PartialWithRequiredKeyOf<NewBusinessDocumentFormRawValue> {
    return {
      ...businessDocument,
      lastModified: businessDocument.lastModified ? businessDocument.lastModified.format(DATE_TIME_FORMAT) : undefined,
      applicationMappings: businessDocument.applicationMappings ?? [],
      placeholders: businessDocument.placeholders ?? [],
    };
  }
}
