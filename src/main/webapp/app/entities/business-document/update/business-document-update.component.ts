import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { BusinessDocumentFormService, BusinessDocumentFormGroup } from './business-document-form.service';
import { IBusinessDocument } from '../business-document.model';
import { BusinessDocumentService } from '../service/business-document.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IAlgorithm } from 'app/entities/algorithm/algorithm.model';
import { AlgorithmService } from 'app/entities/algorithm/service/algorithm.service';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/security-clearance/service/security-clearance.service';

@Component({
  selector: 'jhi-business-document-update',
  templateUrl: './business-document-update.component.html',
})
export class BusinessDocumentUpdateComponent implements OnInit {
  isSaving = false;
  businessDocument: IBusinessDocument | null = null;

  applicationUsersSharedCollection: IApplicationUser[] = [];
  dealersSharedCollection: IDealer[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  algorithmsSharedCollection: IAlgorithm[] = [];
  securityClearancesSharedCollection: ISecurityClearance[] = [];

  editForm: BusinessDocumentFormGroup = this.businessDocumentFormService.createBusinessDocumentFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected businessDocumentService: BusinessDocumentService,
    protected businessDocumentFormService: BusinessDocumentFormService,
    protected applicationUserService: ApplicationUserService,
    protected dealerService: DealerService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected placeholderService: PlaceholderService,
    protected algorithmService: AlgorithmService,
    protected securityClearanceService: SecurityClearanceService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareApplicationUser = (o1: IApplicationUser | null, o2: IApplicationUser | null): boolean =>
    this.applicationUserService.compareApplicationUser(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareAlgorithm = (o1: IAlgorithm | null, o2: IAlgorithm | null): boolean => this.algorithmService.compareAlgorithm(o1, o2);

  compareSecurityClearance = (o1: ISecurityClearance | null, o2: ISecurityClearance | null): boolean =>
    this.securityClearanceService.compareSecurityClearance(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessDocument }) => {
      this.businessDocument = businessDocument;
      if (businessDocument) {
        this.updateForm(businessDocument);
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
    const businessDocument = this.businessDocumentFormService.getBusinessDocument(this.editForm);
    if (businessDocument.id !== null) {
      this.subscribeToSaveResponse(this.businessDocumentService.update(businessDocument));
    } else {
      this.subscribeToSaveResponse(this.businessDocumentService.create(businessDocument));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessDocument>>): void {
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

  protected updateForm(businessDocument: IBusinessDocument): void {
    this.businessDocument = businessDocument;
    this.businessDocumentFormService.resetForm(this.editForm, businessDocument);

    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
      this.applicationUsersSharedCollection,
      businessDocument.createdBy,
      businessDocument.lastModifiedBy
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      businessDocument.originatingDepartment
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(businessDocument.applicationMappings ?? [])
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(businessDocument.placeholders ?? [])
    );
    this.algorithmsSharedCollection = this.algorithmService.addAlgorithmToCollectionIfMissing<IAlgorithm>(
      this.algorithmsSharedCollection,
      businessDocument.fileChecksumAlgorithm
    );
    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
      this.securityClearancesSharedCollection,
      businessDocument.securityClearance
    );
  }

  protected loadRelationshipsOptions(): void {
    this.applicationUserService
      .query()
      .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
      .pipe(
        map((applicationUsers: IApplicationUser[]) =>
          this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
            applicationUsers,
            this.businessDocument?.createdBy,
            this.businessDocument?.lastModifiedBy
          )
        )
      )
      .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(dealers, this.businessDocument?.originatingDepartment)
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.businessDocument?.applicationMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.businessDocument?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.algorithmService
      .query()
      .pipe(map((res: HttpResponse<IAlgorithm[]>) => res.body ?? []))
      .pipe(
        map((algorithms: IAlgorithm[]) =>
          this.algorithmService.addAlgorithmToCollectionIfMissing<IAlgorithm>(algorithms, this.businessDocument?.fileChecksumAlgorithm)
        )
      )
      .subscribe((algorithms: IAlgorithm[]) => (this.algorithmsSharedCollection = algorithms));

    this.securityClearanceService
      .query()
      .pipe(map((res: HttpResponse<ISecurityClearance[]>) => res.body ?? []))
      .pipe(
        map((securityClearances: ISecurityClearance[]) =>
          this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
            securityClearances,
            this.businessDocument?.securityClearance
          )
        )
      )
      .subscribe((securityClearances: ISecurityClearance[]) => (this.securityClearancesSharedCollection = securityClearances));
  }
}
