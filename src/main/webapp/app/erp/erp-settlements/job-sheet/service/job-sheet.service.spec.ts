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
import { IJobSheet } from '../job-sheet.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../job-sheet.test-samples';

import { JobSheetService, RestJobSheet } from './job-sheet.service';

const requireRestSample: RestJobSheet = {
  ...sampleWithRequiredData,
  jobSheetDate: sampleWithRequiredData.jobSheetDate?.format(DATE_FORMAT),
};

describe('JobSheet Service', () => {
  let service: JobSheetService;
  let httpMock: HttpTestingController;
  let expectedResult: IJobSheet | IJobSheet[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(JobSheetService);
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

    it('should create a JobSheet', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jobSheet = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(jobSheet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a JobSheet', () => {
      const jobSheet = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(jobSheet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a JobSheet', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of JobSheet', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a JobSheet', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addJobSheetToCollectionIfMissing', () => {
      it('should add a JobSheet to an empty array', () => {
        const jobSheet: IJobSheet = sampleWithRequiredData;
        expectedResult = service.addJobSheetToCollectionIfMissing([], jobSheet);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobSheet);
      });

      it('should not add a JobSheet to an array that contains it', () => {
        const jobSheet: IJobSheet = sampleWithRequiredData;
        const jobSheetCollection: IJobSheet[] = [
          {
            ...jobSheet,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addJobSheetToCollectionIfMissing(jobSheetCollection, jobSheet);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a JobSheet to an array that doesn't contain it", () => {
        const jobSheet: IJobSheet = sampleWithRequiredData;
        const jobSheetCollection: IJobSheet[] = [sampleWithPartialData];
        expectedResult = service.addJobSheetToCollectionIfMissing(jobSheetCollection, jobSheet);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobSheet);
      });

      it('should add only unique JobSheet to an array', () => {
        const jobSheetArray: IJobSheet[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const jobSheetCollection: IJobSheet[] = [sampleWithRequiredData];
        expectedResult = service.addJobSheetToCollectionIfMissing(jobSheetCollection, ...jobSheetArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const jobSheet: IJobSheet = sampleWithRequiredData;
        const jobSheet2: IJobSheet = sampleWithPartialData;
        expectedResult = service.addJobSheetToCollectionIfMissing([], jobSheet, jobSheet2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobSheet);
        expect(expectedResult).toContain(jobSheet2);
      });

      it('should accept null and undefined values', () => {
        const jobSheet: IJobSheet = sampleWithRequiredData;
        expectedResult = service.addJobSheetToCollectionIfMissing([], null, jobSheet, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobSheet);
      });

      it('should return initial array if no JobSheet is added', () => {
        const jobSheetCollection: IJobSheet[] = [sampleWithRequiredData];
        expectedResult = service.addJobSheetToCollectionIfMissing(jobSheetCollection, undefined, null);
        expect(expectedResult).toEqual(jobSheetCollection);
      });
    });

    describe('compareJobSheet', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareJobSheet(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareJobSheet(entity1, entity2);
        const compareResult2 = service.compareJobSheet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareJobSheet(entity1, entity2);
        const compareResult2 = service.compareJobSheet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareJobSheet(entity1, entity2);
        const compareResult2 = service.compareJobSheet(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
