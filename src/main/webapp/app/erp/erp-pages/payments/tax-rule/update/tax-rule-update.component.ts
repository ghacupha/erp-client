import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITaxRule, TaxRule } from '../../../../erp-common/models/tax-rule.model';
import { TaxRuleService } from '../../../../erp-common/services/tax-rule.service';
import { IPlaceholder } from 'app/erp/erp-common/models/placeholder.model';
import { PlaceholderService } from 'app/erp/erp-common/services/placeholder.service';

@Component({
  selector: 'jhi-tax-rule-update',
  templateUrl: './tax-rule-update.component.html',
})
export class TaxRuleUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    telcoExciseDuty: [],
    valueAddedTax: [],
    withholdingVAT: [],
    withholdingTaxConsultancy: [],
    withholdingTaxRent: [],
    cateringLevy: [],
    serviceCharge: [],
    withholdingTaxImportedService: [],
    placeholders: [],
  });

  constructor(
    protected taxRuleService: TaxRuleService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taxRule }) => {
      this.updateForm(taxRule);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taxRule = this.createFromForm();
    if (taxRule.id !== undefined) {
      this.subscribeToSaveResponse(this.taxRuleService.update(taxRule));
    } else {
      this.subscribeToSaveResponse(this.taxRuleService.create(taxRule));
    }
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  getSelectedPlaceholder(option: IPlaceholder, selectedVals?: IPlaceholder[]): IPlaceholder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaxRule>>): void {
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

  protected updateForm(taxRule: ITaxRule): void {
    this.editForm.patchValue({
      id: taxRule.id,
      telcoExciseDuty: taxRule.telcoExciseDuty,
      valueAddedTax: taxRule.valueAddedTax,
      withholdingVAT: taxRule.withholdingVAT,
      withholdingTaxConsultancy: taxRule.withholdingTaxConsultancy,
      withholdingTaxRent: taxRule.withholdingTaxRent,
      cateringLevy: taxRule.cateringLevy,
      serviceCharge: taxRule.serviceCharge,
      withholdingTaxImportedService: taxRule.withholdingTaxImportedService,
      placeholders: taxRule.placeholders,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
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
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }

  protected createFromForm(): ITaxRule {
    return {
      ...new TaxRule(),
      id: this.editForm.get(['id'])!.value,
      telcoExciseDuty: this.editForm.get(['telcoExciseDuty'])!.value,
      valueAddedTax: this.editForm.get(['valueAddedTax'])!.value,
      withholdingVAT: this.editForm.get(['withholdingVAT'])!.value,
      withholdingTaxConsultancy: this.editForm.get(['withholdingTaxConsultancy'])!.value,
      withholdingTaxRent: this.editForm.get(['withholdingTaxRent'])!.value,
      cateringLevy: this.editForm.get(['cateringLevy'])!.value,
      serviceCharge: this.editForm.get(['serviceCharge'])!.value,
      withholdingTaxImportedService: this.editForm.get(['withholdingTaxImportedService'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
