import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReportDesign, ReportDesign } from '../report-design.model';
import { ReportDesignService } from '../service/report-design.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { sha512 } from 'hash-wasm';
import { v4 as uuidv4 } from 'uuid';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IApplicationUser } from '../../../erp-common/application-user/application-user.model';
import { ISecurityClearance } from '../../../erp-common/security-clearance/security-clearance.model';
import { IDealer } from '../../../erp-common/models/dealer.model';
import { IPlaceholder } from '../../../erp-common/models/placeholder.model';
import { ISystemModule } from '../../../erp-common/system-module/system-module.model';
import { IAlgorithm } from '../../../erp-common/algorithm/algorithm.model';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { ApplicationUserService } from '../../../erp-common/application-user/service/application-user.service';
import { SecurityClearanceService } from '../../../erp-common/security-clearance/service/security-clearance.service';
import { DealerService } from '../../../erp-common/services/dealer.service';
import { PlaceholderService } from '../../../erp-common/services/placeholder.service';
import { SystemModuleService } from '../../../erp-common/system-module/service/system-module.service';
import { AlgorithmService } from '../../../erp-common/algorithm/service/algorithm.service';
import { SearchWithPagination } from '../../../../core/request/request.model';

@Component({
  selector: 'jhi-report-design-update',
  templateUrl: './report-design-update.component.html',
})
export class ReportDesignUpdateComponent implements OnInit {
  isSaving = false;

  catalogueToken = '';

  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  securityClearancesSharedCollection: ISecurityClearance[] = [];
  applicationUsersSharedCollection: IApplicationUser[] = [];
  dealersSharedCollection: IDealer[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  systemModulesSharedCollection: ISystemModule[] = [];
  algorithmsSharedCollection: IAlgorithm[] = [];

  editForm = this.fb.group({
    id: [],
    catalogueNumber: [null, [Validators.required]],
    designation: [null, [Validators.required]],
    description: [],
    notes: [],
    notesContentType: [],
    reportFile: [],
    reportFileContentType: [],
    reportFileChecksum: [null, []],
    parameters: [],
    securityClearance: [null, Validators.required],
    reportDesigner: [null, Validators.required],
    organization: [null, Validators.required],
    department: [null, Validators.required],
    placeholders: [],
    systemModule: [null, Validators.required],
    fileCheckSumAlgorithm: [null, Validators.required],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected reportDesignService: ReportDesignService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected securityClearanceService: SecurityClearanceService,
    protected applicationUserService: ApplicationUserService,
    protected dealerService: DealerService,
    protected placeholderService: PlaceholderService,
    protected systemModuleService: SystemModuleService,
    protected algorithmService: AlgorithmService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportDesign }) => {
      this.updateForm(reportDesign);

      this.loadRelationshipsOptions();
    });

    this.updateCatalogueNumber();

    this.updateFileUploadChecksum();

    this.updatePreferredDepartment();

