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

import { IPrepaymentMapping } from '../prepayment-mapping.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../prepayment-mapping.test-samples';

import { PrepaymentMappingService } from './prepayment-mapping.service';

const requireRestSample: IPrepaymentMapping = {
  ...sampleWithRequiredData,
};

describe('PrepaymentMapping Service', () => {
  let service: PrepaymentMappingService;
  let httpMock: HttpTestingController;
  let expectedResult: IPrepaymentMapping | IPrepaymentMapping[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrepaymentMappingService);
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

    it('should create a PrepaymentMapping', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const prepaymentMapping = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(prepaymentMapping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PrepaymentMapping', () => {
      const prepaymentMapping = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(prepaymentMapping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PrepaymentMapping', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PrepaymentMapping', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PrepaymentMapping', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPrepaymentMappingToCollectionIfMissing', () => {
      it('should add a PrepaymentMapping to an empty array', () => {
        const prepaymentMapping: IPrepaymentMapping = sampleWithRequiredData;
        expectedResult = service.addPrepaymentMappingToCollectionIfMissing([], prepaymentMapping);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentMapping);
      });

      it('should not add a PrepaymentMapping to an array that contains it', () => {
        const prepaymentMapping: IPrepaymentMapping = sampleWithRequiredData;
        const prepaymentMappingCollection: IPrepaymentMapping[] = [
          {
            ...prepaymentMapping,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPrepaymentMappingToCollectionIfMissing(prepaymentMappingCollection, prepaymentMapping);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PrepaymentMapping to an array that doesn't contain it", () => {
        const prepaymentMapping: IPrepaymentMapping = sampleWithRequiredData;
        const prepaymentMappingCollection: IPrepaymentMapping[] = [sampleWithPartialData];
        expectedResult = service.addPrepaymentMappingToCollectionIfMissing(prepaymentMappingCollection, prepaymentMapping);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentMapping);
      });

      it('should add only unique PrepaymentMapping to an array', () => {
        const prepaymentMappingArray: IPrepaymentMapping[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const prepaymentMappingCollection: IPrepaymentMapping[] = [sampleWithRequiredData];
        expectedResult = service.addPrepaymentMappingToCollectionIfMissing(prepaymentMappingCollection, ...prepaymentMappingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const prepaymentMapping: IPrepaymentMapping = sampleWithRequiredData;
        const prepaymentMapping2: IPrepaymentMapping = sampleWithPartialData;
        expectedResult = service.addPrepaymentMappingToCollectionIfMissing([], prepaymentMapping, prepaymentMapping2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentMapping);
        expect(expectedResult).toContain(prepaymentMapping2);
      });

      it('should accept null and undefined values', () => {
        const prepaymentMapping: IPrepaymentMapping = sampleWithRequiredData;
        expectedResult = service.addPrepaymentMappingToCollectionIfMissing([], null, prepaymentMapping, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentMapping);
      });

      it('should return initial array if no PrepaymentMapping is added', () => {
        const prepaymentMappingCollection: IPrepaymentMapping[] = [sampleWithRequiredData];
        expectedResult = service.addPrepaymentMappingToCollectionIfMissing(prepaymentMappingCollection, undefined, null);
        expect(expectedResult).toEqual(prepaymentMappingCollection);
      });
    });

    describe('comparePrepaymentMapping', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePrepaymentMapping(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePrepaymentMapping(entity1, entity2);
        const compareResult2 = service.comparePrepaymentMapping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePrepaymentMapping(entity1, entity2);
        const compareResult2 = service.comparePrepaymentMapping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePrepaymentMapping(entity1, entity2);
        const compareResult2 = service.comparePrepaymentMapping(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
