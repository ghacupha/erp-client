///
/// Erp System - Mark III No 15 (Caleb Series) Client 1.3.4
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

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicQuestion } from '../../dynamic-question.model';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'jhi-app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question!: DynamicQuestion<string>;
  @Input() form!: FormGroup;


  constructor(protected log: NGXLogger) {
  }

  ngOnInit(): void {
    this.log.debug(`Initializing form item for question: ${this.question.key}`)
  }


  get isValid(): boolean {
    return this.form.controls[this.question.key].valid;
  }
}
