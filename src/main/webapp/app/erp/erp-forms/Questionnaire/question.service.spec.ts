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

import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';
import { QuestionBase } from '../question-base/question-base.model';
import { ControlTypes } from '../../erp-common/enumerations/control-types.model';

describe('QuestionService', () => {

  let service: QuestionService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [QuestionService]
  }));

  beforeEach(() => {
    service = TestBed.get(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create test objects', () => {
    const questions: QuestionBase[] = [
      new QuestionBase(
        1002,
        'Heroes',
        'firstName',
        'Marcus',
        'First name',
        'First name',
        true,
        1,
        ControlTypes.TEXTBOX,
        'First Name'
      ),
      new QuestionBase(
        1001,
        'Heroes',
        'secondName',
        'Aurelius',
        'secondName',
        'Second name',
        true,
        2,
        ControlTypes.TEXTBOX,
        'Second name'
      ),
    ];
    expect(service.getQuestions()).toMatchObject(questions)
  });
});
