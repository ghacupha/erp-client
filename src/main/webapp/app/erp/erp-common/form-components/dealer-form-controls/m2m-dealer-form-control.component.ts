import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { IDealer } from '../../../../entities/dealers/dealer/dealer.model';
import { concat, Observable, of, Subject } from 'rxjs';
import { DealerService } from '../../../../entities/dealers/dealer/service/dealer.service';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { DealerInputControlService } from './dealer-input-control.service';

@Component({
  selector: 'jhi-m2m-dealer-form-control',
  templateUrl: './m2m-dealer-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => M2MDealerFormControlComponent),
      multi: true
    }
  ]
})
export class M2MDealerFormControlComponent implements OnInit, ControlValueAccessor {

  // TODO Add logs and developer views to the component to aid in telemetry
  // TODO Create similar components for other entities
  // TODO Add self validation code via NG_VALIDATOR provider

  @Input() inputDealers: IDealer[] = [];

  @Input() inputControlLabel = '';

  @Output() dealerSelected: EventEmitter<IDealer[]> = new EventEmitter<IDealer[]>();

  minAccountLengthTerm = 3;
  dealersLoading = false;
  dealersInput$ = new Subject<string>();
  dealerLookups$: Observable<IDealer[]> = of([]);

  constructor(
    protected dealerService: DealerService,
    protected dealerInputControlService: DealerInputControlService
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
    this.dealerLookups$ = concat(
      of([]), // default items
      this.dealersInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.dealersLoading = true),
        switchMap(term => this.dealerInputControlService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.dealersLoading = false)
        ))
      )
    );
  }

  trackDealerByFn(item: IDealer): number {
    return item.id!;
  }

  /**
   * Replaces the array received from the parent with the one currently in view
   *
   * @param value
   */
  writeValue(value: IDealer[]): void {
    if (value.length !== 0) {
      this.inputDealers = value
    }
  }

  /**
   * Emits updated array to parent
   */
  getValues(): void {
    this.dealerSelected.emit(this.inputDealers);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
