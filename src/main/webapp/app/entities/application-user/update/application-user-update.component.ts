import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IApplicationUser, ApplicationUser } from '../application-user.model';
import { ApplicationUserService } from '../service/application-user.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/security-clearance/service/security-clearance.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';

@Component({
  selector: 'jhi-application-user-update',
  templateUrl: './application-user-update.component.html',
})
export class ApplicationUserUpdateComponent implements OnInit {
  isSaving = false;

  dealersSharedCollection: IDealer[] = [];
  dealerIdentitiesCollection: IDealer[] = [];
  securityClearancesSharedCollection: ISecurityClearance[] = [];
  usersSharedCollection: IUser[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm = this.fb.group({
    id: [],
    designation: [null, [Validators.required]],
    applicationIdentity: [null, [Validators.required]],
    organization: [null, Validators.required],
    department: [null, Validators.required],
    securityClearance: [null, Validators.required],
    systemIdentity: [null, Validators.required],
    userProperties: [],
    dealerIdentity: [null, Validators.required],
  });

  constructor(
    protected applicationUserService: ApplicationUserService,
    protected dealerService: DealerService,
    protected securityClearanceService: SecurityClearanceService,
    protected userService: UserService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ applicationUser }) => {
      this.updateForm(applicationUser);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const applicationUser = this.createFromForm();
    if (applicationUser.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationUserService.update(applicationUser));
    } else {
      this.subscribeToSaveResponse(this.applicationUserService.create(applicationUser));
    }
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackSecurityClearanceById(index: number, item: ISecurityClearance): number {
    return item.id!;
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackUniversallyUniqueMappingById(index: number, item: IUniversallyUniqueMapping): number {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationUser>>): void {
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

  protected updateForm(applicationUser: IApplicationUser): void {
    this.editForm.patchValue({
      id: applicationUser.id,
      designation: applicationUser.designation,
      applicationIdentity: applicationUser.applicationIdentity,
      organization: applicationUser.organization,
      department: applicationUser.department,
      securityClearance: applicationUser.securityClearance,
      systemIdentity: applicationUser.systemIdentity,
      userProperties: applicationUser.userProperties,
      dealerIdentity: applicationUser.dealerIdentity,
    });

    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      applicationUser.organization,
      applicationUser.department
    );
    this.dealerIdentitiesCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealerIdentitiesCollection,
      applicationUser.dealerIdentity
    );
    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing(
      this.securityClearancesSharedCollection,
      applicationUser.securityClearance
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, applicationUser.systemIdentity);
    this.universallyUniqueMappingsSharedCollection = this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing(
      this.universallyUniqueMappingsSharedCollection,
      ...(applicationUser.userProperties ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
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

    this.dealerService
      .query({ 'applicationUserId.specified': 'false' })
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing(dealers, this.editForm.get('dealerIdentity')!.value))
      )
      .subscribe((dealers: IDealer[]) => (this.dealerIdentitiesCollection = dealers));

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

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('systemIdentity')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing(
            universallyUniqueMappings,
            ...(this.editForm.get('userProperties')!.value ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }

  protected createFromForm(): IApplicationUser {
    return {
      ...new ApplicationUser(),
      id: this.editForm.get(['id'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      applicationIdentity: this.editForm.get(['applicationIdentity'])!.value,
      organization: this.editForm.get(['organization'])!.value,
      department: this.editForm.get(['department'])!.value,
      securityClearance: this.editForm.get(['securityClearance'])!.value,
      systemIdentity: this.editForm.get(['systemIdentity'])!.value,
      userProperties: this.editForm.get(['userProperties'])!.value,
      dealerIdentity: this.editForm.get(['dealerIdentity'])!.value,
    };
  }
}
