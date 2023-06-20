import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UniversallyUniqueMappingFormService, UniversallyUniqueMappingFormGroup } from './universally-unique-mapping-form.service';
import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';

@Component({
  selector: 'jhi-universally-unique-mapping-update',
  templateUrl: './universally-unique-mapping-update.component.html',
})
export class UniversallyUniqueMappingUpdateComponent implements OnInit {
  isSaving = false;
  universallyUniqueMapping: IUniversallyUniqueMapping | null = null;

  editForm: UniversallyUniqueMappingFormGroup = this.universallyUniqueMappingFormService.createUniversallyUniqueMappingFormGroup();

  constructor(
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected universallyUniqueMappingFormService: UniversallyUniqueMappingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ universallyUniqueMapping }) => {
      this.universallyUniqueMapping = universallyUniqueMapping;
      if (universallyUniqueMapping) {
        this.updateForm(universallyUniqueMapping);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const universallyUniqueMapping = this.universallyUniqueMappingFormService.getUniversallyUniqueMapping(this.editForm);
    if (universallyUniqueMapping.id !== null) {
      this.subscribeToSaveResponse(this.universallyUniqueMappingService.update(universallyUniqueMapping));
    } else {
      this.subscribeToSaveResponse(this.universallyUniqueMappingService.create(universallyUniqueMapping));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUniversallyUniqueMapping>>): void {
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

  protected updateForm(universallyUniqueMapping: IUniversallyUniqueMapping): void {
    this.universallyUniqueMapping = universallyUniqueMapping;
    this.universallyUniqueMappingFormService.resetForm(this.editForm, universallyUniqueMapping);
  }
}
