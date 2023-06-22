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
import { ILeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../lease-liability-schedule-item.test-samples';

import { LeaseLiabilityScheduleItemService, RestLeaseLiabilityScheduleItem } from './lease-liability-schedule-item.service';

const requireRestSample: RestLeaseLiabilityScheduleItem = {
  ...sampleWithRequiredData,
  periodStartDate: sampleWithRequiredData.periodStartDate?.format(DATE_FORMAT),
  periodEndDate: sampleWithRequiredData.periodEndDate?.format(DATE_FORMAT),
};

describe('LeaseLiabilityScheduleItem Service', () => {
  let service: LeaseLiabilityScheduleItemService;
  let httpMock: HttpTestingController;
  let expectedResult: ILeaseLiabilityScheduleItem | ILeaseLiabilityScheduleItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LeaseLiabilityScheduleItemService);
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

    it('should create a LeaseLiabilityScheduleItem', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const leaseLiabilityScheduleItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(leaseLiabilityScheduleItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LeaseLiabilityScheduleItem', () => {
      const leaseLiabilityScheduleItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(leaseLiabilityScheduleItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LeaseLiabilityScheduleItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LeaseLiabilityScheduleItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LeaseLiabilityScheduleItem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLeaseLiabilityScheduleItemToCollectionIfMissing', () => {
      it('should add a LeaseLiabilityScheduleItem to an empty array', () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = sampleWithRequiredData;
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing([], leaseLiabilityScheduleItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem);
      });

      it('should not add a LeaseLiabilityScheduleItem to an array that contains it', () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = sampleWithRequiredData;
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [
          {
            ...leaseLiabilityScheduleItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(
          leaseLiabilityScheduleItemCollection,
          leaseLiabilityScheduleItem
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LeaseLiabilityScheduleItem to an array that doesn't contain it", () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = sampleWithRequiredData;
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [sampleWithPartialData];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(
          leaseLiabilityScheduleItemCollection,
          leaseLiabilityScheduleItem
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem);
      });

      it('should add only unique LeaseLiabilityScheduleItem to an array', () => {
        const leaseLiabilityScheduleItemArray: ILeaseLiabilityScheduleItem[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [sampleWithRequiredData];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(
          leaseLiabilityScheduleItemCollection,
          ...leaseLiabilityScheduleItemArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = sampleWithRequiredData;
        const leaseLiabilityScheduleItem2: ILeaseLiabilityScheduleItem = sampleWithPartialData;
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
        const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = sampleWithRequiredData;
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing([], null, leaseLiabilityScheduleItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseLiabilityScheduleItem);
      });

      it('should return initial array if no LeaseLiabilityScheduleItem is added', () => {
        const leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[] = [sampleWithRequiredData];
        expectedResult = service.addLeaseLiabilityScheduleItemToCollectionIfMissing(leaseLiabilityScheduleItemCollection, undefined, null);
        expect(expectedResult).toEqual(leaseLiabilityScheduleItemCollection);
      });
    });

    describe('compareLeaseLiabilityScheduleItem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLeaseLiabilityScheduleItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLeaseLiabilityScheduleItem(entity1, entity2);
        const compareResult2 = service.compareLeaseLiabilityScheduleItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLeaseLiabilityScheduleItem(entity1, entity2);
        const compareResult2 = service.compareLeaseLiabilityScheduleItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLeaseLiabilityScheduleItem(entity1, entity2);
        const compareResult2 = service.compareLeaseLiabilityScheduleItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