    this.updatePreferredOrganization();
  }

  updatePreferredDepartment(): void {
    // TODO Replace with entity filters
    this.universallyUniqueMappingService.findMap("globallyPreferredReportDesignDepartmentDealer")
      .subscribe((mapped) => {
        this.dealerService.search(<SearchWithPagination>{ page: 0, size: 0, sort: [], query: mapped.body?.mappedValue })
          .subscribe(({ body: dealers }) => {
            if (dealers) {
              this.editForm.get(['department'])?.setValue(dealers[0]);
            }
          });
      });
  }

  updatePreferredOrganization(): void {
      // TODO Replace with entity filters
      this.universallyUniqueMappingService.search({ page: 0, size: 0, sort: [], query: "globallyPreferredReportDesignOrganizationDealer"})
        .subscribe(({ body }) => {
          if (body!.length > 0) {
            if (body) {
              this.dealerService.search(<SearchWithPagination>{ page: 0, size: 0, sort: [], query: body[0].mappedValue })
                .subscribe(({ body: dealers }) => {
                  if (dealers) {
                    this.editForm.get(['organization'])?.setValue(dealers[0]);
                  }
                });
            }
          }
        });
    }

  updateFileUploadChecksum(): void {
    this.editForm.get(['reportFile'])?.valueChanges.subscribe((fileAttachment) => {
      sha512(this.fileDataArray(fileAttachment)).then(sha512Token => {
        this.editForm.get(['reportFileChecksum'])?.setValue(sha512Token)
      });
    });
  }

  updateCatalogueNumber(): void {
    this.editForm.patchValue({
      catalogueNumber: uuidv4()
    });
  }

  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholders: [...update]
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateOrganization(dealerUpdate: IDealer): void {
    this.editForm.patchValue({
      organization: dealerUpdate,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateDepartment(dealerUpdate: IDealer): void {
    this.editForm.patchValue({
      department: dealerUpdate,
    });
  }

  fileDataArray(b64String: string): Uint8Array {
    const byteCharacters = atob(b64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
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
    const reportDesign = this.createFromForm();
    if (reportDesign.id !== undefined) {
      this.subscribeToSaveResponse(this.reportDesignService.update(reportDesign));
    } else {
      this.subscribeToSaveResponse(this.reportDesignService.create(reportDesign));
    }
  }

  trackUniversallyUniqueMappingById(index: number, item: IUniversallyUniqueMapping): number {
    return item.id!;
  }

  trackSecurityClearanceById(index: number, item: ISecurityClearance): number {
    return item.id!;
  }

  trackApplicationUserById(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackSystemModuleById(index: number, item: ISystemModule): number {
    return item.id!;
  }

  trackAlgorithmById(index: number, item: IAlgorithm): number {
    return item.id!;
  }

  getSelectedUniversallyUniqueMapping(
    option: IUniversallyUniqueMapping,
    selectedVals?: IUniversallyUniqueMapping[]
  ): IUniversallyUniqueMapping {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedPlaceholder(option: IPlaceholder, selectedVals?: IPlaceholder[]): IPlaceholder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportDesign>>): void {
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

  protected updateForm(reportDesign: IReportDesign): void {
    this.editForm.patchValue({
      id: reportDesign.id,
      catalogueNumber: reportDesign.catalogueNumber,
      designation: reportDesign.designation,
      description: reportDesign.description,
      notes: reportDesign.notes,
      notesContentType: reportDesign.notesContentType,
      reportFile: reportDesign.reportFile,
      reportFileContentType: reportDesign.reportFileContentType,
      reportFileChecksum: reportDesign.reportFileChecksum,
      parameters: reportDesign.parameters,
      securityClearance: reportDesign.securityClearance,
      reportDesigner: reportDesign.reportDesigner,
      organization: reportDesign.organization,
      department: reportDesign.department,
      placeholders: reportDesign.placeholders,
      systemModule: reportDesign.systemModule,
      fileCheckSumAlgorithm: reportDesign.fileCheckSumAlgorithm,
    });

    this.universallyUniqueMappingsSharedCollection = this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing(
      this.universallyUniqueMappingsSharedCollection,
      ...(reportDesign.parameters ?? [])
    );
    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing(
      this.securityClearancesSharedCollection,
      reportDesign.securityClearance
    );
    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing(
      this.applicationUsersSharedCollection,
      reportDesign.reportDesigner
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      reportDesign.organization,
      reportDesign.department
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(reportDesign.placeholders ?? [])
    );
    this.systemModulesSharedCollection = this.systemModuleService.addSystemModuleToCollectionIfMissing(
      this.systemModulesSharedCollection,
      reportDesign.systemModule
    );
    this.algorithmsSharedCollection = this.algorithmService.addAlgorithmToCollectionIfMissing(
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
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing(
            universallyUniqueMappings,
            ...(this.editForm.get('parameters')!.value ?? [])
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
          this.securityClearanceService.addSecurityClearanceToCollectionIfMissing(
            securityClearances,
            this.editForm.get('securityClearance')!.value
          )
        )
      )
      .subscribe((securityClearances: ISecurityClearance[]) => (this.securityClearancesSharedCollection = securityClearances));

    this.applicationUserService
      .query()
      .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
      .pipe(
        map((applicationUsers: IApplicationUser[]) =>
          this.applicationUserService.addApplicationUserToCollectionIfMissing(applicationUsers, this.editForm.get('reportDesigner')!.value)
        )
      )
      .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing(
            dealers,
            this.editForm.get('organization')!.value,
            this.editForm.get('department')!.value
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.systemModuleService
      .query()
      .pipe(map((res: HttpResponse<ISystemModule[]>) => res.body ?? []))
      .pipe(
        map((systemModules: ISystemModule[]) =>
          this.systemModuleService.addSystemModuleToCollectionIfMissing(systemModules, this.editForm.get('systemModule')!.value)
        )
      )
      .subscribe((systemModules: ISystemModule[]) => (this.systemModulesSharedCollection = systemModules));

    this.algorithmService
      .query()
      .pipe(map((res: HttpResponse<IAlgorithm[]>) => res.body ?? []))
      .pipe(
        map((algorithms: IAlgorithm[]) =>
          this.algorithmService.addAlgorithmToCollectionIfMissing(algorithms, this.editForm.get('fileCheckSumAlgorithm')!.value)
        )
      )
      .subscribe((algorithms: IAlgorithm[]) => (this.algorithmsSharedCollection = algorithms));
  }

  protected createFromForm(): IReportDesign {
    return {
      ...new ReportDesign(),
      id: this.editForm.get(['id'])!.value,
      catalogueNumber: this.editForm.get(['catalogueNumber'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      description: this.editForm.get(['description'])!.value,
      notesContentType: this.editForm.get(['notesContentType'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      reportFileContentType: this.editForm.get(['reportFileContentType'])!.value,
      reportFile: this.editForm.get(['reportFile'])!.value,
      reportFileChecksum: this.editForm.get(['reportFileChecksum'])!.value,
      parameters: this.editForm.get(['parameters'])!.value,
      securityClearance: this.editForm.get(['securityClearance'])!.value,
      reportDesigner: this.editForm.get(['reportDesigner'])!.value,
      organization: this.editForm.get(['organization'])!.value,
      department: this.editForm.get(['department'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      systemModule: this.editForm.get(['systemModule'])!.value,
      fileCheckSumAlgorithm: this.editForm.get(['fileCheckSumAlgorithm'])!.value,
    };
  }
}
