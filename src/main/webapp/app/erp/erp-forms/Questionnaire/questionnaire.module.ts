import { NgModule } from '@angular/core';
import { DynamicFormModule } from './dynamic-form-question/dynamic-form/dynamic-form.module';

/**
 * This module constructs and defines dynamic form-groups using data specified
 * from the QuestionBase repository
 */
@NgModule({
  imports: [DynamicFormModule],
  exports: [DynamicFormModule]
})
export class QuestionnaireModule {}
