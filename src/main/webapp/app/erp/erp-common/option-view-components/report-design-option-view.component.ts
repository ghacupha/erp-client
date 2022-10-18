///
/// Erp System - Mark III No 1 (Caleb Series) Client 0.1.9-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import { Component, Input } from '@angular/core';
import { IReportDesign } from '../../erp-reports/report-design/report-design.model';

@Component({
  selector: 'jhi-report-design-option-view',
  template: `
    id #: {{ item.id }} name: {{ item.designation }} designation: {{ item.catalogueNumber }}: {{ item.description }}
  `
})
export class ReportDesignOptionViewComponent {
  @Input() item: IReportDesign = {};
}