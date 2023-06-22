import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AmortizationSequenceFormService, AmortizationSequenceFormGroup } from './amortization-sequence-form.service';
import { IAmortizationSequence } from '../amortization-sequence.model';
import { AmortizationSequenceService } from '../service/amortization-sequence.service';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayments/prepayment-account/service/prepayment-account.service';
import { IAmortizationRecurrence } from 'app/entities/prepayments/amortization-recurrence/amortization-recurrence.model';
import { AmortizationRecurrenceService } from 'app/entities/prepayments/amortization-recurrence/service/amortization-recurrence.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { PrepaymentMappingService } from 'app/entities/prepayments/prepayment-mapping/service/prepayment-mapping.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

@Component({
  selector: 'jhi-amortization-sequence-update',
  templateUrl: './amortization-sequence-update.component.html',
})
export class AmortizationSequenceUpdateComponent implements OnInit {
  isSaving = false;
  amortizationSequence: IAmortizationSequence | null = null;

  prepaymentAccountsSharedCollection: IPrepaymentAccount[] = [];
  amortizationRecurrencesSharedCollection: IAmortizationRecurrence[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  prepaymentMappingsSharedCollection: IPrepaymentMapping[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm: AmortizationSequenceFormGroup = this.amortizationSequenceFormService.createAmortizationSequenceFormGroup();

  constructor(
    protected amortizationSequenceService: AmortizationSequenceService,
    protected amortizationSequenceFormService: AmortizationSequenceFormService,
    protected prepaymentAccountService: PrepaymentAccountService,
    protected amortizationRecurrenceService: AmortizationRecurrenceService,
    protected placeholderService: PlaceholderService,
    protected prepaymentMappingService: PrepaymentMappingService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePrepaymentAccount = (o1: IPrepaymentAccount | null, o2: IPrepaymentAccount | null): boolean =>
    this.prepaymentAccountService.comparePrepaymentAccount(o1, o2);

  compareAmortizationRecurrence = (o1: IAmortizationRecurrence | null, o2: IAmortizationRecurrence | null): boolean =>
    this.amortizationRecurrenceService.compareAmortizationRecurrence(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  comparePrepaymentMapping = (o1: IPrepaymentMapping | null, o2: IPrepaymentMapping | null): boolean =>
    this.prepaymentMappingService.comparePrepaymentMapping(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ amortizationSequence }) => {
      this.amortizationSequence = amortizationSequence;
      if (amortizationSequence) {
        this.updateForm(amortizationSequence);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const amortizationSequence = this.amortizationSequenceFormService.getAmortizationSequence(this.editForm);
    if (amortizationSequence.id !== null) {
      this.subscribeToSaveResponse(this.amortizationSequenceService.update(amortizationSequence));
    } else {
      this.subscribeToSaveResponse(this.amortizationSequenceService.create(amortizationSequence));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAmortizationSequence>>): void {
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

  protected updateForm(amortizationSequence: IAmortizationSequence): void {
    this.amortizationSequence = amortizationSequence;
    this.amortizationSequenceFormService.resetForm(this.editForm, amortizationSequence);

    this.prepaymentAccountsSharedCollection = this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
      this.prepaymentAccountsSharedCollection,
      amortizationSequence.prepaymentAccount
    );
    this.amortizationRecurrencesSharedCollection =
      this.amortizationRecurrenceService.addAmortizationRecurrenceToCollectionIfMissing<IAmortizationRecurrence>(
        this.amortizationRecurrencesSharedCollection,
        amortizationSequence.amortizationRecurrence
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(amortizationSequence.placeholders ?? [])
    );
    this.prepaymentMappingsSharedCollection = this.prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing<IPrepaymentMapping>(
      this.prepaymentMappingsSharedCollection,
      ...(amortizationSequence.prepaymentMappings ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(amortizationSequence.applicationParameters ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.prepaymentAccountService
      .query()
      .pipe(map((res: HttpResponse<IPrepaymentAccount[]>) => res.body ?? []))
      .pipe(
        map((prepaymentAccounts: IPrepaymentAccount[]) =>
          this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
            prepaymentAccounts,
            this.amortizationSequence?.prepaymentAccount
          )
        )
      )
      .subscribe((prepaymentAccounts: IPrepaymentAccount[]) => (this.prepaymentAccountsSharedCollection = prepaymentAccounts));

    this.amortizationRecurrenceService
      .query()
      .pipe(map((res: HttpResponse<IAmortizationRecurrence[]>) => res.body ?? []))
      .pipe(
        map((amortizationRecurrences: IAmortizationRecurrence[]) =>
          this.amortizationRecurrenceService.addAmortizationRecurrenceToCollectionIfMissing<IAmortizationRecurrence>(
            amortizationRecurrences,
            this.amortizationSequence?.amortizationRecurrence
          )
        )
      )
      .subscribe(
        (amortizationRecurrences: IAmortizationRecurrence[]) => (this.amortizationRecurrencesSharedCollection = amortizationRecurrences)
      );

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.amortizationSequence?.placeholders ?? [])
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
            ...(this.amortizationSequence?.prepaymentMappings ?? [])
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
            ...(this.amortizationSequence?.applicationParameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }
}
