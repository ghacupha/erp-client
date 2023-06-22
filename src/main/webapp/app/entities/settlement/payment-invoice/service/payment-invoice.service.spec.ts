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
import { IPaymentInvoice } from '../payment-invoice.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../payment-invoice.test-samples';

import { PaymentInvoiceService, RestPaymentInvoice } from './payment-invoice.service';

const requireRestSample: RestPaymentInvoice = {
  ...sampleWithRequiredData,
  invoiceDate: sampleWithRequiredData.invoiceDate?.format(DATE_FORMAT),
};

describe('PaymentInvoice Service', () => {
  let service: PaymentInvoiceService;
  let httpMock: HttpTestingController;
  let expectedResult: IPaymentInvoice | IPaymentInvoice[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaymentInvoiceService);
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

    it('should create a PaymentInvoice', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const paymentInvoice = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(paymentInvoice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PaymentInvoice', () => {
      const paymentInvoice = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(paymentInvoice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PaymentInvoice', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PaymentInvoice', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PaymentInvoice', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPaymentInvoiceToCollectionIfMissing', () => {
      it('should add a PaymentInvoice to an empty array', () => {
        const paymentInvoice: IPaymentInvoice = sampleWithRequiredData;
        expectedResult = service.addPaymentInvoiceToCollectionIfMissing([], paymentInvoice);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentInvoice);
      });

      it('should not add a PaymentInvoice to an array that contains it', () => {
        const paymentInvoice: IPaymentInvoice = sampleWithRequiredData;
        const paymentInvoiceCollection: IPaymentInvoice[] = [
          {
            ...paymentInvoice,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPaymentInvoiceToCollectionIfMissing(paymentInvoiceCollection, paymentInvoice);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PaymentInvoice to an array that doesn't contain it", () => {
        const paymentInvoice: IPaymentInvoice = sampleWithRequiredData;
        const paymentInvoiceCollection: IPaymentInvoice[] = [sampleWithPartialData];
        expectedResult = service.addPaymentInvoiceToCollectionIfMissing(paymentInvoiceCollection, paymentInvoice);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentInvoice);
      });

      it('should add only unique PaymentInvoice to an array', () => {
        const paymentInvoiceArray: IPaymentInvoice[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const paymentInvoiceCollection: IPaymentInvoice[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentInvoiceToCollectionIfMissing(paymentInvoiceCollection, ...paymentInvoiceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const paymentInvoice: IPaymentInvoice = sampleWithRequiredData;
        const paymentInvoice2: IPaymentInvoice = sampleWithPartialData;
        expectedResult = service.addPaymentInvoiceToCollectionIfMissing([], paymentInvoice, paymentInvoice2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentInvoice);
        expect(expectedResult).toContain(paymentInvoice2);
      });

      it('should accept null and undefined values', () => {
        const paymentInvoice: IPaymentInvoice = sampleWithRequiredData;
        expectedResult = service.addPaymentInvoiceToCollectionIfMissing([], null, paymentInvoice, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentInvoice);
      });

      it('should return initial array if no PaymentInvoice is added', () => {
        const paymentInvoiceCollection: IPaymentInvoice[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentInvoiceToCollectionIfMissing(paymentInvoiceCollection, undefined, null);
        expect(expectedResult).toEqual(paymentInvoiceCollection);
      });
    });

    describe('comparePaymentInvoice', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePaymentInvoice(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePaymentInvoice(entity1, entity2);
        const compareResult2 = service.comparePaymentInvoice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePaymentInvoice(entity1, entity2);
        const compareResult2 = service.comparePaymentInvoice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePaymentInvoice(entity1, entity2);
        const compareResult2 = service.comparePaymentInvoice(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
