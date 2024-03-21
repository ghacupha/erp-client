jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICrbDataSubmittingInstitutions, CrbDataSubmittingInstitutions } from '../crb-data-submitting-institutions.model';
import { CrbDataSubmittingInstitutionsService } from '../service/crb-data-submitting-institutions.service';

import { CrbDataSubmittingInstitutionsRoutingResolveService } from './crb-data-submitting-institutions-routing-resolve.service';

describe('CrbDataSubmittingInstitutions routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CrbDataSubmittingInstitutionsRoutingResolveService;
  let service: CrbDataSubmittingInstitutionsService;
  let resultCrbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(CrbDataSubmittingInstitutionsRoutingResolveService);
    service = TestBed.inject(CrbDataSubmittingInstitutionsService);
    resultCrbDataSubmittingInstitutions = undefined;
  });

  describe('resolve', () => {
    it('should return ICrbDataSubmittingInstitutions returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrbDataSubmittingInstitutions = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrbDataSubmittingInstitutions).toEqual({ id: 123 });
    });

    it('should return new ICrbDataSubmittingInstitutions if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrbDataSubmittingInstitutions = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCrbDataSubmittingInstitutions).toEqual(new CrbDataSubmittingInstitutions());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CrbDataSubmittingInstitutions })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrbDataSubmittingInstitutions = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrbDataSubmittingInstitutions).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
