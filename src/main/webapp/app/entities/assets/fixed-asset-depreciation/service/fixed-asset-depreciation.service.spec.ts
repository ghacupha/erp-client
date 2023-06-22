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
import { IFixedAssetDepreciation } from '../fixed-asset-depreciation.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../fixed-asset-depreciation.test-samples';

import { FixedAssetDepreciationService, RestFixedAssetDepreciation } from './fixed-asset-depreciation.service';

const requireRestSample: RestFixedAssetDepreciation = {
  ...sampleWithRequiredData,
  depreciationDate: sampleWithRequiredData.depreciationDate?.format(DATE_FORMAT),
};

describe('FixedAssetDepreciation Service', () => {
  let service: FixedAssetDepreciationService;
  let httpMock: HttpTestingController;
  let expectedResult: IFixedAssetDepreciation | IFixedAssetDepreciation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FixedAssetDepreciationService);
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

    it('should create a FixedAssetDepreciation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fixedAssetDepreciation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fixedAssetDepreciation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FixedAssetDepreciation', () => {
      const fixedAssetDepreciation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fixedAssetDepreciation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FixedAssetDepreciation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FixedAssetDepreciation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FixedAssetDepreciation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFixedAssetDepreciationToCollectionIfMissing', () => {
      it('should add a FixedAssetDepreciation to an empty array', () => {
        const fixedAssetDepreciation: IFixedAssetDepreciation = sampleWithRequiredData;
        expectedResult = service.addFixedAssetDepreciationToCollectionIfMissing([], fixedAssetDepreciation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fixedAssetDepreciation);
      });

      it('should not add a FixedAssetDepreciation to an array that contains it', () => {
        const fixedAssetDepreciation: IFixedAssetDepreciation = sampleWithRequiredData;
        const fixedAssetDepreciationCollection: IFixedAssetDepreciation[] = [
          {
            ...fixedAssetDepreciation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFixedAssetDepreciationToCollectionIfMissing(fixedAssetDepreciationCollection, fixedAssetDepreciation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FixedAssetDepreciation to an array that doesn't contain it", () => {
        const fixedAssetDepreciation: IFixedAssetDepreciation = sampleWithRequiredData;
        const fixedAssetDepreciationCollection: IFixedAssetDepreciation[] = [sampleWithPartialData];
        expectedResult = service.addFixedAssetDepreciationToCollectionIfMissing(fixedAssetDepreciationCollection, fixedAssetDepreciation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fixedAssetDepreciation);
      });

      it('should add only unique FixedAssetDepreciation to an array', () => {
        const fixedAssetDepreciationArray: IFixedAssetDepreciation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fixedAssetDepreciationCollection: IFixedAssetDepreciation[] = [sampleWithRequiredData];
        expectedResult = service.addFixedAssetDepreciationToCollectionIfMissing(
          fixedAssetDepreciationCollection,
          ...fixedAssetDepreciationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fixedAssetDepreciation: IFixedAssetDepreciation = sampleWithRequiredData;
        const fixedAssetDepreciation2: IFixedAssetDepreciation = sampleWithPartialData;
        expectedResult = service.addFixedAssetDepreciationToCollectionIfMissing([], fixedAssetDepreciation, fixedAssetDepreciation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fixedAssetDepreciation);
        expect(expectedResult).toContain(fixedAssetDepreciation2);
      });

      it('should accept null and undefined values', () => {
        const fixedAssetDepreciation: IFixedAssetDepreciation = sampleWithRequiredData;
        expectedResult = service.addFixedAssetDepreciationToCollectionIfMissing([], null, fixedAssetDepreciation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fixedAssetDepreciation);
      });

      it('should return initial array if no FixedAssetDepreciation is added', () => {
        const fixedAssetDepreciationCollection: IFixedAssetDepreciation[] = [sampleWithRequiredData];
        expectedResult = service.addFixedAssetDepreciationToCollectionIfMissing(fixedAssetDepreciationCollection, undefined, null);
        expect(expectedResult).toEqual(fixedAssetDepreciationCollection);
      });
    });

    describe('compareFixedAssetDepreciation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFixedAssetDepreciation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFixedAssetDepreciation(entity1, entity2);
        const compareResult2 = service.compareFixedAssetDepreciation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFixedAssetDepreciation(entity1, entity2);
        const compareResult2 = service.compareFixedAssetDepreciation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFixedAssetDepreciation(entity1, entity2);
        const compareResult2 = service.compareFixedAssetDepreciation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
