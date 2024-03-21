jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IRouAssetNBVReport, RouAssetNBVReport } from '../rou-asset-nbv-report.model';
import { RouAssetNBVReportService } from '../service/rou-asset-nbv-report.service';

import { RouAssetNBVReportRoutingResolveService } from './rou-asset-nbv-report-routing-resolve.service';

describe('RouAssetNBVReport routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RouAssetNBVReportRoutingResolveService;
  let service: RouAssetNBVReportService;
  let resultRouAssetNBVReport: IRouAssetNBVReport | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(RouAssetNBVReportRoutingResolveService);
    service = TestBed.inject(RouAssetNBVReportService);
    resultRouAssetNBVReport = undefined;
  });

  describe('resolve', () => {
    it('should return IRouAssetNBVReport returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRouAssetNBVReport = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRouAssetNBVReport).toEqual({ id: 123 });
    });

    it('should return new IRouAssetNBVReport if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRouAssetNBVReport = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRouAssetNBVReport).toEqual(new RouAssetNBVReport());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RouAssetNBVReport })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRouAssetNBVReport = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRouAssetNBVReport).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
