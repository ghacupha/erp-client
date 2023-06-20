import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TaxRuleFormService, TaxRuleFormGroup } from './tax-rule-form.service';
import { ITaxRule } from '../tax-rule.model';
import { TaxRuleService } from '../service/tax-rule.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-tax-rule-update',
  templateUrl: './tax-rule-update.component.html',
})
export class TaxRuleUpdateComponent implements OnInit {
  isSaving = false;
  taxRule: ITaxRule | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: TaxRuleFormGroup = this.taxRuleFormService.createTaxRuleFormGroup();

  constructor(
    protected taxRuleService: TaxRuleService,
    protected taxRuleFormService: TaxRuleFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taxRule }) => {
      this.taxRule = taxRule;
      if (taxRule) {
        this.updateForm(taxRule);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taxRule = this.taxRuleFormService.getTaxRule(this.editForm);
    if (taxRule.id !== null) {
      this.subscribeToSaveResponse(this.taxRuleService.update(taxRule));
    } else {
      this.subscribeToSaveResponse(this.taxRuleService.create(taxRule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaxRule>>): void {
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

  protected updateForm(taxRule: ITaxRule): void {
    this.taxRule = taxRule;
    this.taxRuleFormService.resetForm(this.editForm, taxRule);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(taxRule.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(placeholders, ...(this.taxRule?.placeholders ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
