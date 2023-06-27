import { SettlementService } from '../service/settlement.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { ISettlement, Settlement } from '../settlement.model';
import { mergeMap } from 'rxjs/operators';
// import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
// import { settlementCopyWorkflowInitiated } from '../../../store/actions/settlement-update-menu.actions';
import { settlementUpdateSelectedPayment } from '../../../store/selectors/settlement-update-menu-status.selectors';

@Injectable({ providedIn: 'root' })
export class SettlementCopyRoutingResolveService implements Resolve<ISettlement> {

  constructor(
    protected service: SettlementService,
    protected store: Store<State>,
    protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISettlement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      /* return this.service.find(id).pipe(
        mergeMap((settlement: HttpResponse<Settlement>) => {
          if (settlement.body) {
            this.store.dispatch(settlementCopyWorkflowInitiated({copiedSettlement: settlement.body }));
            return of(settlement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      ); */

      this.store.pipe(select(settlementUpdateSelectedPayment)).pipe(
        mergeMap((copiedSettlement: ISettlement) => of(copiedSettlement))
        );
    }
    return of(new Settlement());
    }
}
