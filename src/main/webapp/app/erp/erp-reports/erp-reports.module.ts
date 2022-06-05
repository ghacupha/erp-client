import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'report-template',
      data: { pageTitle: 'ERP | Report Template' },
      loadChildren: () => import('./report-template/report-template.module')
        .then(m => m.ReportTemplateModule),
    },
    {
      path: 'pdf-report-requisition',
      data: { pageTitle: 'ERP | Report Requisition - PDF' },
      loadChildren: () => import('./pdf-report-requisition/pdf-report-requisition.module')
        .then(m => m.PdfReportRequisitionModule),
    },
    {
      path: 'xlsx-report-requisition',
      data: { pageTitle: 'ERP | EXCEL Report Requisition' },
      loadChildren: () => import('./xlsx-report-requisition/xlsx-report-requisition.module')
        .then(m => m.XlsxReportRequisitionModule),
    },
  ])
  ]
})
export class ErpReportsModule {}
