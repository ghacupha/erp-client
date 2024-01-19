///
/// Erp System - Mark X No 2 (Jehoiada Series) Client 1.7.2
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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICrbDataSubmittingInstitutions, CrbDataSubmittingInstitutions } from '../crb-data-submitting-institutions.model';
import { CrbDataSubmittingInstitutionsService } from '../service/crb-data-submitting-institutions.service';

@Component({
  selector: 'jhi-crb-data-submitting-institutions-update',
  templateUrl: './crb-data-submitting-institutions-update.component.html',
})
export class CrbDataSubmittingInstitutionsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    institutionCode: [null, [Validators.required]],
    institutionName: [null, [Validators.required]],
    institutionCategory: [null, [Validators.required]],
  });

  constructor(
    protected crbDataSubmittingInstitutionsService: CrbDataSubmittingInstitutionsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbDataSubmittingInstitutions }) => {
      this.updateForm(crbDataSubmittingInstitutions);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbDataSubmittingInstitutions = this.createFromForm();
    if (crbDataSubmittingInstitutions.id !== undefined) {
      this.subscribeToSaveResponse(this.crbDataSubmittingInstitutionsService.update(crbDataSubmittingInstitutions));
    } else {
      this.subscribeToSaveResponse(this.crbDataSubmittingInstitutionsService.create(crbDataSubmittingInstitutions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbDataSubmittingInstitutions>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions): void {
    this.editForm.patchValue({
      id: crbDataSubmittingInstitutions.id,
      institutionCode: crbDataSubmittingInstitutions.institutionCode,
      institutionName: crbDataSubmittingInstitutions.institutionName,
      institutionCategory: crbDataSubmittingInstitutions.institutionCategory,
    });
  }

  protected createFromForm(): ICrbDataSubmittingInstitutions {
    return {
      ...new CrbDataSubmittingInstitutions(),
      id: this.editForm.get(['id'])!.value,
      institutionCode: this.editForm.get(['institutionCode'])!.value,
      institutionName: this.editForm.get(['institutionName'])!.value,
      institutionCategory: this.editForm.get(['institutionCategory'])!.value,
    };
  }
}
