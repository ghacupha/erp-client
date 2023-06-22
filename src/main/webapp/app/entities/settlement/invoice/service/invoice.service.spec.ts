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
import { IInvoice } from '../invoice.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../invoice.test-samples';

import { InvoiceService, RestInvoice } from './invoice.service';

const requireRestSample: RestInvoice = {
  ...sampleWithRequiredData,
  invoiceDate: sampleWithRequiredData.invoiceDate?.format(DATE_FORMAT),
};

describe('Invoice Service', () => {
  let service: InvoiceService;
  let httpMock: HttpTestingController;
  let expectedResult: IInvoice | IInvoice[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InvoiceService);
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

    it('should create a Invoice', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const invoice = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(invoice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Invoice', () => {
      const invoice = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(invoice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Invoice', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Invoice', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Invoice', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInvoiceToCollectionIfMissing', () => {
      it('should add a Invoice to an empty array', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        expectedResult = service.addInvoiceToCollectionIfMissing([], invoice);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(invoice);
      });

      it('should not add a Invoice to an array that contains it', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        const invoiceCollection: IInvoice[] = [
          {
            ...invoice,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, invoice);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Invoice to an array that doesn't contain it", () => {
        const invoice: IInvoice = sampleWithRequiredData;
        const invoiceCollection: IInvoice[] = [sampleWithPartialData];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, invoice);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(invoice);
      });

      it('should add only unique Invoice to an array', () => {
        const invoiceArray: IInvoice[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const invoiceCollection: IInvoice[] = [sampleWithRequiredData];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, ...invoiceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        const invoice2: IInvoice = sampleWithPartialData;
        expectedResult = service.addInvoiceToCollectionIfMissing([], invoice, invoice2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(invoice);
        expect(expectedResult).toContain(invoice2);
      });

      it('should accept null and undefined values', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        expectedResult = service.addInvoiceToCollectionIfMissing([], null, invoice, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(invoice);
      });

      it('should return initial array if no Invoice is added', () => {
        const invoiceCollection: IInvoice[] = [sampleWithRequiredData];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, undefined, null);
        expect(expectedResult).toEqual(invoiceCollection);
      });
    });

    describe('compareInvoice', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInvoice(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInvoice(entity1, entity2);
        const compareResult2 = service.compareInvoice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInvoice(entity1, entity2);
        const compareResult2 = service.compareInvoice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInvoice(entity1, entity2);
        const compareResult2 = service.compareInvoice(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
