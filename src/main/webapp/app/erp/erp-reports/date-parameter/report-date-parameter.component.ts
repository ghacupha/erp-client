///
/// Erp System - Mark VII No 4 (Gideon Series) Client 1.5.6
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

import { Component} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EventManager } from 'app/core/util/event-manager.service';
import {
  IUniversallyUniqueMapping,
  UniversallyUniqueMapping
} from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from '../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';

@Component({
  selector: 'jhi-report-date-parameter',
  templateUrl: './report-date-parameter.component.html',
})
export class ReportDateParameterComponent {
  isSaving = false;

  editForm = this.fb.group({
    reportDate: [null, [Validators.required]],
  });

  constructor(
    protected eventManager: EventManager,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected router: Router,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    // protected store: Store<State>,
    // protected router: Router,
  ) {

    // this.store.pipe(select(copyingSettlementStatus)).subscribe(stat => this.weAreCopyingAPayment = stat);
    // this.store.pipe(select(editingSettlementStatus)).subscribe(stat => this.weAreEditingAPayment = stat);
    // this.store.pipe(select(creatingSettlementStatus)).subscribe(stat => this.weAreCreatingAPayment = stat);
    // this.store.pipe(select(settlementUpdateSelectedPayment)).subscribe(copiedSettlement => this.selectedSettlement = copiedSettlement);
    // this.store.pipe(select(settlementBrowserRefreshStatus)).subscribe(refreshed => this.browserHasBeenRefreshed = refreshed);
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const universallyUniqueMapping = this.createFromForm();
    if (universallyUniqueMapping.id !== undefined) {
      this.subscribeToSaveResponse(this.universallyUniqueMappingService.update(universallyUniqueMapping));
    } else {
      this.subscribeToSaveResponse(this.universallyUniqueMappingService.create(universallyUniqueMapping));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUniversallyUniqueMapping>>): void {
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

  protected updateForm(universallyUniqueMapping: IUniversallyUniqueMapping): void {
    this.editForm.patchValue({
      id: universallyUniqueMapping.id,
      universalKey: universallyUniqueMapping.universalKey,
      mappedValue: universallyUniqueMapping.mappedValue,
    });
  }

  protected createFromForm(): IUniversallyUniqueMapping {
    return {
      ...new UniversallyUniqueMapping(),
      universalKey: 'Report_date',
      mappedValue: this.editForm.get(['mappedValue'])!.value,
    };
  }

}
