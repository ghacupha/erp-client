import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AmortizationRecurrenceFormService, AmortizationRecurrenceFormGroup } from './amortization-recurrence-form.service';
import { IAmortizationRecurrence } from '../amortization-recurrence.model';
import { AmortizationRecurrenceService } from '../service/amortization-recurrence.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IPrepaymentMapping } from 'app/entities/prepayment-mapping/prepayment-mapping.model';
import { PrepaymentMappingService } from 'app/entities/prepayment-mapping/service/prepayment-mapping.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { IDepreciationMethod } from 'app/entities/depreciation-method/depreciation-method.model';
import { DepreciationMethodService } from 'app/entities/depreciation-method/service/depreciation-method.service';
import { IPrepaymentAccount } from 'app/entities/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayment-account/service/prepayment-account.service';
import { recurrenceFrequency } from 'app/entities/enumerations/recurrence-frequency.model';

@Component({
  selector: 'jhi-amortization-recurrence-update',
  templateUrl: './amortization-recurrence-update.component.html',
})
export class AmortizationRecurrenceUpdateComponent implements OnInit {
  isSaving = false;
  amortizationRecurrence: IAmortizationRecurrence | null = null;
  recurrenceFrequencyValues = Object.keys(recurrenceFrequency);

  placeholdersSharedCollection: IPlaceholder[] = [];
  prepaymentMappingsSharedCollection: IPrepaymentMapping[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  depreciationMethodsSharedCollection: IDepreciationMethod[] = [];
  prepaymentAccountsSharedCollection: IPrepaymentAccount[] = [];

  editForm: AmortizationRecurrenceFormGroup = this.amortizationRecurrenceFormService.createAmortizationRecurrenceFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected amortizationRecurrenceService: AmortizationRecurrenceService,
    protected amortizationRecurrenceFormService: AmortizationRecurrenceFormService,
    protected placeholderService: PlaceholderService,
    protected prepaymentMappingService: PrepaymentMappingService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected depreciationMethodService: DepreciationMethodService,
    protected prepaymentAccountService: PrepaymentAccountService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  comparePrepaymentMapping = (o1: IPrepaymentMapping | null, o2: IPrepaymentMapping | null): boolean =>
    this.prepaymentMappingService.comparePrepaymentMapping(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareDepreciationMethod = (o1: IDepreciationMethod | null, o2: IDepreciationMethod | null): boolean =>
    this.depreciationMethodService.compareDepreciationMethod(o1, o2);

  comparePrepaymentAccount = (o1: IPrepaymentAccount | null, o2: IPrepaymentAccount | null): boolean =>
    this.prepaymentAccountService.comparePrepaymentAccount(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ amortizationRecurrence }) => {
      this.amortizationRecurrence = amortizationRecurrence;
      if (amortizationRecurrence) {
        this.updateForm(amortizationRecurrence);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('erpSystemApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const amortizationRecurrence = this.amortizationRecurrenceFormService.getAmortizationRecurrence(this.editForm);
    if (amortizationRecurrence.id !== null) {
      this.subscribeToSaveResponse(this.amortizationRecurrenceService.update(amortizationRecurrence));
    } else {
      this.subscribeToSaveResponse(this.amortizationRecurrenceService.create(amortizationRecurrence));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAmortizationRecurrence>>): void {
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

  protected updateForm(amortizationRecurrence: IAmortizationRecurrence): void {
    this.amortizationRecurrence = amortizationRecurrence;
    this.amortizationRecurrenceFormService.resetForm(this.editForm, amortizationRecurrence);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(amortizationRecurrence.placeholders ?? [])
    );
    this.prepaymentMappingsSharedCollection = this.prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing<IPrepaymentMapping>(
      this.prepaymentMappingsSharedCollection,
      ...(amortizationRecurrence.parameters ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(amortizationRecurrence.applicationParameters ?? [])
      );
    this.depreciationMethodsSharedCollection =
      this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing<IDepreciationMethod>(
        this.depreciationMethodsSharedCollection,
        amortizationRecurrence.depreciationMethod
      );
    this.prepaymentAccountsSharedCollection = this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
      this.prepaymentAccountsSharedCollection,
      amortizationRecurrence.prepaymentAccount
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
            ...(this.amortizationRecurrence?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.prepaymentMappingService
      .query()
      .pipe(map((res: HttpResponse<IPrepaymentMapping[]>) => res.body ?? []))
      .pipe(
        map((prepaymentMappings: IPrepaymentMapping[]) =>
          this.prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing<IPrepaymentMapping>(
            prepaymentMappings,
            ...(this.amortizationRecurrence?.parameters ?? [])
          )
        )
      )
      .subscribe((prepaymentMappings: IPrepaymentMapping[]) => (this.prepaymentMappingsSharedCollection = prepaymentMappings));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.amortizationRecurrence?.applicationParameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.depreciationMethodService
      .query()
      .pipe(map((res: HttpResponse<IDepreciationMethod[]>) => res.body ?? []))
      .pipe(
        map((depreciationMethods: IDepreciationMethod[]) =>
          this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing<IDepreciationMethod>(
            depreciationMethods,
            this.amortizationRecurrence?.depreciationMethod
          )
        )
      )
      .subscribe((depreciationMethods: IDepreciationMethod[]) => (this.depreciationMethodsSharedCollection = depreciationMethods));

    this.prepaymentAccountService
      .query()
      .pipe(map((res: HttpResponse<IPrepaymentAccount[]>) => res.body ?? []))
      .pipe(
        map((prepaymentAccounts: IPrepaymentAccount[]) =>
          this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
            prepaymentAccounts,
            this.amortizationRecurrence?.prepaymentAccount
          )
        )
      )
      .subscribe((prepaymentAccounts: IPrepaymentAccount[]) => (this.prepaymentAccountsSharedCollection = prepaymentAccounts));
  }
}
