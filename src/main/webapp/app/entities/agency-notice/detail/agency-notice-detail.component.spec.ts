import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AgencyNoticeDetailComponent } from './agency-notice-detail.component';

describe('AgencyNotice Management Detail Component', () => {
  let comp: AgencyNoticeDetailComponent;
  let fixture: ComponentFixture<AgencyNoticeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyNoticeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ agencyNotice: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AgencyNoticeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AgencyNoticeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load agencyNotice on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.agencyNotice).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
