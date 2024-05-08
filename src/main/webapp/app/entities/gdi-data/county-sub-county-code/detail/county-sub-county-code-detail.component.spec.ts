///
/// Erp System - Mark X No 8 (Jehoiada Series) Client 1.7.6
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CountySubCountyCodeDetailComponent } from './county-sub-county-code-detail.component';

describe('CountySubCountyCode Management Detail Component', () => {
  let comp: CountySubCountyCodeDetailComponent;
  let fixture: ComponentFixture<CountySubCountyCodeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountySubCountyCodeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ countySubCountyCode: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CountySubCountyCodeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CountySubCountyCodeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load countySubCountyCode on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.countySubCountyCode).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
