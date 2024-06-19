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

import { ILeaseLiability, LeaseLiability } from '../lease-liability.model';
import { LeaseLiabilityService } from '../service/lease-liability.service';
import { ILeaseAmortizationCalculation } from 'app/entities/leases/lease-amortization-calculation/lease-amortization-calculation.model';
import { LeaseAmortizationCalculationService } from 'app/entities/leases/lease-amortization-calculation/service/lease-amortization-calculation.service';

@Component({
  selector: 'jhi-lease-liability-update',
  templateUrl: './lease-liability-update.component.html',
})
export class LeaseLiabilityUpdateComponent implements OnInit {
  isSaving = false;

  leaseAmortizationCalculationsCollection: ILeaseAmortizationCalculation[] = [];

  editForm = this.fb.group({
    id: [],
    leaseId: [null, [Validators.required]],
    liabilityAmount: [null, [Validators.required, Validators.min(0)]],
    interestRate: [null, [Validators.required, Validators.min(0)]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required, Validators.min(0)]],
    leaseAmortizationCalculation: [],
  });

  constructor(
    protected leaseLiabilityService: LeaseLiabilityService,
    protected leaseAmortizationCalculationService: LeaseAmortizationCalculationService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leaseLiability }) => {
      if (leaseLiability.id === undefined) {
        const today = dayjs().startOf('day');
        leaseLiability.startDate = today;
      }

      this.updateForm(leaseLiability);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leaseLiability = this.createFromForm();
    if (leaseLiability.id !== undefined) {
      this.subscribeToSaveResponse(this.leaseLiabilityService.update(leaseLiability));
    } else {
      this.subscribeToSaveResponse(this.leaseLiabilityService.create(leaseLiability));
    }
  }

  trackLeaseAmortizationCalculationById(index: number, item: ILeaseAmortizationCalculation): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeaseLiability>>): void {
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

  protected updateForm(leaseLiability: ILeaseLiability): void {
    this.editForm.patchValue({
      id: leaseLiability.id,
      leaseId: leaseLiability.leaseId,
      liabilityAmount: leaseLiability.liabilityAmount,
      interestRate: leaseLiability.interestRate,
      startDate: leaseLiability.startDate ? leaseLiability.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: leaseLiability.endDate,
      leaseAmortizationCalculation: leaseLiability.leaseAmortizationCalculation,
    });

    this.leaseAmortizationCalculationsCollection =
      this.leaseAmortizationCalculationService.addLeaseAmortizationCalculationToCollectionIfMissing(
        this.leaseAmortizationCalculationsCollection,
        leaseLiability.leaseAmortizationCalculation
      );
  }

  protected loadRelationshipsOptions(): void {
    this.leaseAmortizationCalculationService
      .query({ 'leaseLiabilityId.specified': 'false' })
      .pipe(map((res: HttpResponse<ILeaseAmortizationCalculation[]>) => res.body ?? []))
      .pipe(
        map((leaseAmortizationCalculations: ILeaseAmortizationCalculation[]) =>
          this.leaseAmortizationCalculationService.addLeaseAmortizationCalculationToCollectionIfMissing(
            leaseAmortizationCalculations,
            this.editForm.get('leaseAmortizationCalculation')!.value
          )
        )
      )
      .subscribe(
        (leaseAmortizationCalculations: ILeaseAmortizationCalculation[]) =>
          (this.leaseAmortizationCalculationsCollection = leaseAmortizationCalculations)
      );
  }

  protected createFromForm(): ILeaseLiability {
    return {
      ...new LeaseLiability(),
      id: this.editForm.get(['id'])!.value,
      leaseId: this.editForm.get(['leaseId'])!.value,
      liabilityAmount: this.editForm.get(['liabilityAmount'])!.value,
      interestRate: this.editForm.get(['interestRate'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? dayjs(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value,
      leaseAmortizationCalculation: this.editForm.get(['leaseAmortizationCalculation'])!.value,
    };
  }
}
