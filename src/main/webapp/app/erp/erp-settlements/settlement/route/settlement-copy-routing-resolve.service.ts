import { SettlementService } from '../service/settlement.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { ISettlement, Settlement } from '../settlement.model';
import { flatMap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import { settlementCopyWorkflowInitiatedEnRoute } from '../../../store/actions/settlement-update-menu.actions';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SettlementCopyRoutingResolveService implements Resolve<ISettlement> {

  constructor(
    protected service: SettlementService,
    protected store: Store<State>,
    protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISettlement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((settlement: HttpResponse<Settlement>) => {
          if (settlement.body) {
            this.store.dispatch(settlementCopyWorkflowInitiatedEnRoute({ copiedSettlement: settlement.body }));
            return of(settlement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Settlement());
  }
}
