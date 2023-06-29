import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ISettlement, Settlement } from '../settlement.model';
import { SettlementService } from '../service/settlement.service';
import { Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { settlementCreationWorkflowInitiatedEnRoute } from '../../../store/actions/settlement-update-menu.actions';

@Injectable({ providedIn: 'root' })
export class SettlementNewRoutingResolveService implements Resolve<ISettlement> {

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
            this.store.dispatch(settlementCreationWorkflowInitiatedEnRoute());
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
