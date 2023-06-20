import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISettlementCurrency } from '../settlement-currency.model';
import { SettlementCurrencyService } from '../service/settlement-currency.service';

import { SettlementCurrencyRoutingResolveService } from './settlement-currency-routing-resolve.service';

describe('SettlementCurrency routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SettlementCurrencyRoutingResolveService;
  let service: SettlementCurrencyService;
  let resultSettlementCurrency: ISettlementCurrency | null | undefined;

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
    routingResolveService = TestBed.inject(SettlementCurrencyRoutingResolveService);
    service = TestBed.inject(SettlementCurrencyService);
    resultSettlementCurrency = undefined;
  });

  describe('resolve', () => {
    it('should return ISettlementCurrency returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSettlementCurrency = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSettlementCurrency).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSettlementCurrency = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSettlementCurrency).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISettlementCurrency>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSettlementCurrency = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSettlementCurrency).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
