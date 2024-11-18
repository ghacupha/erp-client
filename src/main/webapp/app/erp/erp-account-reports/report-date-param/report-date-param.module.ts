import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ReportDateParameterComponent } from './report-date-parameter.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../core/auth/user-route-access.service';

const reportDateParam: Routes = [
  {
    path: '',
    component: ReportDateParameterComponent,
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(reportDateParam),
  ],
  declarations: [
    ReportDateParameterComponent,
  ],
  exports: [
    RouterModule
  ]
})
export class ReportDateParamModule {
}
