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

import { IDepreciationMethod } from '../depreciation-method.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../depreciation-method.test-samples';

import { DepreciationMethodService } from './depreciation-method.service';

const requireRestSample: IDepreciationMethod = {
  ...sampleWithRequiredData,
};

describe('DepreciationMethod Service', () => {
  let service: DepreciationMethodService;
  let httpMock: HttpTestingController;
  let expectedResult: IDepreciationMethod | IDepreciationMethod[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DepreciationMethodService);
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

    it('should create a DepreciationMethod', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const depreciationMethod = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(depreciationMethod).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DepreciationMethod', () => {
      const depreciationMethod = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(depreciationMethod).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DepreciationMethod', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DepreciationMethod', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DepreciationMethod', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDepreciationMethodToCollectionIfMissing', () => {
      it('should add a DepreciationMethod to an empty array', () => {
        const depreciationMethod: IDepreciationMethod = sampleWithRequiredData;
        expectedResult = service.addDepreciationMethodToCollectionIfMissing([], depreciationMethod);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(depreciationMethod);
      });

      it('should not add a DepreciationMethod to an array that contains it', () => {
        const depreciationMethod: IDepreciationMethod = sampleWithRequiredData;
        const depreciationMethodCollection: IDepreciationMethod[] = [
          {
            ...depreciationMethod,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDepreciationMethodToCollectionIfMissing(depreciationMethodCollection, depreciationMethod);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DepreciationMethod to an array that doesn't contain it", () => {
        const depreciationMethod: IDepreciationMethod = sampleWithRequiredData;
        const depreciationMethodCollection: IDepreciationMethod[] = [sampleWithPartialData];
        expectedResult = service.addDepreciationMethodToCollectionIfMissing(depreciationMethodCollection, depreciationMethod);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(depreciationMethod);
      });

      it('should add only unique DepreciationMethod to an array', () => {
        const depreciationMethodArray: IDepreciationMethod[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const depreciationMethodCollection: IDepreciationMethod[] = [sampleWithRequiredData];
        expectedResult = service.addDepreciationMethodToCollectionIfMissing(depreciationMethodCollection, ...depreciationMethodArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const depreciationMethod: IDepreciationMethod = sampleWithRequiredData;
        const depreciationMethod2: IDepreciationMethod = sampleWithPartialData;
        expectedResult = service.addDepreciationMethodToCollectionIfMissing([], depreciationMethod, depreciationMethod2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(depreciationMethod);
        expect(expectedResult).toContain(depreciationMethod2);
      });

      it('should accept null and undefined values', () => {
        const depreciationMethod: IDepreciationMethod = sampleWithRequiredData;
        expectedResult = service.addDepreciationMethodToCollectionIfMissing([], null, depreciationMethod, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(depreciationMethod);
      });

      it('should return initial array if no DepreciationMethod is added', () => {
        const depreciationMethodCollection: IDepreciationMethod[] = [sampleWithRequiredData];
        expectedResult = service.addDepreciationMethodToCollectionIfMissing(depreciationMethodCollection, undefined, null);
        expect(expectedResult).toEqual(depreciationMethodCollection);
      });
    });

    describe('compareDepreciationMethod', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDepreciationMethod(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDepreciationMethod(entity1, entity2);
        const compareResult2 = service.compareDepreciationMethod(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDepreciationMethod(entity1, entity2);
        const compareResult2 = service.compareDepreciationMethod(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDepreciationMethod(entity1, entity2);
        const compareResult2 = service.compareDepreciationMethod(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
