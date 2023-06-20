import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAmortizationSequence } from '../amortization-sequence.model';
import { AmortizationSequenceService } from '../service/amortization-sequence.service';

import { AmortizationSequenceRoutingResolveService } from './amortization-sequence-routing-resolve.service';

describe('AmortizationSequence routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AmortizationSequenceRoutingResolveService;
  let service: AmortizationSequenceService;
  let resultAmortizationSequence: IAmortizationSequence | null | undefined;

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
    routingResolveService = TestBed.inject(AmortizationSequenceRoutingResolveService);
    service = TestBed.inject(AmortizationSequenceService);
    resultAmortizationSequence = undefined;
  });

  describe('resolve', () => {
    it('should return IAmortizationSequence returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAmortizationSequence = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAmortizationSequence).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAmortizationSequence = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAmortizationSequence).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAmortizationSequence>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAmortizationSequence = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAmortizationSequence).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
