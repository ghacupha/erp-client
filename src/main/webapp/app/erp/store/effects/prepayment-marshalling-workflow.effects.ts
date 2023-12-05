import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PrepaymentMarshallingService } from '../../erp-prepayments/prepayment-marshalling/service/prepayment-marshalling.service';
import {
  prepaymentMarshallingCopyWorkflowInitiatedFromList,
  prepaymentMarshallingUpdateInstanceAcquiredFromBackend,
  prepaymentMarshallingUpdateInstanceAcquisitionFromBackendFailed
} from '../actions/prepayment-marshalling-update-status.actions';

@Injectable()
export class PrepaymentAccountWorkflowEffects {

  copiedPrepaymentMarshallingEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prepaymentMarshallingCopyWorkflowInitiatedFromList),
      // eslint-disable-next-line arrow-body-style
      switchMap(action => {
          if (action.copiedInstance.id) {
            return this.prepaymentMarshallingService.find(action.copiedInstance.id).pipe(
              map(backendResponse => prepaymentMarshallingUpdateInstanceAcquiredFromBackend({ backendAcquiredInstance: backendResponse.body ?? action.copiedInstance })),
              catchError(err => of(prepaymentMarshallingUpdateInstanceAcquisitionFromBackendFailed({ error: err })))
            );
          } else {
            return of(action)
          }
        }
      )
    )
  );

  constructor(
    protected actions$: Actions,
    protected prepaymentMarshallingService: PrepaymentMarshallingService) {
  }
}
