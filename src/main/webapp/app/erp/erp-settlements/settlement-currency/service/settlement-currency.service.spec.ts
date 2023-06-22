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

import { ISettlementCurrency } from '../settlement-currency.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../settlement-currency.test-samples';

import { SettlementCurrencyService } from './settlement-currency.service';

const requireRestSample: ISettlementCurrency = {
  ...sampleWithRequiredData,
};

describe('SettlementCurrency Service', () => {
  let service: SettlementCurrencyService;
  let httpMock: HttpTestingController;
  let expectedResult: ISettlementCurrency | ISettlementCurrency[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SettlementCurrencyService);
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

    it('should create a SettlementCurrency', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const settlementCurrency = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(settlementCurrency).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SettlementCurrency', () => {
      const settlementCurrency = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(settlementCurrency).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SettlementCurrency', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SettlementCurrency', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SettlementCurrency', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSettlementCurrencyToCollectionIfMissing', () => {
      it('should add a SettlementCurrency to an empty array', () => {
        const settlementCurrency: ISettlementCurrency = sampleWithRequiredData;
        expectedResult = service.addSettlementCurrencyToCollectionIfMissing([], settlementCurrency);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(settlementCurrency);
      });

      it('should not add a SettlementCurrency to an array that contains it', () => {
        const settlementCurrency: ISettlementCurrency = sampleWithRequiredData;
        const settlementCurrencyCollection: ISettlementCurrency[] = [
          {
            ...settlementCurrency,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSettlementCurrencyToCollectionIfMissing(settlementCurrencyCollection, settlementCurrency);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SettlementCurrency to an array that doesn't contain it", () => {
        const settlementCurrency: ISettlementCurrency = sampleWithRequiredData;
        const settlementCurrencyCollection: ISettlementCurrency[] = [sampleWithPartialData];
        expectedResult = service.addSettlementCurrencyToCollectionIfMissing(settlementCurrencyCollection, settlementCurrency);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(settlementCurrency);
      });

      it('should add only unique SettlementCurrency to an array', () => {
        const settlementCurrencyArray: ISettlementCurrency[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const settlementCurrencyCollection: ISettlementCurrency[] = [sampleWithRequiredData];
        expectedResult = service.addSettlementCurrencyToCollectionIfMissing(settlementCurrencyCollection, ...settlementCurrencyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const settlementCurrency: ISettlementCurrency = sampleWithRequiredData;
        const settlementCurrency2: ISettlementCurrency = sampleWithPartialData;
        expectedResult = service.addSettlementCurrencyToCollectionIfMissing([], settlementCurrency, settlementCurrency2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(settlementCurrency);
        expect(expectedResult).toContain(settlementCurrency2);
      });

      it('should accept null and undefined values', () => {
        const settlementCurrency: ISettlementCurrency = sampleWithRequiredData;
        expectedResult = service.addSettlementCurrencyToCollectionIfMissing([], null, settlementCurrency, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(settlementCurrency);
      });

      it('should return initial array if no SettlementCurrency is added', () => {
        const settlementCurrencyCollection: ISettlementCurrency[] = [sampleWithRequiredData];
        expectedResult = service.addSettlementCurrencyToCollectionIfMissing(settlementCurrencyCollection, undefined, null);
        expect(expectedResult).toEqual(settlementCurrencyCollection);
      });
    });

    describe('compareSettlementCurrency', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSettlementCurrency(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSettlementCurrency(entity1, entity2);
        const compareResult2 = service.compareSettlementCurrency(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSettlementCurrency(entity1, entity2);
        const compareResult2 = service.compareSettlementCurrency(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSettlementCurrency(entity1, entity2);
        const compareResult2 = service.compareSettlementCurrency(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
