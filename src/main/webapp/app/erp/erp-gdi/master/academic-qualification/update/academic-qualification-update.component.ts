///
/// Erp System - Mark IX No 2 (Iddo Series) Client 1.6.3
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

import { IAcademicQualification, AcademicQualification } from '../academic-qualification.model';
import { AcademicQualificationService } from '../service/academic-qualification.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-academic-qualification-update',
  templateUrl: './academic-qualification-update.component.html',
})
export class AcademicQualificationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    academicQualificationsCode: [null, [Validators.required]],
    academicQualificationType: [null, [Validators.required]],
    academicQualificationTypeDetail: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected academicQualificationService: AcademicQualificationService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ academicQualification }) => {
      this.updateForm(academicQualification);
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
    const academicQualification = this.createFromForm();
    if (academicQualification.id !== undefined) {
      this.subscribeToSaveResponse(this.academicQualificationService.update(academicQualification));
    } else {
      this.subscribeToSaveResponse(this.academicQualificationService.create(academicQualification));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcademicQualification>>): void {
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

  protected updateForm(academicQualification: IAcademicQualification): void {
    this.editForm.patchValue({
      id: academicQualification.id,
      academicQualificationsCode: academicQualification.academicQualificationsCode,
      academicQualificationType: academicQualification.academicQualificationType,
      academicQualificationTypeDetail: academicQualification.academicQualificationTypeDetail,
    });
  }

  protected createFromForm(): IAcademicQualification {
    return {
      ...new AcademicQualification(),
      id: this.editForm.get(['id'])!.value,
      academicQualificationsCode: this.editForm.get(['academicQualificationsCode'])!.value,
      academicQualificationType: this.editForm.get(['academicQualificationType'])!.value,
      academicQualificationTypeDetail: this.editForm.get(['academicQualificationTypeDetail'])!.value,
    };
  }
}
