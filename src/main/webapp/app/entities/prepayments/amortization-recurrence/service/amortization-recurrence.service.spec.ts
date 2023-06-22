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
import { IAmortizationRecurrence } from '../amortization-recurrence.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../amortization-recurrence.test-samples';

import { AmortizationRecurrenceService, RestAmortizationRecurrence } from './amortization-recurrence.service';

const requireRestSample: RestAmortizationRecurrence = {
  ...sampleWithRequiredData,
  firstAmortizationDate: sampleWithRequiredData.firstAmortizationDate?.format(DATE_FORMAT),
  timeOfInstallation: sampleWithRequiredData.timeOfInstallation?.toJSON(),
};

describe('AmortizationRecurrence Service', () => {
  let service: AmortizationRecurrenceService;
  let httpMock: HttpTestingController;
  let expectedResult: IAmortizationRecurrence | IAmortizationRecurrence[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AmortizationRecurrenceService);
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

    it('should create a AmortizationRecurrence', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const amortizationRecurrence = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(amortizationRecurrence).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AmortizationRecurrence', () => {
      const amortizationRecurrence = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(amortizationRecurrence).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AmortizationRecurrence', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AmortizationRecurrence', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AmortizationRecurrence', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAmortizationRecurrenceToCollectionIfMissing', () => {
      it('should add a AmortizationRecurrence to an empty array', () => {
        const amortizationRecurrence: IAmortizationRecurrence = sampleWithRequiredData;
        expectedResult = service.addAmortizationRecurrenceToCollectionIfMissing([], amortizationRecurrence);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(amortizationRecurrence);
      });

      it('should not add a AmortizationRecurrence to an array that contains it', () => {
        const amortizationRecurrence: IAmortizationRecurrence = sampleWithRequiredData;
        const amortizationRecurrenceCollection: IAmortizationRecurrence[] = [
          {
            ...amortizationRecurrence,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAmortizationRecurrenceToCollectionIfMissing(amortizationRecurrenceCollection, amortizationRecurrence);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AmortizationRecurrence to an array that doesn't contain it", () => {
        const amortizationRecurrence: IAmortizationRecurrence = sampleWithRequiredData;
        const amortizationRecurrenceCollection: IAmortizationRecurrence[] = [sampleWithPartialData];
        expectedResult = service.addAmortizationRecurrenceToCollectionIfMissing(amortizationRecurrenceCollection, amortizationRecurrence);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(amortizationRecurrence);
      });

      it('should add only unique AmortizationRecurrence to an array', () => {
        const amortizationRecurrenceArray: IAmortizationRecurrence[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const amortizationRecurrenceCollection: IAmortizationRecurrence[] = [sampleWithRequiredData];
        expectedResult = service.addAmortizationRecurrenceToCollectionIfMissing(
          amortizationRecurrenceCollection,
          ...amortizationRecurrenceArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const amortizationRecurrence: IAmortizationRecurrence = sampleWithRequiredData;
        const amortizationRecurrence2: IAmortizationRecurrence = sampleWithPartialData;
        expectedResult = service.addAmortizationRecurrenceToCollectionIfMissing([], amortizationRecurrence, amortizationRecurrence2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(amortizationRecurrence);
        expect(expectedResult).toContain(amortizationRecurrence2);
      });

      it('should accept null and undefined values', () => {
        const amortizationRecurrence: IAmortizationRecurrence = sampleWithRequiredData;
        expectedResult = service.addAmortizationRecurrenceToCollectionIfMissing([], null, amortizationRecurrence, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(amortizationRecurrence);
      });

      it('should return initial array if no AmortizationRecurrence is added', () => {
        const amortizationRecurrenceCollection: IAmortizationRecurrence[] = [sampleWithRequiredData];
        expectedResult = service.addAmortizationRecurrenceToCollectionIfMissing(amortizationRecurrenceCollection, undefined, null);
        expect(expectedResult).toEqual(amortizationRecurrenceCollection);
      });
    });

    describe('compareAmortizationRecurrence', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAmortizationRecurrence(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAmortizationRecurrence(entity1, entity2);
        const compareResult2 = service.compareAmortizationRecurrence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAmortizationRecurrence(entity1, entity2);
        const compareResult2 = service.compareAmortizationRecurrence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAmortizationRecurrence(entity1, entity2);
        const compareResult2 = service.compareAmortizationRecurrence(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
