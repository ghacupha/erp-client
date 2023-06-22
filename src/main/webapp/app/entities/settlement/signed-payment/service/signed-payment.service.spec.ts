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
import { ISignedPayment } from '../signed-payment.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../signed-payment.test-samples';

import { SignedPaymentService, RestSignedPayment } from './signed-payment.service';

const requireRestSample: RestSignedPayment = {
  ...sampleWithRequiredData,
  transactionDate: sampleWithRequiredData.transactionDate?.format(DATE_FORMAT),
};

describe('SignedPayment Service', () => {
  let service: SignedPaymentService;
  let httpMock: HttpTestingController;
  let expectedResult: ISignedPayment | ISignedPayment[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SignedPaymentService);
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

    it('should create a SignedPayment', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const signedPayment = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(signedPayment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SignedPayment', () => {
      const signedPayment = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(signedPayment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SignedPayment', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SignedPayment', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SignedPayment', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSignedPaymentToCollectionIfMissing', () => {
      it('should add a SignedPayment to an empty array', () => {
        const signedPayment: ISignedPayment = sampleWithRequiredData;
        expectedResult = service.addSignedPaymentToCollectionIfMissing([], signedPayment);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(signedPayment);
      });

      it('should not add a SignedPayment to an array that contains it', () => {
        const signedPayment: ISignedPayment = sampleWithRequiredData;
        const signedPaymentCollection: ISignedPayment[] = [
          {
            ...signedPayment,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSignedPaymentToCollectionIfMissing(signedPaymentCollection, signedPayment);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SignedPayment to an array that doesn't contain it", () => {
        const signedPayment: ISignedPayment = sampleWithRequiredData;
        const signedPaymentCollection: ISignedPayment[] = [sampleWithPartialData];
        expectedResult = service.addSignedPaymentToCollectionIfMissing(signedPaymentCollection, signedPayment);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(signedPayment);
      });

      it('should add only unique SignedPayment to an array', () => {
        const signedPaymentArray: ISignedPayment[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const signedPaymentCollection: ISignedPayment[] = [sampleWithRequiredData];
        expectedResult = service.addSignedPaymentToCollectionIfMissing(signedPaymentCollection, ...signedPaymentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const signedPayment: ISignedPayment = sampleWithRequiredData;
        const signedPayment2: ISignedPayment = sampleWithPartialData;
        expectedResult = service.addSignedPaymentToCollectionIfMissing([], signedPayment, signedPayment2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(signedPayment);
        expect(expectedResult).toContain(signedPayment2);
      });

      it('should accept null and undefined values', () => {
        const signedPayment: ISignedPayment = sampleWithRequiredData;
        expectedResult = service.addSignedPaymentToCollectionIfMissing([], null, signedPayment, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(signedPayment);
      });

      it('should return initial array if no SignedPayment is added', () => {
        const signedPaymentCollection: ISignedPayment[] = [sampleWithRequiredData];
        expectedResult = service.addSignedPaymentToCollectionIfMissing(signedPaymentCollection, undefined, null);
        expect(expectedResult).toEqual(signedPaymentCollection);
      });
    });

    describe('compareSignedPayment', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSignedPayment(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSignedPayment(entity1, entity2);
        const compareResult2 = service.compareSignedPayment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSignedPayment(entity1, entity2);
        const compareResult2 = service.compareSignedPayment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSignedPayment(entity1, entity2);
        const compareResult2 = service.compareSignedPayment(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
