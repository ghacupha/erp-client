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

import { ServiceOutletFormService, ServiceOutletFormGroup } from './service-outlet-form.service';
import { IServiceOutlet } from '../service-outlet.model';
import { ServiceOutletService } from '../service/service-outlet.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBankBranchCode } from 'app/entities/data/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/data/bank-branch-code/service/bank-branch-code.service';
import { IOutletType } from 'app/entities/data/outlet-type/outlet-type.model';
import { OutletTypeService } from 'app/entities/data/outlet-type/service/outlet-type.service';
import { IOutletStatus } from 'app/entities/data/outlet-status/outlet-status.model';
import { OutletStatusService } from 'app/entities/data/outlet-status/service/outlet-status.service';
import { ICountyCode } from 'app/entities/data/county-code/county-code.model';
import { CountyCodeService } from 'app/entities/data/county-code/service/county-code.service';

@Component({
  selector: 'jhi-service-outlet-update',
  templateUrl: './service-outlet-update.component.html',
})
export class ServiceOutletUpdateComponent implements OnInit {
  isSaving = false;
  serviceOutlet: IServiceOutlet | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];
  outletTypesSharedCollection: IOutletType[] = [];
  outletStatusesSharedCollection: IOutletStatus[] = [];
  countyCodesSharedCollection: ICountyCode[] = [];

  editForm: ServiceOutletFormGroup = this.serviceOutletFormService.createServiceOutletFormGroup();

  constructor(
    protected serviceOutletService: ServiceOutletService,
    protected serviceOutletFormService: ServiceOutletFormService,
    protected placeholderService: PlaceholderService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected outletTypeService: OutletTypeService,
    protected outletStatusService: OutletStatusService,
    protected countyCodeService: CountyCodeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  compareOutletType = (o1: IOutletType | null, o2: IOutletType | null): boolean => this.outletTypeService.compareOutletType(o1, o2);

  compareOutletStatus = (o1: IOutletStatus | null, o2: IOutletStatus | null): boolean =>
    this.outletStatusService.compareOutletStatus(o1, o2);

  compareCountyCode = (o1: ICountyCode | null, o2: ICountyCode | null): boolean => this.countyCodeService.compareCountyCode(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceOutlet }) => {
      this.serviceOutlet = serviceOutlet;
      if (serviceOutlet) {
        this.updateForm(serviceOutlet);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceOutlet = this.serviceOutletFormService.getServiceOutlet(this.editForm);
    if (serviceOutlet.id !== null) {
      this.subscribeToSaveResponse(this.serviceOutletService.update(serviceOutlet));
    } else {
      this.subscribeToSaveResponse(this.serviceOutletService.create(serviceOutlet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceOutlet>>): void {
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

  protected updateForm(serviceOutlet: IServiceOutlet): void {
    this.serviceOutlet = serviceOutlet;
    this.serviceOutletFormService.resetForm(this.editForm, serviceOutlet);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(serviceOutlet.placeholders ?? [])
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      serviceOutlet.bankCode
    );
    this.outletTypesSharedCollection = this.outletTypeService.addOutletTypeToCollectionIfMissing<IOutletType>(
      this.outletTypesSharedCollection,
      serviceOutlet.outletType
    );
    this.outletStatusesSharedCollection = this.outletStatusService.addOutletStatusToCollectionIfMissing<IOutletStatus>(
      this.outletStatusesSharedCollection,
      serviceOutlet.outletStatus
    );
    this.countyCodesSharedCollection = this.countyCodeService.addCountyCodeToCollectionIfMissing<ICountyCode>(
      this.countyCodesSharedCollection,
      serviceOutlet.countyName,
      serviceOutlet.subCountyName
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
            ...(this.serviceOutlet?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.bankBranchCodeService
      .query()
      .pipe(map((res: HttpResponse<IBankBranchCode[]>) => res.body ?? []))
      .pipe(
        map((bankBranchCodes: IBankBranchCode[]) =>
          this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(bankBranchCodes, this.serviceOutlet?.bankCode)
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));

    this.outletTypeService
      .query()
      .pipe(map((res: HttpResponse<IOutletType[]>) => res.body ?? []))
      .pipe(
        map((outletTypes: IOutletType[]) =>
          this.outletTypeService.addOutletTypeToCollectionIfMissing<IOutletType>(outletTypes, this.serviceOutlet?.outletType)
        )
      )
      .subscribe((outletTypes: IOutletType[]) => (this.outletTypesSharedCollection = outletTypes));

    this.outletStatusService
      .query()
      .pipe(map((res: HttpResponse<IOutletStatus[]>) => res.body ?? []))
      .pipe(
        map((outletStatuses: IOutletStatus[]) =>
          this.outletStatusService.addOutletStatusToCollectionIfMissing<IOutletStatus>(outletStatuses, this.serviceOutlet?.outletStatus)
        )
      )
      .subscribe((outletStatuses: IOutletStatus[]) => (this.outletStatusesSharedCollection = outletStatuses));

    this.countyCodeService
      .query()
      .pipe(map((res: HttpResponse<ICountyCode[]>) => res.body ?? []))
      .pipe(
        map((countyCodes: ICountyCode[]) =>
          this.countyCodeService.addCountyCodeToCollectionIfMissing<ICountyCode>(
            countyCodes,
            this.serviceOutlet?.countyName,
            this.serviceOutlet?.subCountyName
          )
        )
      )
      .subscribe((countyCodes: ICountyCode[]) => (this.countyCodesSharedCollection = countyCodes));
  }
}
