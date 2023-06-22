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

import { IQuestionBase } from '../question-base.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../question-base.test-samples';

import { QuestionBaseService } from './question-base.service';

const requireRestSample: IQuestionBase = {
  ...sampleWithRequiredData,
};

describe('QuestionBase Service', () => {
  let service: QuestionBaseService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuestionBase | IQuestionBase[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(QuestionBaseService);
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

    it('should create a QuestionBase', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const questionBase = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(questionBase).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuestionBase', () => {
      const questionBase = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(questionBase).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuestionBase', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuestionBase', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuestionBase', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuestionBaseToCollectionIfMissing', () => {
      it('should add a QuestionBase to an empty array', () => {
        const questionBase: IQuestionBase = sampleWithRequiredData;
        expectedResult = service.addQuestionBaseToCollectionIfMissing([], questionBase);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(questionBase);
      });

      it('should not add a QuestionBase to an array that contains it', () => {
        const questionBase: IQuestionBase = sampleWithRequiredData;
        const questionBaseCollection: IQuestionBase[] = [
          {
            ...questionBase,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuestionBaseToCollectionIfMissing(questionBaseCollection, questionBase);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuestionBase to an array that doesn't contain it", () => {
        const questionBase: IQuestionBase = sampleWithRequiredData;
        const questionBaseCollection: IQuestionBase[] = [sampleWithPartialData];
        expectedResult = service.addQuestionBaseToCollectionIfMissing(questionBaseCollection, questionBase);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(questionBase);
      });

      it('should add only unique QuestionBase to an array', () => {
        const questionBaseArray: IQuestionBase[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const questionBaseCollection: IQuestionBase[] = [sampleWithRequiredData];
        expectedResult = service.addQuestionBaseToCollectionIfMissing(questionBaseCollection, ...questionBaseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const questionBase: IQuestionBase = sampleWithRequiredData;
        const questionBase2: IQuestionBase = sampleWithPartialData;
        expectedResult = service.addQuestionBaseToCollectionIfMissing([], questionBase, questionBase2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(questionBase);
        expect(expectedResult).toContain(questionBase2);
      });

      it('should accept null and undefined values', () => {
        const questionBase: IQuestionBase = sampleWithRequiredData;
        expectedResult = service.addQuestionBaseToCollectionIfMissing([], null, questionBase, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(questionBase);
      });

      it('should return initial array if no QuestionBase is added', () => {
        const questionBaseCollection: IQuestionBase[] = [sampleWithRequiredData];
        expectedResult = service.addQuestionBaseToCollectionIfMissing(questionBaseCollection, undefined, null);
        expect(expectedResult).toEqual(questionBaseCollection);
      });
    });

    describe('compareQuestionBase', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuestionBase(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuestionBase(entity1, entity2);
        const compareResult2 = service.compareQuestionBase(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuestionBase(entity1, entity2);
        const compareResult2 = service.compareQuestionBase(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuestionBase(entity1, entity2);
        const compareResult2 = service.compareQuestionBase(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
