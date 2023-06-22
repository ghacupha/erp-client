import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICountyCode } from '../county-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../county-code.test-samples';

import { CountyCodeService } from './county-code.service';

const requireRestSample: ICountyCode = {
  ...sampleWithRequiredData,
};

describe('CountyCode Service', () => {
  let service: CountyCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICountyCode | ICountyCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CountyCodeService);
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

    it('should create a CountyCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const countyCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(countyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CountyCode', () => {
      const countyCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(countyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CountyCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CountyCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CountyCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCountyCodeToCollectionIfMissing', () => {
      it('should add a CountyCode to an empty array', () => {
        const countyCode: ICountyCode = sampleWithRequiredData;
        expectedResult = service.addCountyCodeToCollectionIfMissing([], countyCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(countyCode);
      });

      it('should not add a CountyCode to an array that contains it', () => {
        const countyCode: ICountyCode = sampleWithRequiredData;
        const countyCodeCollection: ICountyCode[] = [
          {
            ...countyCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCountyCodeToCollectionIfMissing(countyCodeCollection, countyCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CountyCode to an array that doesn't contain it", () => {
        const countyCode: ICountyCode = sampleWithRequiredData;
        const countyCodeCollection: ICountyCode[] = [sampleWithPartialData];
        expectedResult = service.addCountyCodeToCollectionIfMissing(countyCodeCollection, countyCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(countyCode);
      });

      it('should add only unique CountyCode to an array', () => {
        const countyCodeArray: ICountyCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const countyCodeCollection: ICountyCode[] = [sampleWithRequiredData];
        expectedResult = service.addCountyCodeToCollectionIfMissing(countyCodeCollection, ...countyCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const countyCode: ICountyCode = sampleWithRequiredData;
        const countyCode2: ICountyCode = sampleWithPartialData;
        expectedResult = service.addCountyCodeToCollectionIfMissing([], countyCode, countyCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(countyCode);
        expect(expectedResult).toContain(countyCode2);
      });

      it('should accept null and undefined values', () => {
        const countyCode: ICountyCode = sampleWithRequiredData;
        expectedResult = service.addCountyCodeToCollectionIfMissing([], null, countyCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(countyCode);
      });

      it('should return initial array if no CountyCode is added', () => {
        const countyCodeCollection: ICountyCode[] = [sampleWithRequiredData];
        expectedResult = service.addCountyCodeToCollectionIfMissing(countyCodeCollection, undefined, null);
        expect(expectedResult).toEqual(countyCodeCollection);
      });
    });

    describe('compareCountyCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCountyCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCountyCode(entity1, entity2);
        const compareResult2 = service.compareCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCountyCode(entity1, entity2);
        const compareResult2 = service.compareCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCountyCode(entity1, entity2);
        const compareResult2 = service.compareCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
