import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PurchaseOrderDetailComponent } from './purchase-order-detail.component';

describe('PurchaseOrder Management Detail Component', () => {
  let comp: PurchaseOrderDetailComponent;
  let fixture: ComponentFixture<PurchaseOrderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ purchaseOrder: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PurchaseOrderDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PurchaseOrderDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load purchaseOrder on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.purchaseOrder).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
