import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISubCountyCode } from '../sub-county-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../sub-county-code.test-samples';

import { SubCountyCodeService } from './sub-county-code.service';

const requireRestSample: ISubCountyCode = {
  ...sampleWithRequiredData,
};

describe('SubCountyCode Service', () => {
  let service: SubCountyCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: ISubCountyCode | ISubCountyCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SubCountyCodeService);
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

    it('should create a SubCountyCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const subCountyCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(subCountyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SubCountyCode', () => {
      const subCountyCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(subCountyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SubCountyCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SubCountyCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SubCountyCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSubCountyCodeToCollectionIfMissing', () => {
      it('should add a SubCountyCode to an empty array', () => {
        const subCountyCode: ISubCountyCode = sampleWithRequiredData;
        expectedResult = service.addSubCountyCodeToCollectionIfMissing([], subCountyCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subCountyCode);
      });

      it('should not add a SubCountyCode to an array that contains it', () => {
        const subCountyCode: ISubCountyCode = sampleWithRequiredData;
        const subCountyCodeCollection: ISubCountyCode[] = [
          {
            ...subCountyCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSubCountyCodeToCollectionIfMissing(subCountyCodeCollection, subCountyCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SubCountyCode to an array that doesn't contain it", () => {
        const subCountyCode: ISubCountyCode = sampleWithRequiredData;
        const subCountyCodeCollection: ISubCountyCode[] = [sampleWithPartialData];
        expectedResult = service.addSubCountyCodeToCollectionIfMissing(subCountyCodeCollection, subCountyCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subCountyCode);
      });

      it('should add only unique SubCountyCode to an array', () => {
        const subCountyCodeArray: ISubCountyCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const subCountyCodeCollection: ISubCountyCode[] = [sampleWithRequiredData];
        expectedResult = service.addSubCountyCodeToCollectionIfMissing(subCountyCodeCollection, ...subCountyCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const subCountyCode: ISubCountyCode = sampleWithRequiredData;
        const subCountyCode2: ISubCountyCode = sampleWithPartialData;
        expectedResult = service.addSubCountyCodeToCollectionIfMissing([], subCountyCode, subCountyCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subCountyCode);
        expect(expectedResult).toContain(subCountyCode2);
      });

      it('should accept null and undefined values', () => {
        const subCountyCode: ISubCountyCode = sampleWithRequiredData;
        expectedResult = service.addSubCountyCodeToCollectionIfMissing([], null, subCountyCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subCountyCode);
      });

      it('should return initial array if no SubCountyCode is added', () => {
        const subCountyCodeCollection: ISubCountyCode[] = [sampleWithRequiredData];
        expectedResult = service.addSubCountyCodeToCollectionIfMissing(subCountyCodeCollection, undefined, null);
        expect(expectedResult).toEqual(subCountyCodeCollection);
      });
    });

    describe('compareSubCountyCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSubCountyCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSubCountyCode(entity1, entity2);
        const compareResult2 = service.compareSubCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSubCountyCode(entity1, entity2);
        const compareResult2 = service.compareSubCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSubCountyCode(entity1, entity2);
        const compareResult2 = service.compareSubCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
