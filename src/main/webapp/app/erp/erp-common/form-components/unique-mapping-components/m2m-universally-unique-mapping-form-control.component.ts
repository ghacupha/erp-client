import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { UniversallyUniqueMappingSuggestionService } from '../../suggestion/universally-unique-mapping-suggestion.service';

/**
 * Service to fetch suggestion values that coincide with the search terms input by the user
 * at any form controls that fills an object of the UUM entity
 */
@Component({
  selector: 'jhi-m2m-universally-unique-mapping-form-control',
  templateUrl: './m2m-universally-unique-mapping-form-control.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => M2mUniversallyUniqueMappingFormControlComponent),
      multi: true
    }
  ]
})
export class M2mUniversallyUniqueMappingFormControlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() inputValues: IUniversallyUniqueMapping[] = [];

  @Input() inputControlLabel = '';

  @Output() selectedValues: EventEmitter<IUniversallyUniqueMapping[]> = new EventEmitter<IUniversallyUniqueMapping[]>();

  minAccountLengthTerm = 3;
  valuesLoading = false;
  valueInputControl$ = new Subject<string>();
  valueLookUps$: Observable<IUniversallyUniqueMapping[]> = of([]);

  constructor(
    protected valueService: UniversallyUniqueMappingService,
    protected valueSuggestionService: UniversallyUniqueMappingSuggestionService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {
    this.getValues();
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  ngOnInit(): void {
    this.loadValues();
  }

  ngOnDestroy(): void {

    this.valueLookUps$ = of([]);
    this.inputValues = [];
  }

  loadValues(): void {
    this.valueLookUps$ = concat(
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

  trackValuesByFn(item: any): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item.id!;
  }

  /**
   * Replaces the array received from the parent with the one currently in view
   *
   * @param value
   */
  writeValue(value: IUniversallyUniqueMapping[]): void {
    if (value.length !== 0) {
      this.inputValues = value
    }
  }

  /**
   * Emits updated array to parent
   */
  getValues(): void {
    this.selectedValues.emit(this.inputValues);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
