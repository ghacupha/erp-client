///
/// Erp System - Mark II No 23 (Baruch Series) Client v 0.1.1-SNAPSHOT
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

import { PaymentInvoiceDetailComponent } from './payment-invoice-detail.component';

describe('PaymentInvoice Management Detail Component', () => {
  let comp: PaymentInvoiceDetailComponent;
  let fixture: ComponentFixture<PaymentInvoiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentInvoiceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ paymentInvoice: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PaymentInvoiceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PaymentInvoiceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load paymentInvoice on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.paymentInvoice).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
