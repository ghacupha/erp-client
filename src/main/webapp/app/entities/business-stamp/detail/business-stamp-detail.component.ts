import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessStamp } from '../business-stamp.model';

@Component({
  selector: 'jhi-business-stamp-detail',
  templateUrl: './business-stamp-detail.component.html',
})
export class BusinessStampDetailComponent implements OnInit {
  businessStamp: IBusinessStamp | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessStamp }) => {
      this.businessStamp = businessStamp;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
