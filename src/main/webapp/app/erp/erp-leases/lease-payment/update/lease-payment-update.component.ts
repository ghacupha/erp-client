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

import { ILeasePayment, LeasePayment } from '../lease-payment.model';
import { LeasePaymentService } from '../service/lease-payment.service';
import { LeaseLiabilityService } from '../../lease-liability/service/lease-liability.service';
import { ILeaseLiability } from '../../lease-liability/lease-liability.model';

@Component({
  selector: 'jhi-lease-payment-update',
  templateUrl: './lease-payment-update.component.html',
})
export class LeasePaymentUpdateComponent implements OnInit {
  isSaving = false;

  leaseLiabilitiesSharedCollection: ILeaseLiability[] = [];

  editForm = this.fb.group({
    id: [],
    paymentDate: [],
    paymentAmount: [],
    leaseLiability: [null, Validators.required],
  });

  constructor(
    protected leasePaymentService: LeasePaymentService,
    protected leaseLiabilityService: LeaseLiabilityService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leasePayment }) => {
      if (leasePayment.id === undefined) {
        const today = dayjs().startOf('day');
        leasePayment.paymentDate = today;
      }

      this.updateForm(leasePayment);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leasePayment = this.createFromForm();
    if (leasePayment.id !== undefined) {
      this.subscribeToSaveResponse(this.leasePaymentService.update(leasePayment));
    } else {
      this.subscribeToSaveResponse(this.leasePaymentService.create(leasePayment));
    }
  }

  trackLeaseLiabilityById(index: number, item: ILeaseLiability): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeasePayment>>): void {
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

  protected updateForm(leasePayment: ILeasePayment): void {
    this.editForm.patchValue({
      id: leasePayment.id,
      paymentDate: leasePayment.paymentDate ? leasePayment.paymentDate.format(DATE_TIME_FORMAT) : null,
      paymentAmount: leasePayment.paymentAmount,
      leaseLiability: leasePayment.leaseLiability,
    });

    this.leaseLiabilitiesSharedCollection = this.leaseLiabilityService.addLeaseLiabilityToCollectionIfMissing(
      this.leaseLiabilitiesSharedCollection,
      leasePayment.leaseLiability
    );
  }

  protected loadRelationshipsOptions(): void {
    this.leaseLiabilityService
      .query()
      .pipe(map((res: HttpResponse<ILeaseLiability[]>) => res.body ?? []))
      .pipe(
        map((leaseLiabilities: ILeaseLiability[]) =>
          this.leaseLiabilityService.addLeaseLiabilityToCollectionIfMissing(leaseLiabilities, this.editForm.get('leaseLiability')!.value)
        )
      )
      .subscribe((leaseLiabilities: ILeaseLiability[]) => (this.leaseLiabilitiesSharedCollection = leaseLiabilities));
  }

  protected createFromForm(): ILeasePayment {
    return {
      ...new LeasePayment(),
      id: this.editForm.get(['id'])!.value,
      paymentDate: this.editForm.get(['paymentDate'])!.value
        ? dayjs(this.editForm.get(['paymentDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      paymentAmount: this.editForm.get(['paymentAmount'])!.value,
      leaseLiability: this.editForm.get(['leaseLiability'])!.value,
    };
  }
}
