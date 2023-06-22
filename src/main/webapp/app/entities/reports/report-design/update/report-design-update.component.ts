import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ReportDesignFormService, ReportDesignFormGroup } from './report-design-form.service';
import { IReportDesign } from '../report-design.model';
import { ReportDesignService } from '../service/report-design.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ISystemModule } from 'app/entities/system/system-module/system-module.model';
import { SystemModuleService } from 'app/entities/system/system-module/service/system-module.service';
import { IAlgorithm } from 'app/entities/system/algorithm/algorithm.model';
import { AlgorithmService } from 'app/entities/system/algorithm/service/algorithm.service';

@Component({
  selector: 'jhi-report-design-update',
  templateUrl: './report-design-update.component.html',
})
export class ReportDesignUpdateComponent implements OnInit {
  isSaving = false;
  reportDesign: IReportDesign | null = null;

  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  securityClearancesSharedCollection: ISecurityClearance[] = [];
  applicationUsersSharedCollection: IApplicationUser[] = [];
  dealersSharedCollection: IDealer[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  systemModulesSharedCollection: ISystemModule[] = [];
  algorithmsSharedCollection: IAlgorithm[] = [];

  editForm: ReportDesignFormGroup = this.reportDesignFormService.createReportDesignFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected reportDesignService: ReportDesignService,
    protected reportDesignFormService: ReportDesignFormService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected securityClearanceService: SecurityClearanceService,
    protected applicationUserService: ApplicationUserService,
    protected dealerService: DealerService,
    protected placeholderService: PlaceholderService,
    protected systemModuleService: SystemModuleService,
    protected algorithmService: AlgorithmService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareSecurityClearance = (o1: ISecurityClearance | null, o2: ISecurityClearance | null): boolean =>
    this.securityClearanceService.compareSecurityClearance(o1, o2);

  compareApplicationUser = (o1: IApplicationUser | null, o2: IApplicationUser | null): boolean =>
    this.applicationUserService.compareApplicationUser(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareSystemModule = (o1: ISystemModule | null, o2: ISystemModule | null): boolean =>
    this.systemModuleService.compareSystemModule(o1, o2);

  compareAlgorithm = (o1: IAlgorithm | null, o2: IAlgorithm | null): boolean => this.algorithmService.compareAlgorithm(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportDesign }) => {
      this.reportDesign = reportDesign;
      if (reportDesign) {
        this.updateForm(reportDesign);
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
    const reportDesign = this.reportDesignFormService.getReportDesign(this.editForm);
    if (reportDesign.id !== null) {
      this.subscribeToSaveResponse(this.reportDesignService.update(reportDesign));
    } else {
      this.subscribeToSaveResponse(this.reportDesignService.create(reportDesign));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportDesign>>): void {
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

  protected updateForm(reportDesign: IReportDesign): void {
    this.reportDesign = reportDesign;
    this.reportDesignFormService.resetForm(this.editForm, reportDesign);

    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(reportDesign.parameters ?? [])
      );
    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
      this.securityClearancesSharedCollection,
      reportDesign.securityClearance
    );
    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
      this.applicationUsersSharedCollection,
      reportDesign.reportDesigner
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      reportDesign.organization,
      reportDesign.department
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(reportDesign.placeholders ?? [])
    );
    this.systemModulesSharedCollection = this.systemModuleService.addSystemModuleToCollectionIfMissing<ISystemModule>(
      this.systemModulesSharedCollection,
      reportDesign.systemModule
    );
    this.algorithmsSharedCollection = this.algorithmService.addAlgorithmToCollectionIfMissing<IAlgorithm>(
      this.algorithmsSharedCollection,
      reportDesign.fileCheckSumAlgorithm
    );
  }

  protected loadRelationshipsOptions(): void {
    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.reportDesign?.parameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.securityClearanceService
      .query()
      .pipe(map((res: HttpResponse<ISecurityClearance[]>) => res.body ?? []))
      .pipe(
        map((securityClearances: ISecurityClearance[]) =>
          this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
            securityClearances,
            this.reportDesign?.securityClearance
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
            this.reportDesign?.reportDesigner
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
            this.reportDesign?.organization,
            this.reportDesign?.department
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.reportDesign?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.systemModuleService
      .query()
      .pipe(map((res: HttpResponse<ISystemModule[]>) => res.body ?? []))
      .pipe(
        map((systemModules: ISystemModule[]) =>
          this.systemModuleService.addSystemModuleToCollectionIfMissing<ISystemModule>(systemModules, this.reportDesign?.systemModule)
        )
      )
      .subscribe((systemModules: ISystemModule[]) => (this.systemModulesSharedCollection = systemModules));

    this.algorithmService
      .query()
      .pipe(map((res: HttpResponse<IAlgorithm[]>) => res.body ?? []))
      .pipe(
        map((algorithms: IAlgorithm[]) =>
          this.algorithmService.addAlgorithmToCollectionIfMissing<IAlgorithm>(algorithms, this.reportDesign?.fileCheckSumAlgorithm)
        )
      )
      .subscribe((algorithms: IAlgorithm[]) => (this.algorithmsSharedCollection = algorithms));
  }
}
