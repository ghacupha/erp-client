import { ErpCommonModule } from '../../../erp-common/erp-common.module';

jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISignedPayment, SignedPayment } from '../../../erp-common/models/signed-payment.model';
import { SignedPaymentService } from '../../../erp-common/services/signed-payment.service';

import { SignedPaymentRoutingResolveService } from './signed-payment-routing-resolve.service';

describe('Service Tests', () => {
  describe('SignedPayment routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SignedPaymentRoutingResolveService;
    let service: SignedPaymentService;
    let resultSignedPayment: ISignedPayment | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ErpCommonModule, HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SignedPaymentRoutingResolveService);
      service = TestBed.inject(SignedPaymentService);
      resultSignedPayment = undefined;
    });

    describe('resolve', () => {
      it('should return ISignedPayment returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSignedPayment = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSignedPayment).toEqual({ id: 123 });
      });

      it('should return new ISignedPayment if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSignedPayment = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSignedPayment).toEqual(new SignedPayment());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SignedPayment })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSignedPayment = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSignedPayment).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
