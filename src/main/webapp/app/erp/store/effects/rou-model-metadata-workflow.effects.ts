import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  rouMetadataCopyWorkflowInitiatedFromList,
  rouMetadataUpdateInstanceAcquiredFromBackend,
  rouMetadataUpdateInstanceAcquisitionFromBackendFailed
} from '../actions/rou-model-metadata-update-status.actions';
import { RouModelMetadataService } from '../../erp-leases/rou-model-metadata/service/rou-model-metadata.service';

@Injectable()
export class RouModelMetadataWorkflowEffects {

  copiedRouModelWorkflowEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rouMetadataCopyWorkflowInitiatedFromList),
      // eslint-disable-next-line arrow-body-style
      switchMap(action => {
          if (action.copiedInstance.id) {
            return this.rouModelMetadataService.find(action.copiedInstance.id).pipe(
              map(backendResponse => rouMetadataUpdateInstanceAcquiredFromBackend({ backendAcquiredInstance: backendResponse.body ?? action.copiedInstance })),
              catchError(err => of(rouMetadataUpdateInstanceAcquisitionFromBackendFailed({ error: err })))
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
    protected rouModelMetadataService: RouModelMetadataService) {
  }
}
