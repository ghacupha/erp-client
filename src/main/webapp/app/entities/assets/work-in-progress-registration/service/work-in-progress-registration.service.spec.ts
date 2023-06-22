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

import { IWorkInProgressRegistration } from '../work-in-progress-registration.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../work-in-progress-registration.test-samples';

import { WorkInProgressRegistrationService } from './work-in-progress-registration.service';

const requireRestSample: IWorkInProgressRegistration = {
  ...sampleWithRequiredData,
};

describe('WorkInProgressRegistration Service', () => {
  let service: WorkInProgressRegistrationService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkInProgressRegistration | IWorkInProgressRegistration[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkInProgressRegistrationService);
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

    it('should create a WorkInProgressRegistration', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const workInProgressRegistration = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(workInProgressRegistration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkInProgressRegistration', () => {
      const workInProgressRegistration = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(workInProgressRegistration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkInProgressRegistration', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkInProgressRegistration', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkInProgressRegistration', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWorkInProgressRegistrationToCollectionIfMissing', () => {
      it('should add a WorkInProgressRegistration to an empty array', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = sampleWithRequiredData;
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing([], workInProgressRegistration);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressRegistration);
      });

      it('should not add a WorkInProgressRegistration to an array that contains it', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = sampleWithRequiredData;
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [
          {
            ...workInProgressRegistration,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          workInProgressRegistrationCollection,
          workInProgressRegistration
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkInProgressRegistration to an array that doesn't contain it", () => {
        const workInProgressRegistration: IWorkInProgressRegistration = sampleWithRequiredData;
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [sampleWithPartialData];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          workInProgressRegistrationCollection,
          workInProgressRegistration
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressRegistration);
      });

      it('should add only unique WorkInProgressRegistration to an array', () => {
        const workInProgressRegistrationArray: IWorkInProgressRegistration[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [sampleWithRequiredData];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          workInProgressRegistrationCollection,
          ...workInProgressRegistrationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = sampleWithRequiredData;
        const workInProgressRegistration2: IWorkInProgressRegistration = sampleWithPartialData;
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          [],
          workInProgressRegistration,
          workInProgressRegistration2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressRegistration);
        expect(expectedResult).toContain(workInProgressRegistration2);
      });

      it('should accept null and undefined values', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = sampleWithRequiredData;
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing([], null, workInProgressRegistration, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressRegistration);
      });

      it('should return initial array if no WorkInProgressRegistration is added', () => {
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [sampleWithRequiredData];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(workInProgressRegistrationCollection, undefined, null);
        expect(expectedResult).toEqual(workInProgressRegistrationCollection);
      });
    });

    describe('compareWorkInProgressRegistration', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkInProgressRegistration(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWorkInProgressRegistration(entity1, entity2);
        const compareResult2 = service.compareWorkInProgressRegistration(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWorkInProgressRegistration(entity1, entity2);
        const compareResult2 = service.compareWorkInProgressRegistration(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWorkInProgressRegistration(entity1, entity2);
        const compareResult2 = service.compareWorkInProgressRegistration(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
