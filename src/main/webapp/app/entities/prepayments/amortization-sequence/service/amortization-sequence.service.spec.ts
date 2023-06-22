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
import { IAmortizationSequence } from '../amortization-sequence.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../amortization-sequence.test-samples';

import { AmortizationSequenceService, RestAmortizationSequence } from './amortization-sequence.service';

const requireRestSample: RestAmortizationSequence = {
  ...sampleWithRequiredData,
  currentAmortizationDate: sampleWithRequiredData.currentAmortizationDate?.format(DATE_FORMAT),
  previousAmortizationDate: sampleWithRequiredData.previousAmortizationDate?.format(DATE_FORMAT),
  nextAmortizationDate: sampleWithRequiredData.nextAmortizationDate?.format(DATE_FORMAT),
};

describe('AmortizationSequence Service', () => {
  let service: AmortizationSequenceService;
  let httpMock: HttpTestingController;
  let expectedResult: IAmortizationSequence | IAmortizationSequence[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AmortizationSequenceService);
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

    it('should create a AmortizationSequence', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const amortizationSequence = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(amortizationSequence).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AmortizationSequence', () => {
      const amortizationSequence = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(amortizationSequence).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AmortizationSequence', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AmortizationSequence', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AmortizationSequence', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAmortizationSequenceToCollectionIfMissing', () => {
      it('should add a AmortizationSequence to an empty array', () => {
        const amortizationSequence: IAmortizationSequence = sampleWithRequiredData;
        expectedResult = service.addAmortizationSequenceToCollectionIfMissing([], amortizationSequence);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(amortizationSequence);
      });

      it('should not add a AmortizationSequence to an array that contains it', () => {
        const amortizationSequence: IAmortizationSequence = sampleWithRequiredData;
        const amortizationSequenceCollection: IAmortizationSequence[] = [
          {
            ...amortizationSequence,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAmortizationSequenceToCollectionIfMissing(amortizationSequenceCollection, amortizationSequence);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AmortizationSequence to an array that doesn't contain it", () => {
        const amortizationSequence: IAmortizationSequence = sampleWithRequiredData;
        const amortizationSequenceCollection: IAmortizationSequence[] = [sampleWithPartialData];
        expectedResult = service.addAmortizationSequenceToCollectionIfMissing(amortizationSequenceCollection, amortizationSequence);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(amortizationSequence);
      });

      it('should add only unique AmortizationSequence to an array', () => {
        const amortizationSequenceArray: IAmortizationSequence[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const amortizationSequenceCollection: IAmortizationSequence[] = [sampleWithRequiredData];
        expectedResult = service.addAmortizationSequenceToCollectionIfMissing(amortizationSequenceCollection, ...amortizationSequenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const amortizationSequence: IAmortizationSequence = sampleWithRequiredData;
        const amortizationSequence2: IAmortizationSequence = sampleWithPartialData;
        expectedResult = service.addAmortizationSequenceToCollectionIfMissing([], amortizationSequence, amortizationSequence2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(amortizationSequence);
        expect(expectedResult).toContain(amortizationSequence2);
      });

      it('should accept null and undefined values', () => {
        const amortizationSequence: IAmortizationSequence = sampleWithRequiredData;
        expectedResult = service.addAmortizationSequenceToCollectionIfMissing([], null, amortizationSequence, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(amortizationSequence);
      });

      it('should return initial array if no AmortizationSequence is added', () => {
        const amortizationSequenceCollection: IAmortizationSequence[] = [sampleWithRequiredData];
        expectedResult = service.addAmortizationSequenceToCollectionIfMissing(amortizationSequenceCollection, undefined, null);
        expect(expectedResult).toEqual(amortizationSequenceCollection);
      });
    });

    describe('compareAmortizationSequence', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAmortizationSequence(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAmortizationSequence(entity1, entity2);
        const compareResult2 = service.compareAmortizationSequence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAmortizationSequence(entity1, entity2);
        const compareResult2 = service.compareAmortizationSequence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAmortizationSequence(entity1, entity2);
        const compareResult2 = service.compareAmortizationSequence(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
