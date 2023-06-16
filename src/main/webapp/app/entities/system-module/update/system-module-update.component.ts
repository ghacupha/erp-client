import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SystemModuleFormService, SystemModuleFormGroup } from './system-module-form.service';
import { ISystemModule } from '../system-module.model';
import { SystemModuleService } from '../service/system-module.service';

@Component({
  selector: 'jhi-system-module-update',
  templateUrl: './system-module-update.component.html',
})
export class SystemModuleUpdateComponent implements OnInit {
  isSaving = false;
  systemModule: ISystemModule | null = null;

  editForm: SystemModuleFormGroup = this.systemModuleFormService.createSystemModuleFormGroup();

  constructor(
    protected systemModuleService: SystemModuleService,
    protected systemModuleFormService: SystemModuleFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ systemModule }) => {
      this.systemModule = systemModule;
      if (systemModule) {
        this.updateForm(systemModule);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const systemModule = this.systemModuleFormService.getSystemModule(this.editForm);
    if (systemModule.id !== null) {
      this.subscribeToSaveResponse(this.systemModuleService.update(systemModule));
    } else {
      this.subscribeToSaveResponse(this.systemModuleService.create(systemModule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemModule>>): void {
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

  protected updateForm(systemModule: ISystemModule): void {
    this.systemModule = systemModule;
    this.systemModuleFormService.resetForm(this.editForm, systemModule);
  }
}
