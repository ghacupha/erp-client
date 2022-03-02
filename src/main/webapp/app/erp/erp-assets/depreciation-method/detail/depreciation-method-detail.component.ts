import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepreciationMethod } from '../depreciation-method.model';

@Component({
  selector: 'jhi-depreciation-method-detail',
  templateUrl: './depreciation-method-detail.component.html',
})
export class DepreciationMethodDetailComponent implements OnInit {
  depreciationMethod: IDepreciationMethod | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depreciationMethod }) => {
      this.depreciationMethod = depreciationMethod;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
