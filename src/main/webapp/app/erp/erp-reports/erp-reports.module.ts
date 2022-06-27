import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'report-template',
      data: {
        pageTitle: 'ERP | Report Template',
        authorities: ['ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./report-template/report-template.module')
        .then(m => m.ReportTemplateModule),
    },
    {
      path: 'pdf-report-requisition',
      data: {
        pageTitle: 'ERP | Report Requisition - PDF',
        authorities: ['ROLE_REPORT_ACCESSOR','ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./pdf-report-requisition/pdf-report-requisition.module')
        .then(m => m.PdfReportRequisitionModule),
    },
    {
      path: 'xlsx-report-requisition',
      data: {
        pageTitle: 'ERP | EXCEL Report Requisition',
        authorities: ['ROLE_REPORT_ACCESSOR','ROLE_REPORT_DESIGNER'],
      },
      loadChildren: () => import('./xlsx-report-requisition/xlsx-report-requisition.module')
        .then(m => m.XlsxReportRequisitionModule),
    },
    {
      path: 'report-requisition',
      data: {
        pageTitle: 'ERP | Report Requisition',
        authorities: ['ROLE_REPORT_ACCESSOR','ROLE_REPORT_DESIGNER'],
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
