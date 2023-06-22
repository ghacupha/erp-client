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
import { ICreditNote } from '../credit-note.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../credit-note.test-samples';

import { CreditNoteService, RestCreditNote } from './credit-note.service';

const requireRestSample: RestCreditNote = {
  ...sampleWithRequiredData,
  creditNoteDate: sampleWithRequiredData.creditNoteDate?.format(DATE_FORMAT),
};

describe('CreditNote Service', () => {
  let service: CreditNoteService;
  let httpMock: HttpTestingController;
  let expectedResult: ICreditNote | ICreditNote[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CreditNoteService);
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

    it('should create a CreditNote', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const creditNote = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(creditNote).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CreditNote', () => {
      const creditNote = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(creditNote).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CreditNote', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CreditNote', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CreditNote', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCreditNoteToCollectionIfMissing', () => {
      it('should add a CreditNote to an empty array', () => {
        const creditNote: ICreditNote = sampleWithRequiredData;
        expectedResult = service.addCreditNoteToCollectionIfMissing([], creditNote);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditNote);
      });

      it('should not add a CreditNote to an array that contains it', () => {
        const creditNote: ICreditNote = sampleWithRequiredData;
        const creditNoteCollection: ICreditNote[] = [
          {
            ...creditNote,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCreditNoteToCollectionIfMissing(creditNoteCollection, creditNote);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CreditNote to an array that doesn't contain it", () => {
        const creditNote: ICreditNote = sampleWithRequiredData;
        const creditNoteCollection: ICreditNote[] = [sampleWithPartialData];
        expectedResult = service.addCreditNoteToCollectionIfMissing(creditNoteCollection, creditNote);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditNote);
      });

      it('should add only unique CreditNote to an array', () => {
        const creditNoteArray: ICreditNote[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const creditNoteCollection: ICreditNote[] = [sampleWithRequiredData];
        expectedResult = service.addCreditNoteToCollectionIfMissing(creditNoteCollection, ...creditNoteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const creditNote: ICreditNote = sampleWithRequiredData;
        const creditNote2: ICreditNote = sampleWithPartialData;
        expectedResult = service.addCreditNoteToCollectionIfMissing([], creditNote, creditNote2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditNote);
        expect(expectedResult).toContain(creditNote2);
      });

      it('should accept null and undefined values', () => {
        const creditNote: ICreditNote = sampleWithRequiredData;
        expectedResult = service.addCreditNoteToCollectionIfMissing([], null, creditNote, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditNote);
      });

      it('should return initial array if no CreditNote is added', () => {
        const creditNoteCollection: ICreditNote[] = [sampleWithRequiredData];
        expectedResult = service.addCreditNoteToCollectionIfMissing(creditNoteCollection, undefined, null);
        expect(expectedResult).toEqual(creditNoteCollection);
      });
    });

    describe('compareCreditNote', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCreditNote(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCreditNote(entity1, entity2);
        const compareResult2 = service.compareCreditNote(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCreditNote(entity1, entity2);
        const compareResult2 = service.compareCreditNote(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCreditNote(entity1, entity2);
        const compareResult2 = service.compareCreditNote(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
