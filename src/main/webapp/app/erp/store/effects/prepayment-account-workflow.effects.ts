import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  prepaymentAccountCopyWorkflowInitiatedFromList,
  prepaymentAccountUpdateInstanceAcquiredFromBackend,
  prepaymentAccountUpdateInstanceAcquisitionFromBackendFailed
} from '../actions/prepayment-account-update-status.actions';
import { PrepaymentAccountService } from '../../erp-prepayments/prepayment-account/service/prepayment-account.service';

@Injectable()
export class PrepaymentAccountWorkflowEffects {

  copiedPrepaymentAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prepaymentAccountCopyWorkflowInitiatedFromList),
      // eslint-disable-next-line arrow-body-style
      switchMap(action => {
          if (action.copiedInstance.id) {
            return this.prepaymentAccountService.find(action.copiedInstance.id).pipe(
              map(backendResponse => prepaymentAccountUpdateInstanceAcquiredFromBackend({ backendAcquiredInstance: backendResponse.body ?? action.copiedInstance })),
              catchError(err => of(prepaymentAccountUpdateInstanceAcquisitionFromBackendFailed({ error: err })))
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
    protected prepaymentAccountService: PrepaymentAccountService) {
  }
}
