///
/// Erp System - Mark X No 1 (Jehoiada Series) Client 1.7.1
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
import { ManagementMemberTypeComponent } from './list/management-member-type.component';
import { ManagementMemberTypeDetailComponent } from './detail/management-member-type-detail.component';
import { ManagementMemberTypeUpdateComponent } from './update/management-member-type-update.component';
import { ManagementMemberTypeDeleteDialogComponent } from './delete/management-member-type-delete-dialog.component';
import { ManagementMemberTypeRoutingModule } from './route/management-member-type-routing.module';

@NgModule({
  imports: [SharedModule, ManagementMemberTypeRoutingModule],
  declarations: [
    ManagementMemberTypeComponent,
    ManagementMemberTypeDetailComponent,
    ManagementMemberTypeUpdateComponent,
    ManagementMemberTypeDeleteDialogComponent,
  ],
  entryComponents: [ManagementMemberTypeDeleteDialogComponent],
})
export class ManagementMemberTypeModule {}
