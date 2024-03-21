jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICardPerformanceFlag, CardPerformanceFlag } from '../card-performance-flag.model';
import { CardPerformanceFlagService } from '../service/card-performance-flag.service';

import { CardPerformanceFlagRoutingResolveService } from './card-performance-flag-routing-resolve.service';

describe('CardPerformanceFlag routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CardPerformanceFlagRoutingResolveService;
  let service: CardPerformanceFlagService;
  let resultCardPerformanceFlag: ICardPerformanceFlag | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(CardPerformanceFlagRoutingResolveService);
    service = TestBed.inject(CardPerformanceFlagService);
    resultCardPerformanceFlag = undefined;
  });

  describe('resolve', () => {
    it('should return ICardPerformanceFlag returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardPerformanceFlag = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCardPerformanceFlag).toEqual({ id: 123 });
    });

    it('should return new ICardPerformanceFlag if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardPerformanceFlag = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCardPerformanceFlag).toEqual(new CardPerformanceFlag());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CardPerformanceFlag })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardPerformanceFlag = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCardPerformanceFlag).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
