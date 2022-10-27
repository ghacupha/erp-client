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
