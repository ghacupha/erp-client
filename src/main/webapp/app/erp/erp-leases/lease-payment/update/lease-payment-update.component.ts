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
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';

import { ILeasePayment, LeasePayment } from '../lease-payment.model';
import { LeasePaymentService } from '../service/lease-payment.service';
import { LeaseLiabilityService } from '../../lease-liability/service/lease-liability.service';
import { ILeaseLiability } from '../../lease-liability/lease-liability.model';
import {
  getIFRS16LeaseContractIdentifier,
  IFRS16LeaseContract, IIFRS16LeaseContract
} from '../../ifrs-16-lease-contract/ifrs-16-lease-contract.model';
import { IFRS16LeaseContractService } from '../../ifrs-16-lease-contract/service/ifrs-16-lease-contract.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import {
  copyingLeasePaymentStatus,
  creatingLeasePaymentStatus,
  editingLeasePaymentStatus,
  leasePaymentSelectedInstance
} from '../../../store/selectors/lease-payment-workflows-status.selector';

@Component({
  selector: 'jhi-lease-payment-update',
  templateUrl: './lease-payment-update.component.html'
})
export class LeasePaymentUpdateComponent implements OnInit {
  isSaving = false;

  leaseLiabilitiesSharedCollection: ILeaseLiability[] = [];

  editForm = this.fb.group({
    id: [],
    paymentDate: [],
    paymentAmount: [],
    leaseLiability: [null, Validators.required]
  });

  // Setting up default form states
  weAreCopying = false;
  weAreEditing = false;
  weAreCreating = false;
  selectedItem = { ...new LeasePayment() };
  selectedLeaseContract = { ...new IFRS16LeaseContract() };

  constructor(
    protected leasePaymentService: LeasePaymentService,
    protected leaseLiabilityService: LeaseLiabilityService,
    protected ifrs16LeaseContractService: IFRS16LeaseContractService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected store: Store<State>
  ) {
    this.store.pipe(select(copyingLeasePaymentStatus)).subscribe(stat => this.weAreCopying = stat);
    this.store.pipe(select(editingLeasePaymentStatus)).subscribe(stat => this.weAreEditing = stat);
    this.store.pipe(select(creatingLeasePaymentStatus)).subscribe(stat => this.weAreCreating = stat);
    this.store.pipe(select(leasePaymentSelectedInstance)).subscribe(copied => {
      this.selectedItem = copied;

      if (this.selectedItem.leaseLiability) {
        const liability: ILeaseLiability = this.selectedItem.leaseLiability;
        if (liability.leaseContract !== undefined) {
          const ifrs16Lease: IIFRS16LeaseContract = liability.leaseContract;
          if (ifrs16Lease.id !== undefined) {
            this.ifrs16LeaseContractService.find(ifrs16Lease.id).subscribe(leaseContractResponse => {
              if (leaseContractResponse.body) {
                this.selectedLeaseContract = leaseContractResponse.body;
              }
            });
          }
        }
      }

    });
  }

  ngOnInit(): void {

    if (this.weAreEditing) {
      this.updateForm(this.selectedItem);
    }

    if (this.weAreCopying) {

      this.updateForm(this.selectedItem);
    }

    if (this.weAreCreating) {
      this.editForm.patchValue({
        paymentDate: dayjs()
      });
    }
  }

  updateLeaseLiability(value: ILeaseLiability): void {
    this.editForm.patchValue({
      leaseLiability: value
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.leasePaymentService.create(this.createFromForm()));
  }

  edit(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.leasePaymentService.update(this.createFromForm()));
  }

  copy(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.leasePaymentService.create(this.copyFromForm()));
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
      paymentDate: leasePayment.paymentDate,
      paymentAmount: leasePayment.paymentAmount,
      leaseLiability: leasePayment.leaseLiability
    });

    this.leaseLiabilitiesSharedCollection = this.leaseLiabilityService.addLeaseLiabilityToCollectionIfMissing(
      this.leaseLiabilitiesSharedCollection,
      leasePayment.leaseLiability
    );
  }

  protected createFromForm(): ILeasePayment {
    return {
      ...new LeasePayment(),
      id: this.editForm.get(['id'])!.value,
      paymentDate: this.editForm.get(['paymentDate'])!.value,
      paymentAmount: this.editForm.get(['paymentAmount'])!.value,
      leaseLiability: this.editForm.get(['leaseLiability'])!.value
    };
  }

  protected copyFromForm(): ILeasePayment {
    return {
      ...new LeasePayment(),
      paymentDate: this.editForm.get(['paymentDate'])!.value,
      paymentAmount: this.editForm.get(['paymentAmount'])!.value,
      leaseLiability: this.editForm.get(['leaseLiability'])!.value
    };
  }
}
