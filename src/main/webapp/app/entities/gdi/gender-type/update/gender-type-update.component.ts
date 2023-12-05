///
/// Erp System - Mark VIII No 3 (Hilkiah Series) Client 1.6.2
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

import { IGenderType, GenderType } from '../gender-type.model';
import { GenderTypeService } from '../service/gender-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { genderTypes } from 'app/entities/enumerations/gender-types.model';

@Component({
  selector: 'jhi-gender-type-update',
  templateUrl: './gender-type-update.component.html',
})
export class GenderTypeUpdateComponent implements OnInit {
  isSaving = false;
  genderTypesValues = Object.keys(genderTypes);

  editForm = this.fb.group({
    id: [],
    genderCode: [null, [Validators.required]],
    genderType: [null, [Validators.required]],
    genderDescription: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected genderTypeService: GenderTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genderType }) => {
      this.updateForm(genderType);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('erpSystemApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const genderType = this.createFromForm();
    if (genderType.id !== undefined) {
      this.subscribeToSaveResponse(this.genderTypeService.update(genderType));
    } else {
      this.subscribeToSaveResponse(this.genderTypeService.create(genderType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenderType>>): void {
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

  protected updateForm(genderType: IGenderType): void {
    this.editForm.patchValue({
      id: genderType.id,
      genderCode: genderType.genderCode,
      genderType: genderType.genderType,
      genderDescription: genderType.genderDescription,
    });
  }

  protected createFromForm(): IGenderType {
    return {
      ...new GenderType(),
      id: this.editForm.get(['id'])!.value,
      genderCode: this.editForm.get(['genderCode'])!.value,
      genderType: this.editForm.get(['genderType'])!.value,
      genderDescription: this.editForm.get(['genderDescription'])!.value,
    };
  }
}
