import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BusinessStampDetailComponent } from './business-stamp-detail.component';

describe('BusinessStamp Management Detail Component', () => {
  let comp: BusinessStampDetailComponent;
  let fixture: ComponentFixture<BusinessStampDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessStampDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ businessStamp: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(BusinessStampDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(BusinessStampDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load businessStamp on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.businessStamp).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
