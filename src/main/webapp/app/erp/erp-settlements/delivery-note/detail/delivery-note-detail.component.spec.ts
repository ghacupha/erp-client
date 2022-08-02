import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeliveryNoteDetailComponent } from './delivery-note-detail.component';

describe('DeliveryNote Management Detail Component', () => {
  let comp: DeliveryNoteDetailComponent;
  let fixture: ComponentFixture<DeliveryNoteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryNoteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ deliveryNote: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DeliveryNoteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DeliveryNoteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load deliveryNote on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.deliveryNote).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
