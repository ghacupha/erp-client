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

import { DynamicQuestion } from '../../dynamic-question.model';
import { QuestionService } from '../../question.service';
import { Component, OnInit } from '@angular/core';
import { MockQuestionBaseService } from './mock-question-base.service';

@Component({
  selector: 'jhi-sample-client',
  templateUrl: './sample-client-test2.component.html',
  providers:  [QuestionService, MockQuestionBaseService]
})
export class SampleClientTest2Component implements OnInit {
  questions: DynamicQuestion<any>[] = [];

  constructor(
    private mockQuestionBaseService: MockQuestionBaseService
  ) {
  }

  ngOnInit(): void {
    this.mockQuestionBaseService.getQuestions().subscribe(qn => {
      this.questions = qn
    });
  }
}
