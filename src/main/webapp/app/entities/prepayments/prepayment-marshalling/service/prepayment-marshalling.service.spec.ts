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
import { IPrepaymentMarshalling } from '../prepayment-marshalling.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../prepayment-marshalling.test-samples';

import { PrepaymentMarshallingService, RestPrepaymentMarshalling } from './prepayment-marshalling.service';

const requireRestSample: RestPrepaymentMarshalling = {
  ...sampleWithRequiredData,
  amortizationCommencementDate: sampleWithRequiredData.amortizationCommencementDate?.format(DATE_FORMAT),
};

describe('PrepaymentMarshalling Service', () => {
  let service: PrepaymentMarshallingService;
  let httpMock: HttpTestingController;
  let expectedResult: IPrepaymentMarshalling | IPrepaymentMarshalling[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrepaymentMarshallingService);
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

    it('should create a PrepaymentMarshalling', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const prepaymentMarshalling = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(prepaymentMarshalling).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PrepaymentMarshalling', () => {
      const prepaymentMarshalling = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(prepaymentMarshalling).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PrepaymentMarshalling', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PrepaymentMarshalling', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PrepaymentMarshalling', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPrepaymentMarshallingToCollectionIfMissing', () => {
      it('should add a PrepaymentMarshalling to an empty array', () => {
        const prepaymentMarshalling: IPrepaymentMarshalling = sampleWithRequiredData;
        expectedResult = service.addPrepaymentMarshallingToCollectionIfMissing([], prepaymentMarshalling);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentMarshalling);
      });

      it('should not add a PrepaymentMarshalling to an array that contains it', () => {
        const prepaymentMarshalling: IPrepaymentMarshalling = sampleWithRequiredData;
        const prepaymentMarshallingCollection: IPrepaymentMarshalling[] = [
          {
            ...prepaymentMarshalling,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPrepaymentMarshallingToCollectionIfMissing(prepaymentMarshallingCollection, prepaymentMarshalling);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PrepaymentMarshalling to an array that doesn't contain it", () => {
        const prepaymentMarshalling: IPrepaymentMarshalling = sampleWithRequiredData;
        const prepaymentMarshallingCollection: IPrepaymentMarshalling[] = [sampleWithPartialData];
        expectedResult = service.addPrepaymentMarshallingToCollectionIfMissing(prepaymentMarshallingCollection, prepaymentMarshalling);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentMarshalling);
      });

      it('should add only unique PrepaymentMarshalling to an array', () => {
        const prepaymentMarshallingArray: IPrepaymentMarshalling[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const prepaymentMarshallingCollection: IPrepaymentMarshalling[] = [sampleWithRequiredData];
        expectedResult = service.addPrepaymentMarshallingToCollectionIfMissing(
          prepaymentMarshallingCollection,
          ...prepaymentMarshallingArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const prepaymentMarshalling: IPrepaymentMarshalling = sampleWithRequiredData;
        const prepaymentMarshalling2: IPrepaymentMarshalling = sampleWithPartialData;
        expectedResult = service.addPrepaymentMarshallingToCollectionIfMissing([], prepaymentMarshalling, prepaymentMarshalling2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentMarshalling);
        expect(expectedResult).toContain(prepaymentMarshalling2);
      });

      it('should accept null and undefined values', () => {
        const prepaymentMarshalling: IPrepaymentMarshalling = sampleWithRequiredData;
        expectedResult = service.addPrepaymentMarshallingToCollectionIfMissing([], null, prepaymentMarshalling, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentMarshalling);
      });

      it('should return initial array if no PrepaymentMarshalling is added', () => {
        const prepaymentMarshallingCollection: IPrepaymentMarshalling[] = [sampleWithRequiredData];
        expectedResult = service.addPrepaymentMarshallingToCollectionIfMissing(prepaymentMarshallingCollection, undefined, null);
        expect(expectedResult).toEqual(prepaymentMarshallingCollection);
      });
    });

    describe('comparePrepaymentMarshalling', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePrepaymentMarshalling(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePrepaymentMarshalling(entity1, entity2);
        const compareResult2 = service.comparePrepaymentMarshalling(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePrepaymentMarshalling(entity1, entity2);
        const compareResult2 = service.comparePrepaymentMarshalling(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePrepaymentMarshalling(entity1, entity2);
        const compareResult2 = service.comparePrepaymentMarshalling(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
