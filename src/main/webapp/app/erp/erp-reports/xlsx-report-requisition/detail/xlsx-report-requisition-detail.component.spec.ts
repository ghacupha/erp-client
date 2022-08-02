import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XlsxReportRequisitionDetailComponent } from './xlsx-report-requisition-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('XlsxReportRequisition Management Detail Component', () => {
  let comp: XlsxReportRequisitionDetailComponent;
  let fixture: ComponentFixture<XlsxReportRequisitionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, LoggerTestingModule],
      declarations: [XlsxReportRequisitionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ xlsxReportRequisition: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(XlsxReportRequisitionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(XlsxReportRequisitionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load xlsxReportRequisition on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.xlsxReportRequisition).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
