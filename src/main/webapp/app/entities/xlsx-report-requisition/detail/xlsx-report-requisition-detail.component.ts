import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataUtils } from 'app/core/util/data-util.service';

import { IXlsxReportRequisition } from '../xlsx-report-requisition.model';

@Component({
  selector: 'jhi-xlsx-report-requisition-detail',
  templateUrl: './xlsx-report-requisition-detail.component.html',
})
export class XlsxReportRequisitionDetailComponent implements OnInit {
  xlsxReportRequisition: IXlsxReportRequisition | null = null;
  
  contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ xlsxReportRequisition }) => {
      this.xlsxReportRequisition = xlsxReportRequisition;
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
