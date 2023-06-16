import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMessageToken } from '../message-token.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../message-token.test-samples';

import { MessageTokenService } from './message-token.service';

const requireRestSample: IMessageToken = {
  ...sampleWithRequiredData,
};

describe('MessageToken Service', () => {
  let service: MessageTokenService;
  let httpMock: HttpTestingController;
  let expectedResult: IMessageToken | IMessageToken[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MessageTokenService);
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

    it('should create a MessageToken', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const messageToken = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(messageToken).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MessageToken', () => {
      const messageToken = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(messageToken).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MessageToken', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MessageToken', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MessageToken', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMessageTokenToCollectionIfMissing', () => {
      it('should add a MessageToken to an empty array', () => {
        const messageToken: IMessageToken = sampleWithRequiredData;
        expectedResult = service.addMessageTokenToCollectionIfMissing([], messageToken);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(messageToken);
      });

      it('should not add a MessageToken to an array that contains it', () => {
        const messageToken: IMessageToken = sampleWithRequiredData;
        const messageTokenCollection: IMessageToken[] = [
          {
            ...messageToken,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMessageTokenToCollectionIfMissing(messageTokenCollection, messageToken);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MessageToken to an array that doesn't contain it", () => {
        const messageToken: IMessageToken = sampleWithRequiredData;
        const messageTokenCollection: IMessageToken[] = [sampleWithPartialData];
        expectedResult = service.addMessageTokenToCollectionIfMissing(messageTokenCollection, messageToken);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(messageToken);
      });

      it('should add only unique MessageToken to an array', () => {
        const messageTokenArray: IMessageToken[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const messageTokenCollection: IMessageToken[] = [sampleWithRequiredData];
        expectedResult = service.addMessageTokenToCollectionIfMissing(messageTokenCollection, ...messageTokenArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const messageToken: IMessageToken = sampleWithRequiredData;
        const messageToken2: IMessageToken = sampleWithPartialData;
        expectedResult = service.addMessageTokenToCollectionIfMissing([], messageToken, messageToken2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(messageToken);
        expect(expectedResult).toContain(messageToken2);
      });

      it('should accept null and undefined values', () => {
        const messageToken: IMessageToken = sampleWithRequiredData;
        expectedResult = service.addMessageTokenToCollectionIfMissing([], null, messageToken, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(messageToken);
      });

      it('should return initial array if no MessageToken is added', () => {
        const messageTokenCollection: IMessageToken[] = [sampleWithRequiredData];
        expectedResult = service.addMessageTokenToCollectionIfMissing(messageTokenCollection, undefined, null);
        expect(expectedResult).toEqual(messageTokenCollection);
      });
    });

    describe('compareMessageToken', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMessageToken(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMessageToken(entity1, entity2);
        const compareResult2 = service.compareMessageToken(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMessageToken(entity1, entity2);
        const compareResult2 = service.compareMessageToken(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMessageToken(entity1, entity2);
        const compareResult2 = service.compareMessageToken(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
