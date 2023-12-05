///
/// Erp System - Mark VIII No 3 (Hilkiah Series) Client 1.6.2
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
import { CardStateComponent } from './list/card-state.component';
import { CardStateDetailComponent } from './detail/card-state-detail.component';
import { CardStateUpdateComponent } from './update/card-state-update.component';
import { CardStateDeleteDialogComponent } from './delete/card-state-delete-dialog.component';
import { CardStateRoutingModule } from './route/card-state-routing.module';

@NgModule({
  imports: [SharedModule, CardStateRoutingModule],
  declarations: [CardStateComponent, CardStateDetailComponent, CardStateUpdateComponent, CardStateDeleteDialogComponent],
  entryComponents: [CardStateDeleteDialogComponent],
})
export class CardStateModule {}
