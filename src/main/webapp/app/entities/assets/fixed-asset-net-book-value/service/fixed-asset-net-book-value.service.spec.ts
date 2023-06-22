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
import { IFixedAssetNetBookValue } from '../fixed-asset-net-book-value.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../fixed-asset-net-book-value.test-samples';

import { FixedAssetNetBookValueService, RestFixedAssetNetBookValue } from './fixed-asset-net-book-value.service';

const requireRestSample: RestFixedAssetNetBookValue = {
  ...sampleWithRequiredData,
  netBookValueDate: sampleWithRequiredData.netBookValueDate?.format(DATE_FORMAT),
};

describe('FixedAssetNetBookValue Service', () => {
  let service: FixedAssetNetBookValueService;
  let httpMock: HttpTestingController;
  let expectedResult: IFixedAssetNetBookValue | IFixedAssetNetBookValue[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FixedAssetNetBookValueService);
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

    it('should create a FixedAssetNetBookValue', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fixedAssetNetBookValue = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fixedAssetNetBookValue).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FixedAssetNetBookValue', () => {
      const fixedAssetNetBookValue = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fixedAssetNetBookValue).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FixedAssetNetBookValue', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FixedAssetNetBookValue', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FixedAssetNetBookValue', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFixedAssetNetBookValueToCollectionIfMissing', () => {
      it('should add a FixedAssetNetBookValue to an empty array', () => {
        const fixedAssetNetBookValue: IFixedAssetNetBookValue = sampleWithRequiredData;
        expectedResult = service.addFixedAssetNetBookValueToCollectionIfMissing([], fixedAssetNetBookValue);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fixedAssetNetBookValue);
      });

      it('should not add a FixedAssetNetBookValue to an array that contains it', () => {
        const fixedAssetNetBookValue: IFixedAssetNetBookValue = sampleWithRequiredData;
        const fixedAssetNetBookValueCollection: IFixedAssetNetBookValue[] = [
          {
            ...fixedAssetNetBookValue,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFixedAssetNetBookValueToCollectionIfMissing(fixedAssetNetBookValueCollection, fixedAssetNetBookValue);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FixedAssetNetBookValue to an array that doesn't contain it", () => {
        const fixedAssetNetBookValue: IFixedAssetNetBookValue = sampleWithRequiredData;
        const fixedAssetNetBookValueCollection: IFixedAssetNetBookValue[] = [sampleWithPartialData];
        expectedResult = service.addFixedAssetNetBookValueToCollectionIfMissing(fixedAssetNetBookValueCollection, fixedAssetNetBookValue);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fixedAssetNetBookValue);
      });

      it('should add only unique FixedAssetNetBookValue to an array', () => {
        const fixedAssetNetBookValueArray: IFixedAssetNetBookValue[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fixedAssetNetBookValueCollection: IFixedAssetNetBookValue[] = [sampleWithRequiredData];
        expectedResult = service.addFixedAssetNetBookValueToCollectionIfMissing(
          fixedAssetNetBookValueCollection,
          ...fixedAssetNetBookValueArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fixedAssetNetBookValue: IFixedAssetNetBookValue = sampleWithRequiredData;
        const fixedAssetNetBookValue2: IFixedAssetNetBookValue = sampleWithPartialData;
        expectedResult = service.addFixedAssetNetBookValueToCollectionIfMissing([], fixedAssetNetBookValue, fixedAssetNetBookValue2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fixedAssetNetBookValue);
        expect(expectedResult).toContain(fixedAssetNetBookValue2);
      });

      it('should accept null and undefined values', () => {
        const fixedAssetNetBookValue: IFixedAssetNetBookValue = sampleWithRequiredData;
        expectedResult = service.addFixedAssetNetBookValueToCollectionIfMissing([], null, fixedAssetNetBookValue, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fixedAssetNetBookValue);
      });

      it('should return initial array if no FixedAssetNetBookValue is added', () => {
        const fixedAssetNetBookValueCollection: IFixedAssetNetBookValue[] = [sampleWithRequiredData];
        expectedResult = service.addFixedAssetNetBookValueToCollectionIfMissing(fixedAssetNetBookValueCollection, undefined, null);
        expect(expectedResult).toEqual(fixedAssetNetBookValueCollection);
      });
    });

    describe('compareFixedAssetNetBookValue', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFixedAssetNetBookValue(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFixedAssetNetBookValue(entity1, entity2);
        const compareResult2 = service.compareFixedAssetNetBookValue(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFixedAssetNetBookValue(entity1, entity2);
        const compareResult2 = service.compareFixedAssetNetBookValue(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFixedAssetNetBookValue(entity1, entity2);
        const compareResult2 = service.compareFixedAssetNetBookValue(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
