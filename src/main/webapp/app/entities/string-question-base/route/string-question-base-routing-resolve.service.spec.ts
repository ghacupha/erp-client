import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IStringQuestionBase } from '../string-question-base.model';
import { StringQuestionBaseService } from '../service/string-question-base.service';

import { StringQuestionBaseRoutingResolveService } from './string-question-base-routing-resolve.service';

describe('StringQuestionBase routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StringQuestionBaseRoutingResolveService;
  let service: StringQuestionBaseService;
  let resultStringQuestionBase: IStringQuestionBase | null | undefined;

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
    routingResolveService = TestBed.inject(StringQuestionBaseRoutingResolveService);
    service = TestBed.inject(StringQuestionBaseService);
    resultStringQuestionBase = undefined;
  });

  describe('resolve', () => {
    it('should return IStringQuestionBase returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStringQuestionBase = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStringQuestionBase).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStringQuestionBase = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStringQuestionBase).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IStringQuestionBase>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStringQuestionBase = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStringQuestionBase).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
