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

import { ICustomerIDDocumentType } from '../customer-id-document-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../customer-id-document-type.test-samples';

import { CustomerIDDocumentTypeService } from './customer-id-document-type.service';

const requireRestSample: ICustomerIDDocumentType = {
  ...sampleWithRequiredData,
};

describe('CustomerIDDocumentType Service', () => {
  let service: CustomerIDDocumentTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICustomerIDDocumentType | ICustomerIDDocumentType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CustomerIDDocumentTypeService);
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

    it('should create a CustomerIDDocumentType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customerIDDocumentType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(customerIDDocumentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CustomerIDDocumentType', () => {
      const customerIDDocumentType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(customerIDDocumentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CustomerIDDocumentType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CustomerIDDocumentType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CustomerIDDocumentType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCustomerIDDocumentTypeToCollectionIfMissing', () => {
      it('should add a CustomerIDDocumentType to an empty array', () => {
        const customerIDDocumentType: ICustomerIDDocumentType = sampleWithRequiredData;
        expectedResult = service.addCustomerIDDocumentTypeToCollectionIfMissing([], customerIDDocumentType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerIDDocumentType);
      });

      it('should not add a CustomerIDDocumentType to an array that contains it', () => {
        const customerIDDocumentType: ICustomerIDDocumentType = sampleWithRequiredData;
        const customerIDDocumentTypeCollection: ICustomerIDDocumentType[] = [
          {
            ...customerIDDocumentType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCustomerIDDocumentTypeToCollectionIfMissing(customerIDDocumentTypeCollection, customerIDDocumentType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CustomerIDDocumentType to an array that doesn't contain it", () => {
        const customerIDDocumentType: ICustomerIDDocumentType = sampleWithRequiredData;
        const customerIDDocumentTypeCollection: ICustomerIDDocumentType[] = [sampleWithPartialData];
        expectedResult = service.addCustomerIDDocumentTypeToCollectionIfMissing(customerIDDocumentTypeCollection, customerIDDocumentType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerIDDocumentType);
      });

      it('should add only unique CustomerIDDocumentType to an array', () => {
        const customerIDDocumentTypeArray: ICustomerIDDocumentType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const customerIDDocumentTypeCollection: ICustomerIDDocumentType[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerIDDocumentTypeToCollectionIfMissing(
          customerIDDocumentTypeCollection,
          ...customerIDDocumentTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const customerIDDocumentType: ICustomerIDDocumentType = sampleWithRequiredData;
        const customerIDDocumentType2: ICustomerIDDocumentType = sampleWithPartialData;
        expectedResult = service.addCustomerIDDocumentTypeToCollectionIfMissing([], customerIDDocumentType, customerIDDocumentType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerIDDocumentType);
        expect(expectedResult).toContain(customerIDDocumentType2);
      });

      it('should accept null and undefined values', () => {
        const customerIDDocumentType: ICustomerIDDocumentType = sampleWithRequiredData;
        expectedResult = service.addCustomerIDDocumentTypeToCollectionIfMissing([], null, customerIDDocumentType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerIDDocumentType);
      });

      it('should return initial array if no CustomerIDDocumentType is added', () => {
        const customerIDDocumentTypeCollection: ICustomerIDDocumentType[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerIDDocumentTypeToCollectionIfMissing(customerIDDocumentTypeCollection, undefined, null);
        expect(expectedResult).toEqual(customerIDDocumentTypeCollection);
      });
    });

    describe('compareCustomerIDDocumentType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCustomerIDDocumentType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCustomerIDDocumentType(entity1, entity2);
        const compareResult2 = service.compareCustomerIDDocumentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCustomerIDDocumentType(entity1, entity2);
        const compareResult2 = service.compareCustomerIDDocumentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCustomerIDDocumentType(entity1, entity2);
        const compareResult2 = service.compareCustomerIDDocumentType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
