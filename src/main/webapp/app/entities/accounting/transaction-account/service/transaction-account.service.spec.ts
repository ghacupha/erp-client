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

import { ITransactionAccount } from '../transaction-account.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../transaction-account.test-samples';

import { TransactionAccountService } from './transaction-account.service';

const requireRestSample: ITransactionAccount = {
  ...sampleWithRequiredData,
};

describe('TransactionAccount Service', () => {
  let service: TransactionAccountService;
  let httpMock: HttpTestingController;
  let expectedResult: ITransactionAccount | ITransactionAccount[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TransactionAccountService);
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

    it('should create a TransactionAccount', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const transactionAccount = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(transactionAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TransactionAccount', () => {
      const transactionAccount = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(transactionAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TransactionAccount', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TransactionAccount', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TransactionAccount', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTransactionAccountToCollectionIfMissing', () => {
      it('should add a TransactionAccount to an empty array', () => {
        const transactionAccount: ITransactionAccount = sampleWithRequiredData;
        expectedResult = service.addTransactionAccountToCollectionIfMissing([], transactionAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactionAccount);
      });

      it('should not add a TransactionAccount to an array that contains it', () => {
        const transactionAccount: ITransactionAccount = sampleWithRequiredData;
        const transactionAccountCollection: ITransactionAccount[] = [
          {
            ...transactionAccount,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTransactionAccountToCollectionIfMissing(transactionAccountCollection, transactionAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TransactionAccount to an array that doesn't contain it", () => {
        const transactionAccount: ITransactionAccount = sampleWithRequiredData;
        const transactionAccountCollection: ITransactionAccount[] = [sampleWithPartialData];
        expectedResult = service.addTransactionAccountToCollectionIfMissing(transactionAccountCollection, transactionAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactionAccount);
      });

      it('should add only unique TransactionAccount to an array', () => {
        const transactionAccountArray: ITransactionAccount[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const transactionAccountCollection: ITransactionAccount[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionAccountToCollectionIfMissing(transactionAccountCollection, ...transactionAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const transactionAccount: ITransactionAccount = sampleWithRequiredData;
        const transactionAccount2: ITransactionAccount = sampleWithPartialData;
        expectedResult = service.addTransactionAccountToCollectionIfMissing([], transactionAccount, transactionAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactionAccount);
        expect(expectedResult).toContain(transactionAccount2);
      });

      it('should accept null and undefined values', () => {
        const transactionAccount: ITransactionAccount = sampleWithRequiredData;
        expectedResult = service.addTransactionAccountToCollectionIfMissing([], null, transactionAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactionAccount);
      });

      it('should return initial array if no TransactionAccount is added', () => {
        const transactionAccountCollection: ITransactionAccount[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionAccountToCollectionIfMissing(transactionAccountCollection, undefined, null);
        expect(expectedResult).toEqual(transactionAccountCollection);
      });
    });

    describe('compareTransactionAccount', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTransactionAccount(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTransactionAccount(entity1, entity2);
        const compareResult2 = service.compareTransactionAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTransactionAccount(entity1, entity2);
        const compareResult2 = service.compareTransactionAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTransactionAccount(entity1, entity2);
        const compareResult2 = service.compareTransactionAccount(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
