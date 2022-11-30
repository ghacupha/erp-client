///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
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

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicQuestion } from '../../dynamic-question.model';
import { QuestionServiceTest3Service } from './QuestionServiceTest3.service';

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
  providers:  [QuestionServiceTest3Service]
})
export class SampleClientTest3Component {

  questions$: Observable<DynamicQuestion<any>[]>;

  constructor(service: QuestionServiceTest3Service) {
    // Apply mapping using the QuestionBase entity
    this.questions$ = service.getQuestions();
  }
}
