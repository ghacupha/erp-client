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

import { IWorkInProgressTransfer } from '../work-in-progress-transfer.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../work-in-progress-transfer.test-samples';

import { WorkInProgressTransferService } from './work-in-progress-transfer.service';

const requireRestSample: IWorkInProgressTransfer = {
  ...sampleWithRequiredData,
};

describe('WorkInProgressTransfer Service', () => {
  let service: WorkInProgressTransferService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkInProgressTransfer | IWorkInProgressTransfer[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkInProgressTransferService);
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

    it('should create a WorkInProgressTransfer', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const workInProgressTransfer = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(workInProgressTransfer).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkInProgressTransfer', () => {
      const workInProgressTransfer = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(workInProgressTransfer).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkInProgressTransfer', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkInProgressTransfer', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkInProgressTransfer', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWorkInProgressTransferToCollectionIfMissing', () => {
      it('should add a WorkInProgressTransfer to an empty array', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = sampleWithRequiredData;
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing([], workInProgressTransfer);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressTransfer);
      });

      it('should not add a WorkInProgressTransfer to an array that contains it', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = sampleWithRequiredData;
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [
          {
            ...workInProgressTransfer,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(workInProgressTransferCollection, workInProgressTransfer);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkInProgressTransfer to an array that doesn't contain it", () => {
        const workInProgressTransfer: IWorkInProgressTransfer = sampleWithRequiredData;
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [sampleWithPartialData];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(workInProgressTransferCollection, workInProgressTransfer);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressTransfer);
      });

      it('should add only unique WorkInProgressTransfer to an array', () => {
        const workInProgressTransferArray: IWorkInProgressTransfer[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [sampleWithRequiredData];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(
          workInProgressTransferCollection,
          ...workInProgressTransferArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = sampleWithRequiredData;
        const workInProgressTransfer2: IWorkInProgressTransfer = sampleWithPartialData;
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing([], workInProgressTransfer, workInProgressTransfer2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressTransfer);
        expect(expectedResult).toContain(workInProgressTransfer2);
      });

      it('should accept null and undefined values', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = sampleWithRequiredData;
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing([], null, workInProgressTransfer, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressTransfer);
      });

      it('should return initial array if no WorkInProgressTransfer is added', () => {
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [sampleWithRequiredData];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(workInProgressTransferCollection, undefined, null);
        expect(expectedResult).toEqual(workInProgressTransferCollection);
      });
    });

    describe('compareWorkInProgressTransfer', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkInProgressTransfer(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWorkInProgressTransfer(entity1, entity2);
        const compareResult2 = service.compareWorkInProgressTransfer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWorkInProgressTransfer(entity1, entity2);
        const compareResult2 = service.compareWorkInProgressTransfer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWorkInProgressTransfer(entity1, entity2);
        const compareResult2 = service.compareWorkInProgressTransfer(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
