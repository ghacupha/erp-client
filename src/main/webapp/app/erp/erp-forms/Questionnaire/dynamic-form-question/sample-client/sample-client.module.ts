///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.2
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { NgModule } from '@angular/core';
import { SampleClientComponent } from './sample-client.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import {  Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { SampleClientTest2Component } from './sample-client-test2.component';
import { SampleClientTest3Component } from './sample-client-test3.component';
import { SampleClientTest3ResolverService } from './sample-client-test3-resolver.service';

const routes: Route[] = [
  {
    path: 'test/dynamic-form/test-1',
    data: { pageTitle: 'ERP | Dynamic Form Test' },
    component: SampleClientComponent
  },
  {
    path: 'test/dynamic-form/test-2',
    data: { pageTitle: 'ERP | Dynamic Form Test 2' },
    component: SampleClientTest2Component
  },
  {
    path: 'test/dynamic-form/test-3',
    data: { pageTitle: 'ERP | Dynamic Form Test 3' },
    component: SampleClientTest3Component,
    resolve: { serverQuestions: SampleClientTest3ResolverService }
  }
]

/**
 * This test uses the base angular tutorial model for creating dynamic form
 */
@NgModule({
  declarations: [
    SampleClientComponent,
    SampleClientTest2Component,
    SampleClientTest3Component
  ],
  imports: [
    DynamicFormModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [
    DynamicFormModule,
    SampleClientComponent,
    SampleClientTest2Component,
    SampleClientTest3Component
  ],
  providers: [SampleClientTest3ResolverService]
})
export class SampleClientModule {
}
