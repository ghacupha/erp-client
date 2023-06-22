import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeliveryNoteComponent } from '../list/delivery-note.component';
import { DeliveryNoteDetailComponent } from '../detail/delivery-note-detail.component';
import { DeliveryNoteUpdateComponent } from '../update/delivery-note-update.component';
import { DeliveryNoteRoutingResolveService } from './delivery-note-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const deliveryNoteRoute: Routes = [
  {
    path: '',
    component: DeliveryNoteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryNoteDetailComponent,
    resolve: {
      deliveryNote: DeliveryNoteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryNoteUpdateComponent,
    resolve: {
      deliveryNote: DeliveryNoteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryNoteUpdateComponent,
    resolve: {
      deliveryNote: DeliveryNoteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deliveryNoteRoute)],
  exports: [RouterModule],
})
export class DeliveryNoteRoutingModule {}
