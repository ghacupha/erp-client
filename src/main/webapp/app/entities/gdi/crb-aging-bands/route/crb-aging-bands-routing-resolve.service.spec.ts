jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICrbAgingBands, CrbAgingBands } from '../crb-aging-bands.model';
import { CrbAgingBandsService } from '../service/crb-aging-bands.service';

import { CrbAgingBandsRoutingResolveService } from './crb-aging-bands-routing-resolve.service';

describe('CrbAgingBands routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CrbAgingBandsRoutingResolveService;
  let service: CrbAgingBandsService;
  let resultCrbAgingBands: ICrbAgingBands | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(CrbAgingBandsRoutingResolveService);
    service = TestBed.inject(CrbAgingBandsService);
    resultCrbAgingBands = undefined;
  });

  describe('resolve', () => {
    it('should return ICrbAgingBands returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrbAgingBands = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrbAgingBands).toEqual({ id: 123 });
    });

    it('should return new ICrbAgingBands if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrbAgingBands = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCrbAgingBands).toEqual(new CrbAgingBands());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CrbAgingBands })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrbAgingBands = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrbAgingBands).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
