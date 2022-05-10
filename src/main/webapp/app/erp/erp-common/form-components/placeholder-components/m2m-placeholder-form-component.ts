import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { PlaceholderSuggestionService } from '../../suggestion/placeholder-suggestion.service';

@Component({
  selector: 'jhi-m2m-placeholder-form-control',
  templateUrl: './m2m-dealer-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => M2MPlaceholderFormComponent),
      multi: true
    }
  ]
})
export class M2MPlaceholderFormComponent implements OnInit, ControlValueAccessor {

  @Input() inputValues: IPlaceholder[] = [];

  @Input() inputControlLabel = '';

  @Output() selectedValues: EventEmitter<IPlaceholder[]> = new EventEmitter<IPlaceholder[]>();

  minAccountLengthTerm = 3;
  valuesLoading = false;
  valueInputControl$ = new Subject<string>();
  valueLookUps$: Observable<IPlaceholder[]> = of([]);

  constructor(
    protected valueService: PlaceholderService,
    protected valueSuggestionService: PlaceholderSuggestionService
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
  writeValue(value: IPlaceholder[]): void {
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
