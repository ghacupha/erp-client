///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IServiceOutlet } from '../service-outlet.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../service-outlet.test-samples';

import { ServiceOutletService, RestServiceOutlet } from './service-outlet.service';

const requireRestSample: RestServiceOutlet = {
  ...sampleWithRequiredData,
  outletOpeningDate: sampleWithRequiredData.outletOpeningDate?.format(DATE_FORMAT),
  regulatorApprovalDate: sampleWithRequiredData.regulatorApprovalDate?.format(DATE_FORMAT),
  outletClosureDate: sampleWithRequiredData.outletClosureDate?.format(DATE_FORMAT),
  dateLastModified: sampleWithRequiredData.dateLastModified?.format(DATE_FORMAT),
};

describe('ServiceOutlet Service', () => {
  let service: ServiceOutletService;
  let httpMock: HttpTestingController;
  let expectedResult: IServiceOutlet | IServiceOutlet[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ServiceOutletService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ServiceOutlet', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const serviceOutlet = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(serviceOutlet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ServiceOutlet', () => {
      const serviceOutlet = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(serviceOutlet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ServiceOutlet', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ServiceOutlet', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ServiceOutlet', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addServiceOutletToCollectionIfMissing', () => {
      it('should add a ServiceOutlet to an empty array', () => {
        const serviceOutlet: IServiceOutlet = sampleWithRequiredData;
        expectedResult = service.addServiceOutletToCollectionIfMissing([], serviceOutlet);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(serviceOutlet);
      });

      it('should not add a ServiceOutlet to an array that contains it', () => {
        const serviceOutlet: IServiceOutlet = sampleWithRequiredData;
        const serviceOutletCollection: IServiceOutlet[] = [
          {
            ...serviceOutlet,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addServiceOutletToCollectionIfMissing(serviceOutletCollection, serviceOutlet);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ServiceOutlet to an array that doesn't contain it", () => {
        const serviceOutlet: IServiceOutlet = sampleWithRequiredData;
        const serviceOutletCollection: IServiceOutlet[] = [sampleWithPartialData];
        expectedResult = service.addServiceOutletToCollectionIfMissing(serviceOutletCollection, serviceOutlet);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(serviceOutlet);
      });

      it('should add only unique ServiceOutlet to an array', () => {
        const serviceOutletArray: IServiceOutlet[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const serviceOutletCollection: IServiceOutlet[] = [sampleWithRequiredData];
        expectedResult = service.addServiceOutletToCollectionIfMissing(serviceOutletCollection, ...serviceOutletArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const serviceOutlet: IServiceOutlet = sampleWithRequiredData;
        const serviceOutlet2: IServiceOutlet = sampleWithPartialData;
        expectedResult = service.addServiceOutletToCollectionIfMissing([], serviceOutlet, serviceOutlet2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(serviceOutlet);
        expect(expectedResult).toContain(serviceOutlet2);
      });

      it('should accept null and undefined values', () => {
        const serviceOutlet: IServiceOutlet = sampleWithRequiredData;
        expectedResult = service.addServiceOutletToCollectionIfMissing([], null, serviceOutlet, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(serviceOutlet);
      });

      it('should return initial array if no ServiceOutlet is added', () => {
        const serviceOutletCollection: IServiceOutlet[] = [sampleWithRequiredData];
        expectedResult = service.addServiceOutletToCollectionIfMissing(serviceOutletCollection, undefined, null);
        expect(expectedResult).toEqual(serviceOutletCollection);
      });
    });

    describe('compareServiceOutlet', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareServiceOutlet(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareServiceOutlet(entity1, entity2);
        const compareResult2 = service.compareServiceOutlet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareServiceOutlet(entity1, entity2);
        const compareResult2 = service.compareServiceOutlet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareServiceOutlet(entity1, entity2);
        const compareResult2 = service.compareServiceOutlet(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
