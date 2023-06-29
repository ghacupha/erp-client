import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  settlementCopyWorkflowInitiatedFromList,
  settlementUpdateInstanceAcquiredFromBackend, settlementUpdateInstanceAcquisitionFromBackendFailed
} from '../actions/settlement-update-menu.actions';
import { SettlementService } from '../../erp-settlements/settlement/service/settlement.service';

@Injectable()
export class SettlementUpdatesEffects {

  copiedSettlementEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settlementCopyWorkflowInitiatedFromList),
      // eslint-disable-next-line arrow-body-style
      switchMap(action => {
          if (action.copiedSettlement.id) {
            return this.settlementService.find(action.copiedSettlement.id).pipe(
              map(backendResponse => settlementUpdateInstanceAcquiredFromBackend({ backendAcquiredSettlement: backendResponse.body ?? action.copiedSettlement })),
              catchError(err => of(settlementUpdateInstanceAcquisitionFromBackendFailed({ error: err })))
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
    protected settlementService: SettlementService) {
  }
}
