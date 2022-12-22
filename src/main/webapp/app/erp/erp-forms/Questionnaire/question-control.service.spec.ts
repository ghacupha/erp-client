///
/// Erp System - Mark III No 6 (Caleb Series) Client 0.6.0
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
import { QuestionControlService } from './question-control.service';
// import { FormControl, FormGroup } from '@angular/forms';

describe('QuestionControlService', () => {
  let service: QuestionControlService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [QuestionControlService]
  }));

  beforeEach(() => {
    service = TestBed.inject(QuestionControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the appropriate form object', () => {
    // const dyForm: FormGroup = new FormGroup();
    //
    // dyForm.addControl("firstName", )

    // expect(dyForm).toBeTruthy();
  });

  // TODO test  for the string method
});
