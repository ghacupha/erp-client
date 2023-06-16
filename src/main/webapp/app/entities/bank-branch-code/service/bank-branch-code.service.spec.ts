import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBankBranchCode } from '../bank-branch-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../bank-branch-code.test-samples';

import { BankBranchCodeService } from './bank-branch-code.service';

const requireRestSample: IBankBranchCode = {
  ...sampleWithRequiredData,
};

describe('BankBranchCode Service', () => {
  let service: BankBranchCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IBankBranchCode | IBankBranchCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BankBranchCodeService);
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

    it('should create a BankBranchCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const bankBranchCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bankBranchCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BankBranchCode', () => {
      const bankBranchCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bankBranchCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BankBranchCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BankBranchCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BankBranchCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBankBranchCodeToCollectionIfMissing', () => {
      it('should add a BankBranchCode to an empty array', () => {
        const bankBranchCode: IBankBranchCode = sampleWithRequiredData;
        expectedResult = service.addBankBranchCodeToCollectionIfMissing([], bankBranchCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bankBranchCode);
      });

      it('should not add a BankBranchCode to an array that contains it', () => {
        const bankBranchCode: IBankBranchCode = sampleWithRequiredData;
        const bankBranchCodeCollection: IBankBranchCode[] = [
          {
            ...bankBranchCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBankBranchCodeToCollectionIfMissing(bankBranchCodeCollection, bankBranchCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BankBranchCode to an array that doesn't contain it", () => {
        const bankBranchCode: IBankBranchCode = sampleWithRequiredData;
        const bankBranchCodeCollection: IBankBranchCode[] = [sampleWithPartialData];
        expectedResult = service.addBankBranchCodeToCollectionIfMissing(bankBranchCodeCollection, bankBranchCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bankBranchCode);
      });

      it('should add only unique BankBranchCode to an array', () => {
        const bankBranchCodeArray: IBankBranchCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bankBranchCodeCollection: IBankBranchCode[] = [sampleWithRequiredData];
        expectedResult = service.addBankBranchCodeToCollectionIfMissing(bankBranchCodeCollection, ...bankBranchCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bankBranchCode: IBankBranchCode = sampleWithRequiredData;
        const bankBranchCode2: IBankBranchCode = sampleWithPartialData;
        expectedResult = service.addBankBranchCodeToCollectionIfMissing([], bankBranchCode, bankBranchCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bankBranchCode);
        expect(expectedResult).toContain(bankBranchCode2);
      });

      it('should accept null and undefined values', () => {
        const bankBranchCode: IBankBranchCode = sampleWithRequiredData;
        expectedResult = service.addBankBranchCodeToCollectionIfMissing([], null, bankBranchCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bankBranchCode);
      });

      it('should return initial array if no BankBranchCode is added', () => {
        const bankBranchCodeCollection: IBankBranchCode[] = [sampleWithRequiredData];
        expectedResult = service.addBankBranchCodeToCollectionIfMissing(bankBranchCodeCollection, undefined, null);
        expect(expectedResult).toEqual(bankBranchCodeCollection);
      });
    });

    describe('compareBankBranchCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBankBranchCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBankBranchCode(entity1, entity2);
        const compareResult2 = service.compareBankBranchCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBankBranchCode(entity1, entity2);
        const compareResult2 = service.compareBankBranchCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBankBranchCode(entity1, entity2);
        const compareResult2 = service.compareBankBranchCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
