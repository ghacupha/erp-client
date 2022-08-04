import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { DealerInputControlService } from './dealer-input-control.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';

@Component({
  selector: 'jhi-m21-dealer-form-control',
  templateUrl: './m21-dealer-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => M21DealerFormControlComponent),
      multi: true
    }
  ]
})
export class M21DealerFormControlComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() inputValue: IDealer = {}

  @Input() inputControlLabel = '';

  @Output() valueSelected: EventEmitter<IDealer> = new EventEmitter<IDealer>();

  minAccountLengthTerm = 3;
  valuesLoading = false;
  valueControlInput$ = new Subject<string>();
  valueLookUps$: Observable<IDealer[]> = of([]);

  constructor(
    protected valueSuggestionService: DealerInputControlService
  ) {}

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
    this.inputValue = {}
  }

  loadValues(): void {
    this.valueLookUps$ = concat(
      of([]), // default items
      this.valueControlInput$.pipe(
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
      ),
    );
  }

  trackValueByFn(item: any): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item.id!;
  }

  writeValue(value: IDealer): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {
      this.inputValue = value;
    }
  }

  getValues(): void {
    this.valueSelected.emit(this.inputValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
