import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPrepaymentAccount } from '../prepayment-account.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../prepayment-account.test-samples';

import { PrepaymentAccountService } from './prepayment-account.service';

const requireRestSample: IPrepaymentAccount = {
  ...sampleWithRequiredData,
};

describe('PrepaymentAccount Service', () => {
  let service: PrepaymentAccountService;
  let httpMock: HttpTestingController;
  let expectedResult: IPrepaymentAccount | IPrepaymentAccount[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrepaymentAccountService);
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

    it('should create a PrepaymentAccount', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const prepaymentAccount = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(prepaymentAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PrepaymentAccount', () => {
      const prepaymentAccount = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(prepaymentAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PrepaymentAccount', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PrepaymentAccount', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PrepaymentAccount', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPrepaymentAccountToCollectionIfMissing', () => {
      it('should add a PrepaymentAccount to an empty array', () => {
        const prepaymentAccount: IPrepaymentAccount = sampleWithRequiredData;
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing([], prepaymentAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentAccount);
      });

      it('should not add a PrepaymentAccount to an array that contains it', () => {
        const prepaymentAccount: IPrepaymentAccount = sampleWithRequiredData;
        const prepaymentAccountCollection: IPrepaymentAccount[] = [
          {
            ...prepaymentAccount,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, prepaymentAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PrepaymentAccount to an array that doesn't contain it", () => {
        const prepaymentAccount: IPrepaymentAccount = sampleWithRequiredData;
        const prepaymentAccountCollection: IPrepaymentAccount[] = [sampleWithPartialData];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, prepaymentAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentAccount);
      });

      it('should add only unique PrepaymentAccount to an array', () => {
        const prepaymentAccountArray: IPrepaymentAccount[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const prepaymentAccountCollection: IPrepaymentAccount[] = [sampleWithRequiredData];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, ...prepaymentAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const prepaymentAccount: IPrepaymentAccount = sampleWithRequiredData;
        const prepaymentAccount2: IPrepaymentAccount = sampleWithPartialData;
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing([], prepaymentAccount, prepaymentAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentAccount);
        expect(expectedResult).toContain(prepaymentAccount2);
      });

      it('should accept null and undefined values', () => {
        const prepaymentAccount: IPrepaymentAccount = sampleWithRequiredData;
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing([], null, prepaymentAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentAccount);
      });

      it('should return initial array if no PrepaymentAccount is added', () => {
        const prepaymentAccountCollection: IPrepaymentAccount[] = [sampleWithRequiredData];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, undefined, null);
        expect(expectedResult).toEqual(prepaymentAccountCollection);
      });
    });

    describe('comparePrepaymentAccount', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePrepaymentAccount(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePrepaymentAccount(entity1, entity2);
        const compareResult2 = service.comparePrepaymentAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePrepaymentAccount(entity1, entity2);
        const compareResult2 = service.comparePrepaymentAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePrepaymentAccount(entity1, entity2);
        const compareResult2 = service.comparePrepaymentAccount(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
