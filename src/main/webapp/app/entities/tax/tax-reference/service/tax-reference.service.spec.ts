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

import { ITaxReference } from '../tax-reference.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tax-reference.test-samples';

import { TaxReferenceService } from './tax-reference.service';

const requireRestSample: ITaxReference = {
  ...sampleWithRequiredData,
};

describe('TaxReference Service', () => {
  let service: TaxReferenceService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaxReference | ITaxReference[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TaxReferenceService);
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

    it('should create a TaxReference', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const taxReference = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taxReference).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaxReference', () => {
      const taxReference = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taxReference).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaxReference', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaxReference', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaxReference', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaxReferenceToCollectionIfMissing', () => {
      it('should add a TaxReference to an empty array', () => {
        const taxReference: ITaxReference = sampleWithRequiredData;
        expectedResult = service.addTaxReferenceToCollectionIfMissing([], taxReference);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taxReference);
      });

      it('should not add a TaxReference to an array that contains it', () => {
        const taxReference: ITaxReference = sampleWithRequiredData;
        const taxReferenceCollection: ITaxReference[] = [
          {
            ...taxReference,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, taxReference);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaxReference to an array that doesn't contain it", () => {
        const taxReference: ITaxReference = sampleWithRequiredData;
        const taxReferenceCollection: ITaxReference[] = [sampleWithPartialData];
        expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, taxReference);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taxReference);
      });

      it('should add only unique TaxReference to an array', () => {
        const taxReferenceArray: ITaxReference[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taxReferenceCollection: ITaxReference[] = [sampleWithRequiredData];
        expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, ...taxReferenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taxReference: ITaxReference = sampleWithRequiredData;
        const taxReference2: ITaxReference = sampleWithPartialData;
        expectedResult = service.addTaxReferenceToCollectionIfMissing([], taxReference, taxReference2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taxReference);
        expect(expectedResult).toContain(taxReference2);
      });

      it('should accept null and undefined values', () => {
        const taxReference: ITaxReference = sampleWithRequiredData;
        expectedResult = service.addTaxReferenceToCollectionIfMissing([], null, taxReference, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taxReference);
      });

      it('should return initial array if no TaxReference is added', () => {
        const taxReferenceCollection: ITaxReference[] = [sampleWithRequiredData];
        expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, undefined, null);
        expect(expectedResult).toEqual(taxReferenceCollection);
      });
    });

    describe('compareTaxReference', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaxReference(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaxReference(entity1, entity2);
        const compareResult2 = service.compareTaxReference(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaxReference(entity1, entity2);
        const compareResult2 = service.compareTaxReference(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaxReference(entity1, entity2);
        const compareResult2 = service.compareTaxReference(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
