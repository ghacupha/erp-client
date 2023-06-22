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
import { IPaymentRequisition } from '../payment-requisition.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../payment-requisition.test-samples';

import { PaymentRequisitionService, RestPaymentRequisition } from './payment-requisition.service';

const requireRestSample: RestPaymentRequisition = {
  ...sampleWithRequiredData,
  receptionDate: sampleWithRequiredData.receptionDate?.format(DATE_FORMAT),
};

describe('PaymentRequisition Service', () => {
  let service: PaymentRequisitionService;
  let httpMock: HttpTestingController;
  let expectedResult: IPaymentRequisition | IPaymentRequisition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaymentRequisitionService);
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

    it('should create a PaymentRequisition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const paymentRequisition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(paymentRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PaymentRequisition', () => {
      const paymentRequisition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(paymentRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PaymentRequisition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PaymentRequisition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PaymentRequisition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPaymentRequisitionToCollectionIfMissing', () => {
      it('should add a PaymentRequisition to an empty array', () => {
        const paymentRequisition: IPaymentRequisition = sampleWithRequiredData;
        expectedResult = service.addPaymentRequisitionToCollectionIfMissing([], paymentRequisition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentRequisition);
      });

      it('should not add a PaymentRequisition to an array that contains it', () => {
        const paymentRequisition: IPaymentRequisition = sampleWithRequiredData;
        const paymentRequisitionCollection: IPaymentRequisition[] = [
          {
            ...paymentRequisition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPaymentRequisitionToCollectionIfMissing(paymentRequisitionCollection, paymentRequisition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PaymentRequisition to an array that doesn't contain it", () => {
        const paymentRequisition: IPaymentRequisition = sampleWithRequiredData;
        const paymentRequisitionCollection: IPaymentRequisition[] = [sampleWithPartialData];
        expectedResult = service.addPaymentRequisitionToCollectionIfMissing(paymentRequisitionCollection, paymentRequisition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentRequisition);
      });

      it('should add only unique PaymentRequisition to an array', () => {
        const paymentRequisitionArray: IPaymentRequisition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const paymentRequisitionCollection: IPaymentRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentRequisitionToCollectionIfMissing(paymentRequisitionCollection, ...paymentRequisitionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const paymentRequisition: IPaymentRequisition = sampleWithRequiredData;
        const paymentRequisition2: IPaymentRequisition = sampleWithPartialData;
        expectedResult = service.addPaymentRequisitionToCollectionIfMissing([], paymentRequisition, paymentRequisition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentRequisition);
        expect(expectedResult).toContain(paymentRequisition2);
      });

      it('should accept null and undefined values', () => {
        const paymentRequisition: IPaymentRequisition = sampleWithRequiredData;
        expectedResult = service.addPaymentRequisitionToCollectionIfMissing([], null, paymentRequisition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentRequisition);
      });

      it('should return initial array if no PaymentRequisition is added', () => {
        const paymentRequisitionCollection: IPaymentRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentRequisitionToCollectionIfMissing(paymentRequisitionCollection, undefined, null);
        expect(expectedResult).toEqual(paymentRequisitionCollection);
      });
    });

    describe('comparePaymentRequisition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePaymentRequisition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePaymentRequisition(entity1, entity2);
        const compareResult2 = service.comparePaymentRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePaymentRequisition(entity1, entity2);
        const compareResult2 = service.comparePaymentRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePaymentRequisition(entity1, entity2);
        const compareResult2 = service.comparePaymentRequisition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
