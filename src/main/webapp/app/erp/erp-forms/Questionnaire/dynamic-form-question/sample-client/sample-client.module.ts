import { NgModule } from '@angular/core';
import { SampleClientComponent } from './sample-client.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';

/**
 * This test uses the base angular tutorial model for creating dynamic form
 */
@NgModule({
  declarations: [SampleClientComponent],
  imports: [
    DynamicFormModule,
    RouterModule.forRoot([
      {
        path: 'test/dynamic-form/test#1',
        data: { pageTitle: 'ERP | Dynamic Form Test' },
        component: SampleClientComponent
      }
    ]),
    SharedModule
  ],
  exports: [DynamicFormModule, SampleClientComponent]
})
export class SampleClientModule {
}
