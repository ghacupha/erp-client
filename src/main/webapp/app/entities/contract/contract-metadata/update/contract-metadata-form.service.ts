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

import { IContractMetadata, NewContractMetadata } from '../contract-metadata.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContractMetadata for edit and NewContractMetadataFormGroupInput for create.
 */
type ContractMetadataFormGroupInput = IContractMetadata | PartialWithRequiredKeyOf<NewContractMetadata>;

type ContractMetadataFormDefaults = Pick<
  NewContractMetadata,
  'id' | 'relatedContracts' | 'signatories' | 'placeholders' | 'contractDocumentFiles' | 'contractMappings'
>;

type ContractMetadataFormGroupContent = {
  id: FormControl<IContractMetadata['id'] | NewContractMetadata['id']>;
  description: FormControl<IContractMetadata['description']>;
  typeOfContract: FormControl<IContractMetadata['typeOfContract']>;
  contractStatus: FormControl<IContractMetadata['contractStatus']>;
  startDate: FormControl<IContractMetadata['startDate']>;
  terminationDate: FormControl<IContractMetadata['terminationDate']>;
  commentsAndAttachment: FormControl<IContractMetadata['commentsAndAttachment']>;
  contractTitle: FormControl<IContractMetadata['contractTitle']>;
  contractIdentifier: FormControl<IContractMetadata['contractIdentifier']>;
  contractIdentifierShort: FormControl<IContractMetadata['contractIdentifierShort']>;
  relatedContracts: FormControl<IContractMetadata['relatedContracts']>;
  department: FormControl<IContractMetadata['department']>;
  contractPartner: FormControl<IContractMetadata['contractPartner']>;
  responsiblePerson: FormControl<IContractMetadata['responsiblePerson']>;
  signatories: FormControl<IContractMetadata['signatories']>;
  securityClearance: FormControl<IContractMetadata['securityClearance']>;
  placeholders: FormControl<IContractMetadata['placeholders']>;
  contractDocumentFiles: FormControl<IContractMetadata['contractDocumentFiles']>;
  contractMappings: FormControl<IContractMetadata['contractMappings']>;
};

export type ContractMetadataFormGroup = FormGroup<ContractMetadataFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContractMetadataFormService {
  createContractMetadataFormGroup(contractMetadata: ContractMetadataFormGroupInput = { id: null }): ContractMetadataFormGroup {
    const contractMetadataRawValue = {
      ...this.getFormDefaults(),
      ...contractMetadata,
    };
    return new FormGroup<ContractMetadataFormGroupContent>({
      id: new FormControl(
        { value: contractMetadataRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(contractMetadataRawValue.description),
      typeOfContract: new FormControl(contractMetadataRawValue.typeOfContract, {
        validators: [Validators.required],
      }),
      contractStatus: new FormControl(contractMetadataRawValue.contractStatus, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(contractMetadataRawValue.startDate, {
        validators: [Validators.required],
      }),
      terminationDate: new FormControl(contractMetadataRawValue.terminationDate, {
        validators: [Validators.required],
      }),
      commentsAndAttachment: new FormControl(contractMetadataRawValue.commentsAndAttachment),
      contractTitle: new FormControl(contractMetadataRawValue.contractTitle, {
        validators: [Validators.required],
      }),
      contractIdentifier: new FormControl(contractMetadataRawValue.contractIdentifier, {
        validators: [Validators.required],
      }),
      contractIdentifierShort: new FormControl(contractMetadataRawValue.contractIdentifierShort, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      relatedContracts: new FormControl(contractMetadataRawValue.relatedContracts ?? []),
      department: new FormControl(contractMetadataRawValue.department),
      contractPartner: new FormControl(contractMetadataRawValue.contractPartner),
      responsiblePerson: new FormControl(contractMetadataRawValue.responsiblePerson),
      signatories: new FormControl(contractMetadataRawValue.signatories ?? []),
      securityClearance: new FormControl(contractMetadataRawValue.securityClearance),
      placeholders: new FormControl(contractMetadataRawValue.placeholders ?? []),
      contractDocumentFiles: new FormControl(contractMetadataRawValue.contractDocumentFiles ?? []),
      contractMappings: new FormControl(contractMetadataRawValue.contractMappings ?? []),
    });
  }

  getContractMetadata(form: ContractMetadataFormGroup): IContractMetadata | NewContractMetadata {
    return form.getRawValue() as IContractMetadata | NewContractMetadata;
  }

  resetForm(form: ContractMetadataFormGroup, contractMetadata: ContractMetadataFormGroupInput): void {
    const contractMetadataRawValue = { ...this.getFormDefaults(), ...contractMetadata };
    form.reset(
      {
        ...contractMetadataRawValue,
        id: { value: contractMetadataRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContractMetadataFormDefaults {
    return {
      id: null,
      relatedContracts: [],
      signatories: [],
      placeholders: [],
      contractDocumentFiles: [],
      contractMappings: [],
    };
  }
}
