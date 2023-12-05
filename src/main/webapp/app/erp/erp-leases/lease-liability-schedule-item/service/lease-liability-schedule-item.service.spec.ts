///
/// Erp System - Mark VIII No 3 (Hilkiah Series) Client 1.6.2
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
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILeaseLiabilityScheduleItem, LeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';

import { LeaseLiabilityScheduleItemService } from './lease-liability-schedule-item.service';

describe('LeaseLiabilityScheduleItem Service', () => {
  let service: LeaseLiabilityScheduleItemService;
  let httpMock: HttpTestingController;
  let elemDefault: ILeaseLiabilityScheduleItem;
  let expectedResult: ILeaseLiabilityScheduleItem | ILeaseLiabilityScheduleItem[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LeaseLiabilityScheduleItemService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      sequenceNumber: 0,
      periodIncluded: false,
      periodStartDate: currentDate,
      periodEndDate: currentDate,
      openingBalance: 0,
      cashPayment: 0,
      principalPayment: 0,
      interestPayment: 0,
      outstandingBalance: 0,
      interestPayableOpening: 0,
      interestExpenseAccrued: 0,
      interestPayableBalance: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          periodStartDate: currentDate.format(DATE_FORMAT),
          periodEndDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a LeaseLiabilityScheduleItem', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          periodStartDate: currentDate.format(DATE_FORMAT),
          periodEndDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          periodStartDate: currentDate,
          periodEndDate: currentDate,
        },
        returnedFromService
      );

      service.create(new LeaseLiabilityScheduleItem()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LeaseLiabilityScheduleItem', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sequenceNumber: 1,
          periodIncluded: true,
          periodStartDate: currentDate.format(DATE_FORMAT),
          periodEndDate: currentDate.format(DATE_FORMAT),
          openingBalance: 1,
          cashPayment: 1,
          principalPayment: 1,
          interestPayment: 1,
          outstandingBalance: 1,
          interestPayableOpening: 1,
          interestExpenseAccrued: 1,
          interestPayableBalance: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          periodStartDate: currentDate,
          periodEndDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LeaseLiabilityScheduleItem', () => {
      const patchObject = Object.assign(
        {
          sequenceNumber: 1,
          cashPayment: 1,
          outstandingBalance: 1,
          interestExpenseAccrued: 1,
        },
        new LeaseLiabilityScheduleItem()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          periodStartDate: currentDate,
          periodEndDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LeaseLiabilityScheduleItem', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sequenceNumber: 1,
          periodIncluded: true,
          periodStartDate: currentDate.format(DATE_FORMAT),
          periodEndDate: currentDate.format(DATE_FORMAT),
          openingBalance: 1,
          cashPayment: 1,
          principalPayment: 1,
          interestPayment: 1,
          outstandingBalance: 1,
          interestPayableOpening: 1,
          interestExpenseAccrued: 1,
          interestPayableBalance: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          periodStartDate: currentDate,
          periodEndDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a LeaseLiabilityScheduleItem', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLeaseLiabilityScheduleItemToCollectionIfMissing', () => {
      it('should add a LeaseLiabilityScheduleItem to an empty array', () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 123 };
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing([], leaseLiabilityScheduleItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem);
      });

      it('should not add a LeaseLiabilityScheduleItem to an array that contains it', () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 123 };
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [
          {
            ...leaseLiabilityScheduleItem,
          },
          { id: 456 },
        ];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(
          leaseLiabilityScheduleItemCollection,
          leaseLiabilityScheduleItem
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LeaseLiabilityScheduleItem to an array that doesn't contain it", () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 123 };
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [{ id: 456 }];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(
          leaseLiabilityScheduleItemCollection,
          leaseLiabilityScheduleItem
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem);
      });

      it('should add only unique LeaseLiabilityScheduleItem to an array', () => {
        const leaseLiabilityScheduleItemArray: ILeaseLiabilityScheduleItem[] = [{ id: 123 }, { id: 456 }, { id: 36464 }];
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [{ id: 123 }];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(
          leaseLiabilityScheduleItemCollection,
          ...leaseLiabilityScheduleItemArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 123 };
        const leaseLiabilityScheduleItem2: ILeaseLiabilityScheduleItem = { id: 456 };
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(
          [],
          leaseLiabilityScheduleItem,
          leaseLiabilityScheduleItem2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem2);
      });

      it('should accept null and undefined values', () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 123 };
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing([], null, leaseLiabilityScheduleItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem);
      });

      it('should return initial array if no LeaseLiabilityScheduleItem is added', () => {
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [{ id: 123 }];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(leaseLiabilityScheduleItemCollection, undefined, null);
        expect(expectedResult).toEqual(leaseLiabilityScheduleItemCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
