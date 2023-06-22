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

import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../universally-unique-mapping.test-samples';

import { UniversallyUniqueMappingService } from './universally-unique-mapping.service';

const requireRestSample: IUniversallyUniqueMapping = {
  ...sampleWithRequiredData,
};

describe('UniversallyUniqueMapping Service', () => {
  let service: UniversallyUniqueMappingService;
  let httpMock: HttpTestingController;
  let expectedResult: IUniversallyUniqueMapping | IUniversallyUniqueMapping[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UniversallyUniqueMappingService);
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

    it('should create a UniversallyUniqueMapping', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const universallyUniqueMapping = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(universallyUniqueMapping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UniversallyUniqueMapping', () => {
      const universallyUniqueMapping = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(universallyUniqueMapping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UniversallyUniqueMapping', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UniversallyUniqueMapping', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UniversallyUniqueMapping', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUniversallyUniqueMappingToCollectionIfMissing', () => {
      it('should add a UniversallyUniqueMapping to an empty array', () => {
        const universallyUniqueMapping: IUniversallyUniqueMapping = sampleWithRequiredData;
        expectedResult = service.addUniversallyUniqueMappingToCollectionIfMissing([], universallyUniqueMapping);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(universallyUniqueMapping);
      });

      it('should not add a UniversallyUniqueMapping to an array that contains it', () => {
        const universallyUniqueMapping: IUniversallyUniqueMapping = sampleWithRequiredData;
        const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [
          {
            ...universallyUniqueMapping,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUniversallyUniqueMappingToCollectionIfMissing(
          universallyUniqueMappingCollection,
          universallyUniqueMapping
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UniversallyUniqueMapping to an array that doesn't contain it", () => {
        const universallyUniqueMapping: IUniversallyUniqueMapping = sampleWithRequiredData;
        const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [sampleWithPartialData];
        expectedResult = service.addUniversallyUniqueMappingToCollectionIfMissing(
          universallyUniqueMappingCollection,
          universallyUniqueMapping
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(universallyUniqueMapping);
      });

      it('should add only unique UniversallyUniqueMapping to an array', () => {
        const universallyUniqueMappingArray: IUniversallyUniqueMapping[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [sampleWithRequiredData];
        expectedResult = service.addUniversallyUniqueMappingToCollectionIfMissing(
          universallyUniqueMappingCollection,
          ...universallyUniqueMappingArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const universallyUniqueMapping: IUniversallyUniqueMapping = sampleWithRequiredData;
        const universallyUniqueMapping2: IUniversallyUniqueMapping = sampleWithPartialData;
        expectedResult = service.addUniversallyUniqueMappingToCollectionIfMissing([], universallyUniqueMapping, universallyUniqueMapping2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(universallyUniqueMapping);
        expect(expectedResult).toContain(universallyUniqueMapping2);
      });

      it('should accept null and undefined values', () => {
        const universallyUniqueMapping: IUniversallyUniqueMapping = sampleWithRequiredData;
        expectedResult = service.addUniversallyUniqueMappingToCollectionIfMissing([], null, universallyUniqueMapping, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(universallyUniqueMapping);
      });

      it('should return initial array if no UniversallyUniqueMapping is added', () => {
        const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [sampleWithRequiredData];
        expectedResult = service.addUniversallyUniqueMappingToCollectionIfMissing(universallyUniqueMappingCollection, undefined, null);
        expect(expectedResult).toEqual(universallyUniqueMappingCollection);
      });
    });

    describe('compareUniversallyUniqueMapping', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUniversallyUniqueMapping(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUniversallyUniqueMapping(entity1, entity2);
        const compareResult2 = service.compareUniversallyUniqueMapping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUniversallyUniqueMapping(entity1, entity2);
        const compareResult2 = service.compareUniversallyUniqueMapping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUniversallyUniqueMapping(entity1, entity2);
        const compareResult2 = service.compareUniversallyUniqueMapping(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
