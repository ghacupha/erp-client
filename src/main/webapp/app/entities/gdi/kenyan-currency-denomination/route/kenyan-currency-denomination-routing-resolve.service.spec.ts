jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IKenyanCurrencyDenomination, KenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';
import { KenyanCurrencyDenominationService } from '../service/kenyan-currency-denomination.service';

import { KenyanCurrencyDenominationRoutingResolveService } from './kenyan-currency-denomination-routing-resolve.service';

describe('KenyanCurrencyDenomination routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: KenyanCurrencyDenominationRoutingResolveService;
  let service: KenyanCurrencyDenominationService;
  let resultKenyanCurrencyDenomination: IKenyanCurrencyDenomination | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(KenyanCurrencyDenominationRoutingResolveService);
    service = TestBed.inject(KenyanCurrencyDenominationService);
    resultKenyanCurrencyDenomination = undefined;
  });

  describe('resolve', () => {
    it('should return IKenyanCurrencyDenomination returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultKenyanCurrencyDenomination = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultKenyanCurrencyDenomination).toEqual({ id: 123 });
    });

    it('should return new IKenyanCurrencyDenomination if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultKenyanCurrencyDenomination = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultKenyanCurrencyDenomination).toEqual(new KenyanCurrencyDenomination());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as KenyanCurrencyDenomination })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultKenyanCurrencyDenomination = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultKenyanCurrencyDenomination).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
