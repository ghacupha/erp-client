import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDeliveryNote } from '../delivery-note.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../delivery-note.test-samples';

import { DeliveryNoteService, RestDeliveryNote } from './delivery-note.service';

const requireRestSample: RestDeliveryNote = {
  ...sampleWithRequiredData,
  documentDate: sampleWithRequiredData.documentDate?.format(DATE_FORMAT),
};

describe('DeliveryNote Service', () => {
  let service: DeliveryNoteService;
  let httpMock: HttpTestingController;
  let expectedResult: IDeliveryNote | IDeliveryNote[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DeliveryNoteService);
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

    it('should create a DeliveryNote', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deliveryNote = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(deliveryNote).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DeliveryNote', () => {
      const deliveryNote = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(deliveryNote).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DeliveryNote', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DeliveryNote', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DeliveryNote', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDeliveryNoteToCollectionIfMissing', () => {
      it('should add a DeliveryNote to an empty array', () => {
        const deliveryNote: IDeliveryNote = sampleWithRequiredData;
        expectedResult = service.addDeliveryNoteToCollectionIfMissing([], deliveryNote);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryNote);
      });

      it('should not add a DeliveryNote to an array that contains it', () => {
        const deliveryNote: IDeliveryNote = sampleWithRequiredData;
        const deliveryNoteCollection: IDeliveryNote[] = [
          {
            ...deliveryNote,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDeliveryNoteToCollectionIfMissing(deliveryNoteCollection, deliveryNote);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DeliveryNote to an array that doesn't contain it", () => {
        const deliveryNote: IDeliveryNote = sampleWithRequiredData;
        const deliveryNoteCollection: IDeliveryNote[] = [sampleWithPartialData];
        expectedResult = service.addDeliveryNoteToCollectionIfMissing(deliveryNoteCollection, deliveryNote);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryNote);
      });

      it('should add only unique DeliveryNote to an array', () => {
        const deliveryNoteArray: IDeliveryNote[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const deliveryNoteCollection: IDeliveryNote[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryNoteToCollectionIfMissing(deliveryNoteCollection, ...deliveryNoteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const deliveryNote: IDeliveryNote = sampleWithRequiredData;
        const deliveryNote2: IDeliveryNote = sampleWithPartialData;
        expectedResult = service.addDeliveryNoteToCollectionIfMissing([], deliveryNote, deliveryNote2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryNote);
        expect(expectedResult).toContain(deliveryNote2);
      });

      it('should accept null and undefined values', () => {
        const deliveryNote: IDeliveryNote = sampleWithRequiredData;
        expectedResult = service.addDeliveryNoteToCollectionIfMissing([], null, deliveryNote, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryNote);
      });

      it('should return initial array if no DeliveryNote is added', () => {
        const deliveryNoteCollection: IDeliveryNote[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryNoteToCollectionIfMissing(deliveryNoteCollection, undefined, null);
        expect(expectedResult).toEqual(deliveryNoteCollection);
      });
    });

    describe('compareDeliveryNote', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDeliveryNote(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDeliveryNote(entity1, entity2);
        const compareResult2 = service.compareDeliveryNote(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDeliveryNote(entity1, entity2);
        const compareResult2 = service.compareDeliveryNote(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDeliveryNote(entity1, entity2);
        const compareResult2 = service.compareDeliveryNote(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
