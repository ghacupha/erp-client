import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { DealerInputControlService } from './dealer-input-control.service';
import { IDealer } from '../../models/dealer.model';
import { DealerService } from '../../services/dealer.service';

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
export class M21DealerFormControlComponent implements OnInit, ControlValueAccessor {

  @Input() inputDealer: IDealer = {}

  @Input() inputControlLabel = '';

  @Output() dealerSelected: EventEmitter<IDealer> = new EventEmitter<IDealer>();

  minAccountLengthTerm = 3;
  dealersLoading = false;
  dealersInput$ = new Subject<string>();
  dealerLookups$: Observable<IDealer[]> = of([]);

  constructor(
    protected dealerService: DealerService,
    protected dealerInputControlService: DealerInputControlService
  ) {}

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
      ),
    );
  }

  trackDealerByFn(item: IDealer): number {
    return item.id!;
  }

  writeValue(value: IDealer): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {
      this.inputDealer = value;
    }
  }

  getValues(): void {
    this.dealerSelected.emit(this.inputDealer);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
