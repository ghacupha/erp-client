///
/// Erp System - Mark III No 6 (Caleb Series) Client 0.7.0
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormQuestionModule } from './dynamic-form-question.module';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { ControlTypes } from '../../../../erp-common/enumerations/control-types.model';

describe('DynamicFormQuestionComponent', () => {
  let component: DynamicFormQuestionComponent;
  let fixture: ComponentFixture<DynamicFormQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormQuestionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionComponent);
    component = fixture.componentInstance;

    // Mock form
    component.form = new FormGroup({
      firstName: new FormControl()
    });

    // Mock question
    component.question = {
      value: 'Bombasto',
      key: 'firstName',
      label: 'First name',
      required: true,
      order: 1,
      controlType: ControlTypes.TEXTBOX,
      placeholder: '',
      iterable: false
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
