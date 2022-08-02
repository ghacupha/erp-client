import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUniversallyUniqueMapping, UniversallyUniqueMapping } from '../universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'jhi-universally-unique-mapping-update',
  templateUrl: './universally-unique-mapping-update.component.html',
})
export class UniversallyUniqueMappingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    universalKey: [null, [Validators.required]],
    mappedValue: [],
  });

  constructor(
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ universallyUniqueMapping }) => {
      if (!universallyUniqueMapping.id) {
        this.editForm.patchValue({
          universalKey: uuidv4(),
        });
      }
      this.updateForm(universallyUniqueMapping);
    });
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
      id: this.editForm.get(['id'])!.value,
      universalKey: this.editForm.get(['universalKey'])!.value,
      mappedValue: this.editForm.get(['mappedValue'])!.value,
    };
  }
}
