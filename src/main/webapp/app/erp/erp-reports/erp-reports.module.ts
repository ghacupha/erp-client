///
/// Erp System - Mark VI No 2 (Phoebe Series) Client 1.5.3
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
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'report-template',
      data: {
        pageTitle: 'ERP | Report Template',
        authorities: ['ROLE_DEV','ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./report-template/report-template.module')
        .then(m => m.ReportTemplateModule),
    },
    {
      path: 'report-design',
      data: {
        pageTitle: 'ERP | Report Design',
        authorities: [],
      },
      loadChildren: () => import('./report-design/report-design.module')
        .then(m => m.ReportDesignModule),
    },
    {
      path: 'report-status',
      data: {
        pageTitle: 'ERP | Report Status',
        authorities: [],
      },
      loadChildren: () => import('./report-status/report-status.module')
        .then(m => m.ReportStatusModule),
    },
    {
      path: 'pdf-report-requisition',
      data: {
        pageTitle: 'ERP | Report Requisition - PDF',
        authorities: ['ROLE_DEV','ROLE_REPORT_ACCESSOR','ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./pdf-report-requisition/pdf-report-requisition.module')
        .then(m => m.PdfReportRequisitionModule),
    },
    {
      path: 'xlsx-report-requisition',
      data: {
        pageTitle: 'ERP | EXCEL Report Requisition',
        authorities: ['ROLE_DEV','ROLE_REPORT_ACCESSOR','ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./xlsx-report-requisition/xlsx-report-requisition.module')
        .then(m => m.XlsxReportRequisitionModule),
    },{
      path: 'excel-report-export',
      data: {
        pageTitle: 'ERP | Excel Export',
        authorities: ['ROLE_DEV','ROLE_REPORT_ACCESSOR','ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./excel-report-export/excel-report-export.module')
        .then(m => m.ExcelReportExportModule),
    },
    {
      path: 'report-requisition',
      data: {
        pageTitle: 'ERP | Report Requisition',
        authorities: ['ROLE_DEV','ROLE_REPORT_ACCESSOR','ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./report-requisition/report-requisition.module')
        .then(m => m.ReportRequisitionModule),
    },
    {
      path: 'report-content-type',
      data: {
        pageTitle: 'ERP | Report Content Type',
        authorities: ['ROLE_DEV'],
      },
      loadChildren: () => import('./report-content-type/report-content-type.module')
        .then(m => m.ReportContentTypeModule),
    },
    {
      path: 'system-content-type',
      data: {
        pageTitle: 'ERP | System Content Type',
        authorities: ['ROLE_DEV'],
      },
      loadChildren: () => import('./system-content-type/system-content-type.module')
        .then(m => m.SystemContentTypeModule),
    },
  ])
  ]
})
export class ErpReportsModule {}
