import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssetCategory } from '../asset-category.model';

@Component({
  selector: 'jhi-asset-category-detail',
  templateUrl: './asset-category-detail.component.html',
})
export class AssetCategoryDetailComponent implements OnInit {
  assetCategory: IAssetCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetCategory }) => {
      this.assetCategory = assetCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
