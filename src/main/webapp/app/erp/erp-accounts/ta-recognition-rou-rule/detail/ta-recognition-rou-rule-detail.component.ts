///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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

import { ITARecognitionROURule } from '../ta-recognition-rou-rule.model';

@Component({
  selector: 'jhi-ta-recognition-rou-rule-detail',
  templateUrl: './ta-recognition-rou-rule-detail.component.html',
})
export class TARecognitionROURuleDetailComponent implements OnInit {
  tARecognitionROURule: ITARecognitionROURule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tARecognitionROURule }) => {
      this.tARecognitionROURule = tARecognitionROURule;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
