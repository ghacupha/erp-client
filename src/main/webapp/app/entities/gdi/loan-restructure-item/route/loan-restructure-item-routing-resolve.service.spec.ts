jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ILoanRestructureItem, LoanRestructureItem } from '../loan-restructure-item.model';
import { LoanRestructureItemService } from '../service/loan-restructure-item.service';

import { LoanRestructureItemRoutingResolveService } from './loan-restructure-item-routing-resolve.service';

describe('LoanRestructureItem routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LoanRestructureItemRoutingResolveService;
  let service: LoanRestructureItemService;
  let resultLoanRestructureItem: ILoanRestructureItem | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(LoanRestructureItemRoutingResolveService);
    service = TestBed.inject(LoanRestructureItemService);
    resultLoanRestructureItem = undefined;
  });

  describe('resolve', () => {
    it('should return ILoanRestructureItem returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLoanRestructureItem = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLoanRestructureItem).toEqual({ id: 123 });
    });

    it('should return new ILoanRestructureItem if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLoanRestructureItem = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLoanRestructureItem).toEqual(new LoanRestructureItem());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as LoanRestructureItem })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLoanRestructureItem = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLoanRestructureItem).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
