///
/// Erp System - Mark III No 16 (Caleb Series) Client 1.3.9
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
import { LeaseModelMetadataComponent } from './list/lease-model-metadata.component';
import { LeaseModelMetadataDetailComponent } from './detail/lease-model-metadata-detail.component';
import { LeaseModelMetadataUpdateComponent } from './update/lease-model-metadata-update.component';
import { LeaseModelMetadataDeleteDialogComponent } from './delete/lease-model-metadata-delete-dialog.component';
import { LeaseModelMetadataRoutingModule } from './route/lease-model-metadata-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, LeaseModelMetadataRoutingModule, ErpCommonModule],
  declarations: [
    LeaseModelMetadataComponent,
    LeaseModelMetadataDetailComponent,
    LeaseModelMetadataUpdateComponent,
    LeaseModelMetadataDeleteDialogComponent,
  ],
  entryComponents: [LeaseModelMetadataDeleteDialogComponent],
})
export class LeaseModelMetadataModule {}
