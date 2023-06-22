import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';

import { UniversallyUniqueMappingRoutingResolveService } from './universally-unique-mapping-routing-resolve.service';

describe('UniversallyUniqueMapping routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: UniversallyUniqueMappingRoutingResolveService;
  let service: UniversallyUniqueMappingService;
  let resultUniversallyUniqueMapping: IUniversallyUniqueMapping | null | undefined;

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
    routingResolveService = TestBed.inject(UniversallyUniqueMappingRoutingResolveService);
    service = TestBed.inject(UniversallyUniqueMappingService);
    resultUniversallyUniqueMapping = undefined;
  });

  describe('resolve', () => {
    it('should return IUniversallyUniqueMapping returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUniversallyUniqueMapping = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUniversallyUniqueMapping).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUniversallyUniqueMapping = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultUniversallyUniqueMapping).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IUniversallyUniqueMapping>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUniversallyUniqueMapping = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUniversallyUniqueMapping).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
