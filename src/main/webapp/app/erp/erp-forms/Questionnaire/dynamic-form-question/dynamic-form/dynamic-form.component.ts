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

import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase } from '../../../question-base/question-base.model';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../question-control.service';

/**
 * Sample implementation of a sample dynamic form
 */
@Component({
  selector: 'jhi-app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit{

  @Input() questions: QuestionBase[] = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit(): void {
    this.payLoad = this.form.value ?? '';
  }
}
