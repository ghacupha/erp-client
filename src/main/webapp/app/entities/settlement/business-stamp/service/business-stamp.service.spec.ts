import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IBusinessStamp } from '../business-stamp.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../business-stamp.test-samples';

import { BusinessStampService, RestBusinessStamp } from './business-stamp.service';

const requireRestSample: RestBusinessStamp = {
  ...sampleWithRequiredData,
  stampDate: sampleWithRequiredData.stampDate?.format(DATE_FORMAT),
};

describe('BusinessStamp Service', () => {
  let service: BusinessStampService;
  let httpMock: HttpTestingController;
  let expectedResult: IBusinessStamp | IBusinessStamp[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BusinessStampService);
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

    it('should create a BusinessStamp', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const businessStamp = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(businessStamp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BusinessStamp', () => {
      const businessStamp = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(businessStamp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BusinessStamp', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BusinessStamp', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BusinessStamp', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBusinessStampToCollectionIfMissing', () => {
      it('should add a BusinessStamp to an empty array', () => {
        const businessStamp: IBusinessStamp = sampleWithRequiredData;
        expectedResult = service.addBusinessStampToCollectionIfMissing([], businessStamp);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(businessStamp);
      });

      it('should not add a BusinessStamp to an array that contains it', () => {
        const businessStamp: IBusinessStamp = sampleWithRequiredData;
        const businessStampCollection: IBusinessStamp[] = [
          {
            ...businessStamp,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBusinessStampToCollectionIfMissing(businessStampCollection, businessStamp);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BusinessStamp to an array that doesn't contain it", () => {
        const businessStamp: IBusinessStamp = sampleWithRequiredData;
        const businessStampCollection: IBusinessStamp[] = [sampleWithPartialData];
        expectedResult = service.addBusinessStampToCollectionIfMissing(businessStampCollection, businessStamp);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(businessStamp);
      });

      it('should add only unique BusinessStamp to an array', () => {
        const businessStampArray: IBusinessStamp[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const businessStampCollection: IBusinessStamp[] = [sampleWithRequiredData];
        expectedResult = service.addBusinessStampToCollectionIfMissing(businessStampCollection, ...businessStampArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const businessStamp: IBusinessStamp = sampleWithRequiredData;
        const businessStamp2: IBusinessStamp = sampleWithPartialData;
        expectedResult = service.addBusinessStampToCollectionIfMissing([], businessStamp, businessStamp2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(businessStamp);
        expect(expectedResult).toContain(businessStamp2);
      });

      it('should accept null and undefined values', () => {
        const businessStamp: IBusinessStamp = sampleWithRequiredData;
        expectedResult = service.addBusinessStampToCollectionIfMissing([], null, businessStamp, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(businessStamp);
      });

      it('should return initial array if no BusinessStamp is added', () => {
        const businessStampCollection: IBusinessStamp[] = [sampleWithRequiredData];
        expectedResult = service.addBusinessStampToCollectionIfMissing(businessStampCollection, undefined, null);
        expect(expectedResult).toEqual(businessStampCollection);
      });
    });

    describe('compareBusinessStamp', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBusinessStamp(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBusinessStamp(entity1, entity2);
        const compareResult2 = service.compareBusinessStamp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBusinessStamp(entity1, entity2);
        const compareResult2 = service.compareBusinessStamp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBusinessStamp(entity1, entity2);
        const compareResult2 = service.compareBusinessStamp(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
