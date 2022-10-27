import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessDocument } from '../business-document.model';

@Component({
  selector: 'jhi-business-document-detail',
  templateUrl: './business-document-detail.component.html',
})
export class BusinessDocumentDetailComponent implements OnInit {
  businessDocument: IBusinessDocument | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessDocument }) => {
      this.businessDocument = businessDocument;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
