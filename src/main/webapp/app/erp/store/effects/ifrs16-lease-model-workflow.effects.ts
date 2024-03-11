import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  ifrs16LeaseContractCopyWorkflowInitiatedFromList,
  ifrs16LeaseContractUpdateInstanceAcquiredFromBackend,
  ifrs16LeaseContractUpdateInstanceAcquisitionFromBackendFailed
} from '../actions/ifrs16-lease-model-update-status.actions';
import { IFRS16LeaseContractService } from '../../erp-leases/ifrs-16-lease-contract/service/ifrs-16-lease-contract.service';

@Injectable()
export class Ifrs16LeaseModelWorkflowEffects {

  copiedIfrs16LeaseModelWorkflowEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ifrs16LeaseContractCopyWorkflowInitiatedFromList),
      // eslint-disable-next-line arrow-body-style
      switchMap(action => {
          if (action.copiedInstance.id) {
            return this.ifrs16LeaseModelService.find(action.copiedInstance.id).pipe(
              map(backendResponse => ifrs16LeaseContractUpdateInstanceAcquiredFromBackend({ backendAcquiredInstance: backendResponse.body ?? action.copiedInstance })),
              catchError(err => of(ifrs16LeaseContractUpdateInstanceAcquisitionFromBackendFailed({ error: err })))
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
    protected ifrs16LeaseModelService: IFRS16LeaseContractService) {
  }
}
