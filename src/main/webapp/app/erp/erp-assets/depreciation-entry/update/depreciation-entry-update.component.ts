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
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IDepreciationEntry, DepreciationEntry } from '../depreciation-entry.model';
import { DepreciationEntryService } from '../service/depreciation-entry.service';
import { IAssetCategory } from '../../asset-category/asset-category.model';
import { IAssetRegistration } from '../../asset-registration/asset-registration.model';
import { ServiceOutletService } from '../../../erp-granular/service-outlet/service/service-outlet.service';
import { AssetRegistrationService } from '../../asset-registration/service/asset-registration.service';
import { IDepreciationMethod } from '../../depreciation-method/depreciation-method.model';
import { DepreciationPeriodService } from '../../depreciation-period/service/depreciation-period.service';
import { IDepreciationPeriod } from '../../depreciation-period/depreciation-period.model';
import { AssetCategoryService } from '../../asset-category/service/asset-category.service';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { DepreciationMethodService } from '../../depreciation-method/service/depreciation-method.service';

@Component({
  selector: 'jhi-depreciation-entry-update',
  templateUrl: './depreciation-entry-update.component.html',
})
export class DepreciationEntryUpdateComponent implements OnInit {
  isSaving = false;

  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  assetCategoriesSharedCollection: IAssetCategory[] = [];
  depreciationMethodsSharedCollection: IDepreciationMethod[] = [];
  assetRegistrationsSharedCollection: IAssetRegistration[] = [];
  depreciationPeriodsSharedCollection: IDepreciationPeriod[] = [];

  editForm = this.fb.group({
    id: [],
    postedAt: [],
    depreciationAmount: [],
    assetNumber: [],
    serviceOutlet: [],
    assetCategory: [],
    depreciationMethod: [],
    assetRegistration: [],
    depreciationPeriod: [],
  });

