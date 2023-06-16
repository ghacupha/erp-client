import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ILeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';
import { LeaseLiabilityScheduleItemService } from '../service/lease-liability-schedule-item.service';

import { LeaseLiabilityScheduleItemRoutingResolveService } from './lease-liability-schedule-item-routing-resolve.service';

describe('LeaseLiabilityScheduleItem routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LeaseLiabilityScheduleItemRoutingResolveService;
  let service: LeaseLiabilityScheduleItemService;
  let resultLeaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem | null | undefined;

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
    routingResolveService = TestBed.inject(LeaseLiabilityScheduleItemRoutingResolveService);
    service = TestBed.inject(LeaseLiabilityScheduleItemService);
    resultLeaseLiabilityScheduleItem = undefined;
  });

  describe('resolve', () => {
    it('should return ILeaseLiabilityScheduleItem returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLeaseLiabilityScheduleItem = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLeaseLiabilityScheduleItem).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLeaseLiabilityScheduleItem = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLeaseLiabilityScheduleItem).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILeaseLiabilityScheduleItem>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLeaseLiabilityScheduleItem = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLeaseLiabilityScheduleItem).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
