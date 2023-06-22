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

import { ExcelReportExportFormService, ExcelReportExportFormGroup } from './excel-report-export-form.service';
import { IExcelReportExport } from '../excel-report-export.model';
import { ExcelReportExportService } from '../service/excel-report-export.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IReportStatus } from 'app/entities/reports/report-status/report-status.model';
import { ReportStatusService } from 'app/entities/reports/report-status/service/report-status.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { ISystemModule } from 'app/entities/system/system-module/system-module.model';
import { SystemModuleService } from 'app/entities/system/system-module/service/system-module.service';
import { IReportDesign } from 'app/entities/reports/report-design/report-design.model';
import { ReportDesignService } from 'app/entities/reports/report-design/service/report-design.service';
import { IAlgorithm } from 'app/entities/system/algorithm/algorithm.model';
import { AlgorithmService } from 'app/entities/system/algorithm/service/algorithm.service';

@Component({
  selector: 'jhi-excel-report-export-update',
  templateUrl: './excel-report-export-update.component.html',
})
export class ExcelReportExportUpdateComponent implements OnInit {
  isSaving = false;
  excelReportExport: IExcelReportExport | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  reportStatusesSharedCollection: IReportStatus[] = [];
  securityClearancesSharedCollection: ISecurityClearance[] = [];
  applicationUsersSharedCollection: IApplicationUser[] = [];
  dealersSharedCollection: IDealer[] = [];
  systemModulesSharedCollection: ISystemModule[] = [];
  reportDesignsSharedCollection: IReportDesign[] = [];
  algorithmsSharedCollection: IAlgorithm[] = [];

  editForm: ExcelReportExportFormGroup = this.excelReportExportFormService.createExcelReportExportFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected excelReportExportService: ExcelReportExportService,
    protected excelReportExportFormService: ExcelReportExportFormService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected reportStatusService: ReportStatusService,
    protected securityClearanceService: SecurityClearanceService,
    protected applicationUserService: ApplicationUserService,
    protected dealerService: DealerService,
    protected systemModuleService: SystemModuleService,
    protected reportDesignService: ReportDesignService,
    protected algorithmService: AlgorithmService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareReportStatus = (o1: IReportStatus | null, o2: IReportStatus | null): boolean =>
    this.reportStatusService.compareReportStatus(o1, o2);

  compareSecurityClearance = (o1: ISecurityClearance | null, o2: ISecurityClearance | null): boolean =>
    this.securityClearanceService.compareSecurityClearance(o1, o2);

