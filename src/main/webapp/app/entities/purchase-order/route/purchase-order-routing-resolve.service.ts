import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPurchaseOrder } from '../purchase-order.model';
import { PurchaseOrderService } from '../service/purchase-order.service';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderRoutingResolveService implements Resolve<IPurchaseOrder | null> {
  constructor(protected service: PurchaseOrderService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseOrder | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((purchaseOrder: HttpResponse<IPurchaseOrder>) => {
          if (purchaseOrder.body) {
            return of(purchaseOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
