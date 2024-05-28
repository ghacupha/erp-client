///
/// Erp System - Mark X No 8 (Jehoiada Series) Client 1.7.6
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

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ILeasePeriod } from '../../lease-period/lease-period.model';
import { leasePeriodSelected } from '../../../store/actions/lease-id-report-view-update.action';
import { Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';

@Component({
  selector: 'jhi-rou-account-balance-report-nav-parameter',
  templateUrl: './rou-account-balance-report-nav-parameter.component.html',
})
export class RouAccountBalanceReportNavParameterComponent  {

  editForm = this.fb.group({
    leasePeriod: [null, Validators.required],
  });

  constructor(
    protected fb: FormBuilder,
    protected store: Store<State>,
    protected router: Router
  ) {}

  updateLeasePeriod(update: ILeasePeriod): void {
    this.editForm.patchValue({
      leasePeriod: update
    });
  }

  previousState(): void {
    window.history.back();
  }

  navToReport(): void {

    const leasePeriodId: number| undefined = this.editForm.get(['leasePeriod'])!.value.id;

    this.store.dispatch(leasePeriodSelected({selectedLeasePeriodId: leasePeriodId}));

    this.router.navigate(['rou-account-balance-report-item'])
  }
}
