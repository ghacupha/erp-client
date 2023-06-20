import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFixedAssetAcquisition } from '../fixed-asset-acquisition.model';
import { FixedAssetAcquisitionService } from '../service/fixed-asset-acquisition.service';

import { FixedAssetAcquisitionRoutingResolveService } from './fixed-asset-acquisition-routing-resolve.service';

describe('FixedAssetAcquisition routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FixedAssetAcquisitionRoutingResolveService;
  let service: FixedAssetAcquisitionService;
  let resultFixedAssetAcquisition: IFixedAssetAcquisition | null | undefined;

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
    routingResolveService = TestBed.inject(FixedAssetAcquisitionRoutingResolveService);
    service = TestBed.inject(FixedAssetAcquisitionService);
    resultFixedAssetAcquisition = undefined;
  });

  describe('resolve', () => {
    it('should return IFixedAssetAcquisition returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFixedAssetAcquisition = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFixedAssetAcquisition).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFixedAssetAcquisition = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFixedAssetAcquisition).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFixedAssetAcquisition>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFixedAssetAcquisition = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFixedAssetAcquisition).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