  compareApplicationUser = (o1: IApplicationUser | null, o2: IApplicationUser | null): boolean =>
    this.applicationUserService.compareApplicationUser(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareSystemModule = (o1: ISystemModule | null, o2: ISystemModule | null): boolean =>
    this.systemModuleService.compareSystemModule(o1, o2);

  compareReportDesign = (o1: IReportDesign | null, o2: IReportDesign | null): boolean =>
    this.reportDesignService.compareReportDesign(o1, o2);

  compareAlgorithm = (o1: IAlgorithm | null, o2: IAlgorithm | null): boolean => this.algorithmService.compareAlgorithm(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ excelReportExport }) => {
      this.excelReportExport = excelReportExport;
      if (excelReportExport) {
        this.updateForm(excelReportExport);
      }

      this.loadRelationshipsOptions();
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
    const excelReportExport = this.excelReportExportFormService.getExcelReportExport(this.editForm);
    if (excelReportExport.id !== null) {
      this.subscribeToSaveResponse(this.excelReportExportService.update(excelReportExport));
    } else {
      this.subscribeToSaveResponse(this.excelReportExportService.create(excelReportExport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExcelReportExport>>): void {
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

  protected updateForm(excelReportExport: IExcelReportExport): void {
    this.excelReportExport = excelReportExport;
    this.excelReportExportFormService.resetForm(this.editForm, excelReportExport);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(excelReportExport.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(excelReportExport.parameters ?? [])
      );
    this.reportStatusesSharedCollection = this.reportStatusService.addReportStatusToCollectionIfMissing<IReportStatus>(
      this.reportStatusesSharedCollection,
      excelReportExport.reportStatus
    );
    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
      this.securityClearancesSharedCollection,
      excelReportExport.securityClearance
    );
    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
      this.applicationUsersSharedCollection,
      excelReportExport.reportCreator
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      excelReportExport.organization,
      excelReportExport.department
    );
    this.systemModulesSharedCollection = this.systemModuleService.addSystemModuleToCollectionIfMissing<ISystemModule>(
      this.systemModulesSharedCollection,
      excelReportExport.systemModule
    );
    this.reportDesignsSharedCollection = this.reportDesignService.addReportDesignToCollectionIfMissing<IReportDesign>(
      this.reportDesignsSharedCollection,
      excelReportExport.reportDesign
    );
    this.algorithmsSharedCollection = this.algorithmService.addAlgorithmToCollectionIfMissing<IAlgorithm>(
      this.algorithmsSharedCollection,
      excelReportExport.fileCheckSumAlgorithm
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
            ...(this.excelReportExport?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.excelReportExport?.parameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.reportStatusService
      .query()
      .pipe(map((res: HttpResponse<IReportStatus[]>) => res.body ?? []))
      .pipe(
        map((reportStatuses: IReportStatus[]) =>
          this.reportStatusService.addReportStatusToCollectionIfMissing<IReportStatus>(reportStatuses, this.excelReportExport?.reportStatus)
        )
      )
      .subscribe((reportStatuses: IReportStatus[]) => (this.reportStatusesSharedCollection = reportStatuses));

    this.securityClearanceService
      .query()
      .pipe(map((res: HttpResponse<ISecurityClearance[]>) => res.body ?? []))
      .pipe(
        map((securityClearances: ISecurityClearance[]) =>
          this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
            securityClearances,
            this.excelReportExport?.securityClearance
          )
        )
      )
      .subscribe((securityClearances: ISecurityClearance[]) => (this.securityClearancesSharedCollection = securityClearances));

    this.applicationUserService
      .query()
      .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
      .pipe(
        map((applicationUsers: IApplicationUser[]) =>
          this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
            applicationUsers,
            this.excelReportExport?.reportCreator
          )
        )
      )
      .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(
            dealers,
            this.excelReportExport?.organization,
            this.excelReportExport?.department
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.systemModuleService
      .query()
      .pipe(map((res: HttpResponse<ISystemModule[]>) => res.body ?? []))
      .pipe(
        map((systemModules: ISystemModule[]) =>
          this.systemModuleService.addSystemModuleToCollectionIfMissing<ISystemModule>(systemModules, this.excelReportExport?.systemModule)
        )
      )
      .subscribe((systemModules: ISystemModule[]) => (this.systemModulesSharedCollection = systemModules));

    this.reportDesignService
      .query()
      .pipe(map((res: HttpResponse<IReportDesign[]>) => res.body ?? []))
      .pipe(
        map((reportDesigns: IReportDesign[]) =>
          this.reportDesignService.addReportDesignToCollectionIfMissing<IReportDesign>(reportDesigns, this.excelReportExport?.reportDesign)
        )
      )
      .subscribe((reportDesigns: IReportDesign[]) => (this.reportDesignsSharedCollection = reportDesigns));

    this.algorithmService
      .query()
      .pipe(map((res: HttpResponse<IAlgorithm[]>) => res.body ?? []))
      .pipe(
        map((algorithms: IAlgorithm[]) =>
          this.algorithmService.addAlgorithmToCollectionIfMissing<IAlgorithm>(algorithms, this.excelReportExport?.fileCheckSumAlgorithm)
        )
      )
      .subscribe((algorithms: IAlgorithm[]) => (this.algorithmsSharedCollection = algorithms));
  }
}
