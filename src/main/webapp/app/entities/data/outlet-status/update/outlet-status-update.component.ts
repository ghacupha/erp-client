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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { OutletStatusFormService, OutletStatusFormGroup } from './outlet-status-form.service';
import { IOutletStatus } from '../outlet-status.model';
import { OutletStatusService } from '../service/outlet-status.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { BranchStatusType } from 'app/entities/enumerations/branch-status-type.model';

@Component({
  selector: 'jhi-outlet-status-update',
  templateUrl: './outlet-status-update.component.html',
})
export class OutletStatusUpdateComponent implements OnInit {
  isSaving = false;
  outletStatus: IOutletStatus | null = null;
  branchStatusTypeValues = Object.keys(BranchStatusType);

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: OutletStatusFormGroup = this.outletStatusFormService.createOutletStatusFormGroup();

  constructor(
    protected outletStatusService: OutletStatusService,
    protected outletStatusFormService: OutletStatusFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ outletStatus }) => {
      this.outletStatus = outletStatus;
      if (outletStatus) {
        this.updateForm(outletStatus);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const outletStatus = this.outletStatusFormService.getOutletStatus(this.editForm);
    if (outletStatus.id !== null) {
      this.subscribeToSaveResponse(this.outletStatusService.update(outletStatus));
    } else {
      this.subscribeToSaveResponse(this.outletStatusService.create(outletStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOutletStatus>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
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

  protected updateForm(outletStatus: IOutletStatus): void {
    this.outletStatus = outletStatus;
    this.outletStatusFormService.resetForm(this.editForm, outletStatus);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(outletStatus.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.outletStatus?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
