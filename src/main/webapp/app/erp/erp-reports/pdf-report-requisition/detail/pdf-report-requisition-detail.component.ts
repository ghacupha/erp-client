import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPdfReportRequisition } from '../pdf-report-requisition.model';
import { DataUtils } from '../../../../core/util/data-util.service';

@Component({
  selector: 'jhi-pdf-report-requisition-detail',
  templateUrl: './pdf-report-requisition-detail.component.html',
})
export class PdfReportRequisitionDetailComponent implements OnInit {
  contentType = "application/pdf";

  pdfReportRequisition: IPdfReportRequisition | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pdfReportRequisition }) => {
      this.pdfReportRequisition = pdfReportRequisition;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    // todo reconstitute the file, unlock with userPassword and convert back into base64String representation
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
