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

import { SecurityClearanceFormService, SecurityClearanceFormGroup } from './security-clearance-form.service';
import { ISecurityClearance } from '../security-clearance.model';
import { SecurityClearanceService } from '../service/security-clearance.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-security-clearance-update',
  templateUrl: './security-clearance-update.component.html',
})
export class SecurityClearanceUpdateComponent implements OnInit {
  isSaving = false;
  securityClearance: ISecurityClearance | null = null;

  securityClearancesSharedCollection: ISecurityClearance[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: SecurityClearanceFormGroup = this.securityClearanceFormService.createSecurityClearanceFormGroup();

  constructor(
    protected securityClearanceService: SecurityClearanceService,
    protected securityClearanceFormService: SecurityClearanceFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSecurityClearance = (o1: ISecurityClearance | null, o2: ISecurityClearance | null): boolean =>
    this.securityClearanceService.compareSecurityClearance(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ securityClearance }) => {
      this.securityClearance = securityClearance;
      if (securityClearance) {
        this.updateForm(securityClearance);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const securityClearance = this.securityClearanceFormService.getSecurityClearance(this.editForm);
    if (securityClearance.id !== null) {
      this.subscribeToSaveResponse(this.securityClearanceService.update(securityClearance));
    } else {
      this.subscribeToSaveResponse(this.securityClearanceService.create(securityClearance));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISecurityClearance>>): void {
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

  protected updateForm(securityClearance: ISecurityClearance): void {
    this.securityClearance = securityClearance;
    this.securityClearanceFormService.resetForm(this.editForm, securityClearance);

    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
      this.securityClearancesSharedCollection,
      ...(securityClearance.grantedClearances ?? [])
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(securityClearance.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.securityClearanceService
      .query()
      .pipe(map((res: HttpResponse<ISecurityClearance[]>) => res.body ?? []))
      .pipe(
        map((securityClearances: ISecurityClearance[]) =>
          this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
            securityClearances,
            ...(this.securityClearance?.grantedClearances ?? [])
          )
        )
      )
      .subscribe((securityClearances: ISecurityClearance[]) => (this.securityClearancesSharedCollection = securityClearances));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.securityClearance?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
