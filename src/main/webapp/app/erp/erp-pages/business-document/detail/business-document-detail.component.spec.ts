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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BusinessDocumentDetailComponent } from './business-document-detail.component';

describe('BusinessDocument Management Detail Component', () => {
  let comp: BusinessDocumentDetailComponent;
  let fixture: ComponentFixture<BusinessDocumentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDocumentDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ businessDocument: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(BusinessDocumentDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(BusinessDocumentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load businessDocument on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.businessDocument).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
