///
/// Erp System - Mark II No 20 (Baruch Series) Client v 0.0.9-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFixedAssetDepreciation } from '../fixed-asset-depreciation.model';

@Component({
  selector: 'jhi-fixed-asset-depreciation-detail',
  templateUrl: './fixed-asset-depreciation-detail.component.html',
})
export class FixedAssetDepreciationDetailComponent implements OnInit {
  fixedAssetDepreciation: IFixedAssetDepreciation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fixedAssetDepreciation }) => {
      this.fixedAssetDepreciation = fixedAssetDepreciation;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
