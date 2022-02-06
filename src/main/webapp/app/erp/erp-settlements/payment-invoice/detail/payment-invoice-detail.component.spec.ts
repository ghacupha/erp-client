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
