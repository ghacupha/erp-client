import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IShareholderType, ShareholderType } from '../shareholder-type.model';
import { ShareholderTypeService } from '../service/shareholder-type.service';
import { ShareHolderTypes } from 'app/entities/enumerations/share-holder-types.model';

@Component({
  selector: 'jhi-shareholder-type-update',
  templateUrl: './shareholder-type-update.component.html',
})
export class ShareholderTypeUpdateComponent implements OnInit {
  isSaving = false;
  shareHolderTypesValues = Object.keys(ShareHolderTypes);

  editForm = this.fb.group({
    id: [],
    shareHolderTypeCode: [null, [Validators.required]],
    shareHolderType: [null, [Validators.required]],
  });

  constructor(
    protected shareholderTypeService: ShareholderTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shareholderType }) => {
      this.updateForm(shareholderType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shareholderType = this.createFromForm();
    if (shareholderType.id !== undefined) {
      this.subscribeToSaveResponse(this.shareholderTypeService.update(shareholderType));
    } else {
      this.subscribeToSaveResponse(this.shareholderTypeService.create(shareholderType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShareholderType>>): void {
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

  protected updateForm(shareholderType: IShareholderType): void {
    this.editForm.patchValue({
      id: shareholderType.id,
      shareHolderTypeCode: shareholderType.shareHolderTypeCode,
      shareHolderType: shareholderType.shareHolderType,
    });
  }

  protected createFromForm(): IShareholderType {
    return {
      ...new ShareholderType(),
      id: this.editForm.get(['id'])!.value,
      shareHolderTypeCode: this.editForm.get(['shareHolderTypeCode'])!.value,
      shareHolderType: this.editForm.get(['shareHolderType'])!.value,
    };
  }
}
