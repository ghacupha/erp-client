import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAgencyNotice } from '../../../erp/erp-common/models/agency-notice.model';

@Component({
  selector: 'jhi-agency-notice-detail',
  templateUrl: './agency-notice-detail.component.html',
})
export class AgencyNoticeDetailComponent implements OnInit {
  agencyNotice: IAgencyNotice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agencyNotice }) => {
      this.agencyNotice = agencyNotice;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
