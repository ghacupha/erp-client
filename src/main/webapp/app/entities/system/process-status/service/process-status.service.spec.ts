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

import { IProcessStatus } from '../process-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../process-status.test-samples';

import { ProcessStatusService } from './process-status.service';

const requireRestSample: IProcessStatus = {
  ...sampleWithRequiredData,
};

describe('ProcessStatus Service', () => {
  let service: ProcessStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: IProcessStatus | IProcessStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProcessStatusService);
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

    it('should create a ProcessStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const processStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(processStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProcessStatus', () => {
      const processStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(processStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProcessStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProcessStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProcessStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProcessStatusToCollectionIfMissing', () => {
      it('should add a ProcessStatus to an empty array', () => {
        const processStatus: IProcessStatus = sampleWithRequiredData;
        expectedResult = service.addProcessStatusToCollectionIfMissing([], processStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processStatus);
      });

      it('should not add a ProcessStatus to an array that contains it', () => {
        const processStatus: IProcessStatus = sampleWithRequiredData;
        const processStatusCollection: IProcessStatus[] = [
          {
            ...processStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, processStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProcessStatus to an array that doesn't contain it", () => {
        const processStatus: IProcessStatus = sampleWithRequiredData;
        const processStatusCollection: IProcessStatus[] = [sampleWithPartialData];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, processStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processStatus);
      });

      it('should add only unique ProcessStatus to an array', () => {
        const processStatusArray: IProcessStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const processStatusCollection: IProcessStatus[] = [sampleWithRequiredData];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, ...processStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const processStatus: IProcessStatus = sampleWithRequiredData;
        const processStatus2: IProcessStatus = sampleWithPartialData;
        expectedResult = service.addProcessStatusToCollectionIfMissing([], processStatus, processStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processStatus);
        expect(expectedResult).toContain(processStatus2);
      });

      it('should accept null and undefined values', () => {
        const processStatus: IProcessStatus = sampleWithRequiredData;
        expectedResult = service.addProcessStatusToCollectionIfMissing([], null, processStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processStatus);
      });

      it('should return initial array if no ProcessStatus is added', () => {
        const processStatusCollection: IProcessStatus[] = [sampleWithRequiredData];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, undefined, null);
        expect(expectedResult).toEqual(processStatusCollection);
      });
    });

    describe('compareProcessStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProcessStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProcessStatus(entity1, entity2);
        const compareResult2 = service.compareProcessStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProcessStatus(entity1, entity2);
        const compareResult2 = service.compareProcessStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProcessStatus(entity1, entity2);
        const compareResult2 = service.compareProcessStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
