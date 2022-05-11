import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { ISettlement } from '../../../erp-settlements/settlement/settlement.model';
import { SettlementService } from '../../../erp-settlements/settlement/service/settlement.service';
import { SettlementSuggestionService } from '../../suggestion/settlement-suggestion.service';


@Component({
  selector: 'jhi-m2m-settlement-form-control',
  templateUrl: './m2m-settlement-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => M2MSettlementFormControlComponent),
      multi: true
    }
  ]
})
export class M2MSettlementFormControlComponent implements OnInit, ControlValueAccessor {

  @Input() inputValues: ISettlement[] = [];

  @Input() inputControlLabel = '';

  @Output() valueSelected: EventEmitter<ISettlement[]> = new EventEmitter<ISettlement[]>();

  minAccountLengthTerm = 3;
  valuesLoading = false;
  valueInputControl$ = new Subject<string>();
  valueLookups$: Observable<ISettlement[]> = of([]);

  constructor(
    protected valueService: SettlementService,
    protected valueSuggestionService: SettlementSuggestionService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {
    this.getValues();
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  ngOnInit(): void {
    this.loadDealers();
  }

  loadDealers(): void {
    this.valueLookups$ = concat(
      of([]), // default items
      this.valueInputControl$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.valuesLoading = true),
        switchMap(term => this.valueSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.valuesLoading = false)
        ))
      )
    );
  }

  trackValueByFn(item: any): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item.id!;
  }

  /**
   * Replaces the array received from the parent with the one currently in view
   *
   * @param value
   */
  writeValue(value: ISettlement[]): void {
    if (value.length !== 0) {
      this.inputValues = value
    }
  }

  /**
   * Emits updated array to parent
   */
  getValues(): void {
    this.valueSelected.emit(this.inputValues);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
