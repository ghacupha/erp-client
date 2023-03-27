///
/// Erp System - Mark III No 11 (Caleb Series) Client 1.1.1
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
import { SharedModule } from 'app/shared/shared.module';
import { CountyCodeComponent } from './list/county-code.component';
import { CountyCodeDetailComponent } from './detail/county-code-detail.component';
import { CountyCodeUpdateComponent } from './update/county-code-update.component';
import { CountyCodeDeleteDialogComponent } from './delete/county-code-delete-dialog.component';
import { CountyCodeRoutingModule } from './route/county-code-routing.module';

@NgModule({
  imports: [SharedModule, CountyCodeRoutingModule],
  declarations: [CountyCodeComponent, CountyCodeDetailComponent, CountyCodeUpdateComponent, CountyCodeDeleteDialogComponent],
  entryComponents: [CountyCodeDeleteDialogComponent],
})
export class CountyCodeModule {}