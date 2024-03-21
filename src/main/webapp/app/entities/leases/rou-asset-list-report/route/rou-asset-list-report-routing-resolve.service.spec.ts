jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IRouAssetListReport, RouAssetListReport } from '../rou-asset-list-report.model';
import { RouAssetListReportService } from '../service/rou-asset-list-report.service';

import { RouAssetListReportRoutingResolveService } from './rou-asset-list-report-routing-resolve.service';

describe('RouAssetListReport routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RouAssetListReportRoutingResolveService;
  let service: RouAssetListReportService;
  let resultRouAssetListReport: IRouAssetListReport | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(RouAssetListReportRoutingResolveService);
    service = TestBed.inject(RouAssetListReportService);
    resultRouAssetListReport = undefined;
  });

  describe('resolve', () => {
    it('should return IRouAssetListReport returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRouAssetListReport = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRouAssetListReport).toEqual({ id: 123 });
    });

    it('should return new IRouAssetListReport if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRouAssetListReport = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRouAssetListReport).toEqual(new RouAssetListReport());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RouAssetListReport })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRouAssetListReport = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRouAssetListReport).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
