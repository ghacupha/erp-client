///
/// Erp System - Mark II No 27 (Baruch Series) Client 0.1.6-SNAPSHOT
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

import { ICountyCode } from '../county-code.model';

@Component({
  selector: 'jhi-county-code-detail',
  templateUrl: './county-code-detail.component.html',
})
export class CountyCodeDetailComponent implements OnInit {
  countyCode: ICountyCode | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ countyCode }) => {
      this.countyCode = countyCode;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
