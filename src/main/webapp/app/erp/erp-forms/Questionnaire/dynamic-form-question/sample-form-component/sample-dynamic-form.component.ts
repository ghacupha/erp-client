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

import { Component, VERSION } from '@angular/core';
import { QuestionService } from '../../question.service';
import { QuestionBase } from '../../../question-base/question-base.model';

/**
 * This component used the question-service to provide configuration for the
 * dynamic-form, using the #getQuestions method
 */
@Component({
  selector: 'jhi-sample-dynamic-form',
  templateUrl: './sample-dynamic-form.component.html',
  styleUrls: ['./sample-dynamic-form.component.scss']
})
export class SampleDynamicFormComponent {

  questions: QuestionBase[];
  version = VERSION.full;

  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
  }
}
