import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMfbBranchCode } from '../mfb-branch-code.model';
import { MfbBranchCodeService } from '../service/mfb-branch-code.service';

import { MfbBranchCodeRoutingResolveService } from './mfb-branch-code-routing-resolve.service';

describe('MfbBranchCode routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MfbBranchCodeRoutingResolveService;
  let service: MfbBranchCodeService;
  let resultMfbBranchCode: IMfbBranchCode | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(MfbBranchCodeRoutingResolveService);
    service = TestBed.inject(MfbBranchCodeService);
    resultMfbBranchCode = undefined;
  });

  describe('resolve', () => {
    it('should return IMfbBranchCode returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMfbBranchCode = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMfbBranchCode).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMfbBranchCode = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMfbBranchCode).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IMfbBranchCode>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMfbBranchCode = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMfbBranchCode).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