  constructor(
    protected depreciationEntryService: DepreciationEntryService,
    protected serviceOutletService: ServiceOutletService,
    protected assetCategoryService: AssetCategoryService,
    protected depreciationMethodService: DepreciationMethodService,
    protected assetRegistrationService: AssetRegistrationService,
    protected depreciationPeriodService: DepreciationPeriodService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depreciationEntry }) => {
      if (depreciationEntry.id === undefined) {
        const today = dayjs().startOf('day');
        depreciationEntry.postedAt = today;
      }

      this.updateForm(depreciationEntry);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const depreciationEntry = this.createFromForm();
    if (depreciationEntry.id !== undefined) {
      this.subscribeToSaveResponse(this.depreciationEntryService.update(depreciationEntry));
    } else {
      this.subscribeToSaveResponse(this.depreciationEntryService.create(depreciationEntry));
    }
  }

  trackServiceOutletById(index: number, item: IServiceOutlet): number {
    return item.id!;
  }

  trackAssetCategoryById(index: number, item: IAssetCategory): number {
    return item.id!;
  }

  trackDepreciationMethodById(index: number, item: IDepreciationMethod): number {
    return item.id!;
  }

  trackAssetRegistrationById(index: number, item: IAssetRegistration): number {
    return item.id!;
  }

  trackDepreciationPeriodById(index: number, item: IDepreciationPeriod): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepreciationEntry>>): void {
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

  protected updateForm(depreciationEntry: IDepreciationEntry): void {
    this.editForm.patchValue({
      id: depreciationEntry.id,
      postedAt: depreciationEntry.postedAt ? depreciationEntry.postedAt.format(DATE_TIME_FORMAT) : null,
      depreciationAmount: depreciationEntry.depreciationAmount,
      assetNumber: depreciationEntry.assetNumber,
      serviceOutlet: depreciationEntry.serviceOutlet,
      assetCategory: depreciationEntry.assetCategory,
      depreciationMethod: depreciationEntry.depreciationMethod,
      assetRegistration: depreciationEntry.assetRegistration,
      depreciationPeriod: depreciationEntry.depreciationPeriod,
    });

    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing(
      this.serviceOutletsSharedCollection,
      depreciationEntry.serviceOutlet
    );
    this.assetCategoriesSharedCollection = this.assetCategoryService.addAssetCategoryToCollectionIfMissing(
      this.assetCategoriesSharedCollection,
      depreciationEntry.assetCategory
    );
    this.depreciationMethodsSharedCollection = this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing(
      this.depreciationMethodsSharedCollection,
      depreciationEntry.depreciationMethod
    );
    this.assetRegistrationsSharedCollection = this.assetRegistrationService.addAssetRegistrationToCollectionIfMissing(
      this.assetRegistrationsSharedCollection,
      depreciationEntry.assetRegistration
    );
    this.depreciationPeriodsSharedCollection = this.depreciationPeriodService.addDepreciationPeriodToCollectionIfMissing(
      this.depreciationPeriodsSharedCollection,
      depreciationEntry.depreciationPeriod
    );
  }

  protected loadRelationshipsOptions(): void {
    this.serviceOutletService
      .query()
      .pipe(map((res: HttpResponse<IServiceOutlet[]>) => res.body ?? []))
      .pipe(
        map((serviceOutlets: IServiceOutlet[]) =>
          this.serviceOutletService.addServiceOutletToCollectionIfMissing(serviceOutlets, this.editForm.get('serviceOutlet')!.value)
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.assetCategoryService
      .query()
      .pipe(map((res: HttpResponse<IAssetCategory[]>) => res.body ?? []))
      .pipe(
        map((assetCategories: IAssetCategory[]) =>
          this.assetCategoryService.addAssetCategoryToCollectionIfMissing(assetCategories, this.editForm.get('assetCategory')!.value)
        )
      )
      .subscribe((assetCategories: IAssetCategory[]) => (this.assetCategoriesSharedCollection = assetCategories));

    this.depreciationMethodService
      .query()
      .pipe(map((res: HttpResponse<IDepreciationMethod[]>) => res.body ?? []))
      .pipe(
        map((depreciationMethods: IDepreciationMethod[]) =>
          this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing(
            depreciationMethods,
            this.editForm.get('depreciationMethod')!.value
          )
        )
      )
      .subscribe((depreciationMethods: IDepreciationMethod[]) => (this.depreciationMethodsSharedCollection = depreciationMethods));

    this.assetRegistrationService
      .query()
      .pipe(map((res: HttpResponse<IAssetRegistration[]>) => res.body ?? []))
      .pipe(
        map((assetRegistrations: IAssetRegistration[]) =>
          this.assetRegistrationService.addAssetRegistrationToCollectionIfMissing(
            assetRegistrations,
            this.editForm.get('assetRegistration')!.value
          )
        )
      )
      .subscribe((assetRegistrations: IAssetRegistration[]) => (this.assetRegistrationsSharedCollection = assetRegistrations));

    this.depreciationPeriodService
      .query()
      .pipe(map((res: HttpResponse<IDepreciationPeriod[]>) => res.body ?? []))
      .pipe(
        map((depreciationPeriods: IDepreciationPeriod[]) =>
          this.depreciationPeriodService.addDepreciationPeriodToCollectionIfMissing(
            depreciationPeriods,
            this.editForm.get('depreciationPeriod')!.value
          )
        )
      )
      .subscribe((depreciationPeriods: IDepreciationPeriod[]) => (this.depreciationPeriodsSharedCollection = depreciationPeriods));
  }

  protected createFromForm(): IDepreciationEntry {
    return {
      ...new DepreciationEntry(),
      id: this.editForm.get(['id'])!.value,
      postedAt: this.editForm.get(['postedAt'])!.value ? dayjs(this.editForm.get(['postedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      depreciationAmount: this.editForm.get(['depreciationAmount'])!.value,
      assetNumber: this.editForm.get(['assetNumber'])!.value,
      serviceOutlet: this.editForm.get(['serviceOutlet'])!.value,
      assetCategory: this.editForm.get(['assetCategory'])!.value,
      depreciationMethod: this.editForm.get(['depreciationMethod'])!.value,
      assetRegistration: this.editForm.get(['assetRegistration'])!.value,
      depreciationPeriod: this.editForm.get(['depreciationPeriod'])!.value,
    };
  }
}
