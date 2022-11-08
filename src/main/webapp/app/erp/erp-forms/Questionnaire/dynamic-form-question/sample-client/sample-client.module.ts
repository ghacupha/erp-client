import { NgModule } from '@angular/core';
import { SampleClientComponent } from './sample-client.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [SampleClientComponent],
  imports: [
    DynamicFormModule,
    RouterModule.forRoot([
      {
        path: 'test/dynamic-form',
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
