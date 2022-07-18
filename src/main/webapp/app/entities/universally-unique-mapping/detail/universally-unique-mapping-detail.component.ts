///
/// Erp System - Mark II No 19 (Baruch Series)
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

import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';

@Component({
  selector: 'jhi-universally-unique-mapping-detail',
  templateUrl: './universally-unique-mapping-detail.component.html',
})
export class UniversallyUniqueMappingDetailComponent implements OnInit {
  universallyUniqueMapping: IUniversallyUniqueMapping | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ universallyUniqueMapping }) => {
      this.universallyUniqueMapping = universallyUniqueMapping;
    });
  }

  previousState(): void {
    window.history.back();
  }
}