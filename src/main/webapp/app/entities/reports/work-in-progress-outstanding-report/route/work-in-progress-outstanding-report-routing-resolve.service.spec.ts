jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWorkInProgressOutstandingReport, WorkInProgressOutstandingReport } from '../work-in-progress-outstanding-report.model';
import { WorkInProgressOutstandingReportService } from '../service/work-in-progress-outstanding-report.service';

import { WorkInProgressOutstandingReportRoutingResolveService } from './work-in-progress-outstanding-report-routing-resolve.service';

describe('WorkInProgressOutstandingReport routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: WorkInProgressOutstandingReportRoutingResolveService;
  let service: WorkInProgressOutstandingReportService;
  let resultWorkInProgressOutstandingReport: IWorkInProgressOutstandingReport | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(WorkInProgressOutstandingReportRoutingResolveService);
    service = TestBed.inject(WorkInProgressOutstandingReportService);
    resultWorkInProgressOutstandingReport = undefined;
  });

  describe('resolve', () => {
    it('should return IWorkInProgressOutstandingReport returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWorkInProgressOutstandingReport = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWorkInProgressOutstandingReport).toEqual({ id: 123 });
    });

    it('should return new IWorkInProgressOutstandingReport if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWorkInProgressOutstandingReport = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultWorkInProgressOutstandingReport).toEqual(new WorkInProgressOutstandingReport());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as WorkInProgressOutstandingReport })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWorkInProgressOutstandingReport = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWorkInProgressOutstandingReport).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
