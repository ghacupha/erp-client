jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICardAcquiringTransaction, CardAcquiringTransaction } from '../card-acquiring-transaction.model';
import { CardAcquiringTransactionService } from '../service/card-acquiring-transaction.service';

import { CardAcquiringTransactionRoutingResolveService } from './card-acquiring-transaction-routing-resolve.service';

describe('CardAcquiringTransaction routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CardAcquiringTransactionRoutingResolveService;
  let service: CardAcquiringTransactionService;
  let resultCardAcquiringTransaction: ICardAcquiringTransaction | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(CardAcquiringTransactionRoutingResolveService);
    service = TestBed.inject(CardAcquiringTransactionService);
    resultCardAcquiringTransaction = undefined;
  });

  describe('resolve', () => {
    it('should return ICardAcquiringTransaction returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardAcquiringTransaction = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCardAcquiringTransaction).toEqual({ id: 123 });
    });

    it('should return new ICardAcquiringTransaction if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardAcquiringTransaction = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCardAcquiringTransaction).toEqual(new CardAcquiringTransaction());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CardAcquiringTransaction })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardAcquiringTransaction = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCardAcquiringTransaction).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
