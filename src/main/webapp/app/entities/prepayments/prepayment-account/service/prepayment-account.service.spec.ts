import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPrepaymentAccount, PrepaymentAccount } from '../prepayment-account.model';

import { PrepaymentAccountService } from './prepayment-account.service';

describe('PrepaymentAccount Service', () => {
  let service: PrepaymentAccountService;
  let httpMock: HttpTestingController;
  let elemDefault: IPrepaymentAccount;
  let expectedResult: IPrepaymentAccount | IPrepaymentAccount[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrepaymentAccountService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      catalogueNumber: 'AAAAAAA',
      recognitionDate: currentDate,
      particulars: 'AAAAAAA',
      notes: 'AAAAAAA',
      prepaymentAmount: 0,
      prepaymentGuid: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          recognitionDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a PrepaymentAccount', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          recognitionDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          recognitionDate: currentDate,
        },
        returnedFromService
      );

      service.create(new PrepaymentAccount()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PrepaymentAccount', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          catalogueNumber: 'BBBBBB',
          recognitionDate: currentDate.format(DATE_FORMAT),
          particulars: 'BBBBBB',
          notes: 'BBBBBB',
          prepaymentAmount: 1,
          prepaymentGuid: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          recognitionDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PrepaymentAccount', () => {
      const patchObject = Object.assign(
        {
          catalogueNumber: 'BBBBBB',
          prepaymentGuid: 'BBBBBB',
        },
        new PrepaymentAccount()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          recognitionDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PrepaymentAccount', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          catalogueNumber: 'BBBBBB',
          recognitionDate: currentDate.format(DATE_FORMAT),
          particulars: 'BBBBBB',
          notes: 'BBBBBB',
          prepaymentAmount: 1,
          prepaymentGuid: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          recognitionDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a PrepaymentAccount', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPrepaymentAccountToCollectionIfMissing', () => {
      it('should add a PrepaymentAccount to an empty array', () => {
        const prepaymentAccount: IPrepaymentAccount = { id: 123 };
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing([], prepaymentAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentAccount);
      });

      it('should not add a PrepaymentAccount to an array that contains it', () => {
        const prepaymentAccount: IPrepaymentAccount = { id: 123 };
        const prepaymentAccountCollection: IPrepaymentAccount[] = [
          {
            ...prepaymentAccount,
          },
          { id: 456 },
        ];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, prepaymentAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PrepaymentAccount to an array that doesn't contain it", () => {
        const prepaymentAccount: IPrepaymentAccount = { id: 123 };
        const prepaymentAccountCollection: IPrepaymentAccount[] = [{ id: 456 }];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, prepaymentAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentAccount);
      });

      it('should add only unique PrepaymentAccount to an array', () => {
        const prepaymentAccountArray: IPrepaymentAccount[] = [{ id: 123 }, { id: 456 }, { id: 55750 }];
        const prepaymentAccountCollection: IPrepaymentAccount[] = [{ id: 123 }];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, ...prepaymentAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const prepaymentAccount: IPrepaymentAccount = { id: 123 };
        const prepaymentAccount2: IPrepaymentAccount = { id: 456 };
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing([], prepaymentAccount, prepaymentAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prepaymentAccount);
        expect(expectedResult).toContain(prepaymentAccount2);
      });

      it('should accept null and undefined values', () => {
        const prepaymentAccount: IPrepaymentAccount = { id: 123 };
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing([], null, prepaymentAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prepaymentAccount);
      });

      it('should return initial array if no PrepaymentAccount is added', () => {
        const prepaymentAccountCollection: IPrepaymentAccount[] = [{ id: 123 }];
        expectedResult = service.addPrepaymentAccountToCollectionIfMissing(prepaymentAccountCollection, undefined, null);
        expect(expectedResult).toEqual(prepaymentAccountCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
