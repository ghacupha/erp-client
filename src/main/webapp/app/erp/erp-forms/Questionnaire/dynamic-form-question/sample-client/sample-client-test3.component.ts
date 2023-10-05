///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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
import { Observable } from 'rxjs';
import { DynamicQuestion } from '../../dynamic-question.model';
import { SampleClientTest3Service } from './sample-client-test3.service';
import { ActivatedRoute } from '@angular/router';

/**
 * This is the famous dynamic forms tutorial from the site https://angular.io/guide/dynamic-form
 * We make very very minor amendments to fetch the same data from a json file to mock actual constrains
 * of real http calls, and the challenge of designing google's model into a secured and editable
 * information from an API. Thereupon it will be possible to create form objects on the fly, enabling
 * spontaneous definition of reports and forms used to parameterize such reports
 */
@Component({
  selector: 'jhi-sample-client',
  templateUrl: './sample-client-test3.component.html',
})
export class SampleClientTest3Component implements OnInit{

  questionsLoaded!: Promise<boolean>;

  questions$!: Observable<DynamicQuestion<any>[]>;

  pageReady = false;

  constructor(service: SampleClientTest3Service, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.questions$ = this.route.snapshot.data.serverQuestions;

    this.questionsLoaded = Promise.resolve(true);

    this.questionsLoaded.finally(() => this.pageReady = true)
  }
}
