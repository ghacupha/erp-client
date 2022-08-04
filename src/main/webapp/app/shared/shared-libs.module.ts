import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [NgSelectModule, NgbModule, FormsModule, CommonModule, InfiniteScrollModule, FontAwesomeModule, ReactiveFormsModule],
})
export class SharedLibsModule {}
