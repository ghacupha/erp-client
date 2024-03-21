import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MonthlyPrepaymentReportRequisitionDetailComponent } from './monthly-prepayment-report-requisition-detail.component';

describe('MonthlyPrepaymentReportRequisition Management Detail Component', () => {
  let comp: MonthlyPrepaymentReportRequisitionDetailComponent;
  let fixture: ComponentFixture<MonthlyPrepaymentReportRequisitionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyPrepaymentReportRequisitionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ monthlyPrepaymentReportRequisition: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MonthlyPrepaymentReportRequisitionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MonthlyPrepaymentReportRequisitionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load monthlyPrepaymentReportRequisition on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.monthlyPrepaymentReportRequisition).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
