///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.5.1
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
import { finalize, map } from 'rxjs/operators';

import { IDepreciationPeriod, DepreciationPeriod } from '../depreciation-period.model';
import { DepreciationPeriodService } from '../service/depreciation-period.service';

@Component({
  selector: 'jhi-depreciation-period-update',
  templateUrl: './depreciation-period-update.component.html',
})
export class DepreciationPeriodUpdateComponent implements OnInit {
  isSaving = false;

  previousPeriodsCollection: IDepreciationPeriod[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    previousPeriod: [],
  });

  constructor(
    protected depreciationPeriodService: DepreciationPeriodService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depreciationPeriod }) => {
      this.updateForm(depreciationPeriod);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const depreciationPeriod = this.createFromForm();
    if (depreciationPeriod.id !== undefined) {
      this.subscribeToSaveResponse(this.depreciationPeriodService.update(depreciationPeriod));
    } else {
      this.subscribeToSaveResponse(this.depreciationPeriodService.create(depreciationPeriod));
    }
  }

  trackDepreciationPeriodById(index: number, item: IDepreciationPeriod): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepreciationPeriod>>): void {
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

  protected updateForm(depreciationPeriod: IDepreciationPeriod): void {
    this.editForm.patchValue({
      id: depreciationPeriod.id,
      startDate: depreciationPeriod.startDate,
      endDate: depreciationPeriod.endDate,
      previousPeriod: depreciationPeriod.previousPeriod,
    });

    this.previousPeriodsCollection = this.depreciationPeriodService.addDepreciationPeriodToCollectionIfMissing(
      this.previousPeriodsCollection,
      depreciationPeriod.previousPeriod
    );
  }

  protected loadRelationshipsOptions(): void {
    this.depreciationPeriodService
      .query({ 'nextPeriodId.specified': 'false' })
      .pipe(map((res: HttpResponse<IDepreciationPeriod[]>) => res.body ?? []))
      .pipe(
        map((depreciationPeriods: IDepreciationPeriod[]) =>
          this.depreciationPeriodService.addDepreciationPeriodToCollectionIfMissing(
            depreciationPeriods,
            this.editForm.get('previousPeriod')!.value
          )
        )
      )
      .subscribe((depreciationPeriods: IDepreciationPeriod[]) => (this.previousPeriodsCollection = depreciationPeriods));
  }

  protected createFromForm(): IDepreciationPeriod {
    return {
      ...new DepreciationPeriod(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      previousPeriod: this.editForm.get(['previousPeriod'])!.value,
    };
  }
}
