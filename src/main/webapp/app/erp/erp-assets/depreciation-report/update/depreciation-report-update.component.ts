///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { DepreciationReport, IDepreciationReport } from '../depreciation-report.model';
import { DepreciationReportService } from '../service/depreciation-report.service';
import { IAssetCategory } from '../../asset-category/asset-category.model';
import { DepreciationPeriodService } from '../../depreciation-period/service/depreciation-period.service';
import { IDepreciationPeriod } from '../../depreciation-period/depreciation-period.model';
import { AssetCategoryService } from '../../asset-category/service/asset-category.service';
import { IApplicationUser } from '../../../erp-pages/application-user/application-user.model';
import { ApplicationUserService } from '../../../erp-pages/application-user/service/application-user.service';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { ServiceOutletService } from '../../../erp-granular/service-outlet/service/service-outlet.service';

@Component({
  selector: 'jhi-depreciation-report-update',
  templateUrl: './depreciation-report-update.component.html',
})
export class DepreciationReportUpdateComponent implements OnInit {
  isSaving = false;

  applicationUsersSharedCollection: IApplicationUser[] = [];
  depreciationPeriodsSharedCollection: IDepreciationPeriod[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  assetCategoriesSharedCollection: IAssetCategory[] = [];

  editForm = this.fb.group({
    id: [],
    reportName: [null, [Validators.required]],
    timeOfReportRequest: [null, [Validators.required]],
    requestedBy: [],
    depreciationPeriod: [null, Validators.required],
    serviceOutlet: [],
    assetCategory: [],
  });

  constructor(
    protected depreciationReportService: DepreciationReportService,
    protected applicationUserService: ApplicationUserService,
    protected depreciationPeriodService: DepreciationPeriodService,
    protected serviceOutletService: ServiceOutletService,
    protected assetCategoryService: AssetCategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depreciationReport }) => {
      if (depreciationReport.id === undefined) {
        const today = dayjs();
        depreciationReport.timeOfReportRequest = today;
      }

      this.updateForm(depreciationReport);

      this.loadRelationshipsOptions();
    });
  }

  updateDepreciationPeriod(update: IDepreciationPeriod): void {
    this.editForm.patchValue({
      depreciationPeriod: update
    })
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const depreciationReport = this.createFromForm();
    if (depreciationReport.id !== undefined) {
      this.subscribeToSaveResponse(this.depreciationReportService.update(depreciationReport));
    } else {
      this.subscribeToSaveResponse(this.depreciationReportService.create(depreciationReport));
    }
  }

  trackApplicationUserById(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  trackDepreciationPeriodById(index: number, item: IDepreciationPeriod): number {
    return item.id!;
  }

  trackServiceOutletById(index: number, item: IServiceOutlet): number {
    return item.id!;
  }

  trackAssetCategoryById(index: number, item: IAssetCategory): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepreciationReport>>): void {
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

  protected updateForm(depreciationReport: IDepreciationReport): void {
    this.editForm.patchValue({
      id: depreciationReport.id,
      reportName: depreciationReport.reportName,
      timeOfReportRequest: depreciationReport.timeOfReportRequest ? depreciationReport.timeOfReportRequest.format(DATE_TIME_FORMAT) : null,
      requestedBy: depreciationReport.requestedBy,
      depreciationPeriod: depreciationReport.depreciationPeriod,
      serviceOutlet: depreciationReport.serviceOutlet,
      assetCategory: depreciationReport.assetCategory,
    });

    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing(
      this.applicationUsersSharedCollection,
      depreciationReport.requestedBy
    );
    this.depreciationPeriodsSharedCollection = this.depreciationPeriodService.addDepreciationPeriodToCollectionIfMissing(
      this.depreciationPeriodsSharedCollection,
      depreciationReport.depreciationPeriod
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing(
      this.serviceOutletsSharedCollection,
      depreciationReport.serviceOutlet
    );
    this.assetCategoriesSharedCollection = this.assetCategoryService.addAssetCategoryToCollectionIfMissing(
      this.assetCategoriesSharedCollection,
      depreciationReport.assetCategory
    );
  }

  protected loadRelationshipsOptions(): void {
    this.applicationUserService
      .query()
      .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
      .pipe(
        map((applicationUsers: IApplicationUser[]) =>
          this.applicationUserService.addApplicationUserToCollectionIfMissing(applicationUsers, this.editForm.get('requestedBy')!.value)
        )
      )
      .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));

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
  }

  protected createFromForm(): IDepreciationReport {
    return {
      ...new DepreciationReport(),
      id: this.editForm.get(['id'])!.value,
      reportName: this.editForm.get(['reportName'])!.value,
      timeOfReportRequest: this.editForm.get(['timeOfReportRequest'])!.value
        ? dayjs(this.editForm.get(['timeOfReportRequest'])!.value, DATE_TIME_FORMAT)
        : undefined,
      requestedBy: this.editForm.get(['requestedBy'])!.value,
      depreciationPeriod: this.editForm.get(['depreciationPeriod'])!.value,
      serviceOutlet: this.editForm.get(['serviceOutlet'])!.value,
      assetCategory: this.editForm.get(['assetCategory'])!.value,
    };
  }
}
