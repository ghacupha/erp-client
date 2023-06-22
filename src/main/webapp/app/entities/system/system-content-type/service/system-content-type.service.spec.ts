import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISystemContentType } from '../system-content-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../system-content-type.test-samples';

import { SystemContentTypeService } from './system-content-type.service';

const requireRestSample: ISystemContentType = {
  ...sampleWithRequiredData,
};

describe('SystemContentType Service', () => {
  let service: SystemContentTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ISystemContentType | ISystemContentType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SystemContentTypeService);
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

    it('should create a SystemContentType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const systemContentType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(systemContentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SystemContentType', () => {
      const systemContentType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(systemContentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SystemContentType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SystemContentType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SystemContentType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSystemContentTypeToCollectionIfMissing', () => {
      it('should add a SystemContentType to an empty array', () => {
        const systemContentType: ISystemContentType = sampleWithRequiredData;
        expectedResult = service.addSystemContentTypeToCollectionIfMissing([], systemContentType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(systemContentType);
      });

      it('should not add a SystemContentType to an array that contains it', () => {
        const systemContentType: ISystemContentType = sampleWithRequiredData;
        const systemContentTypeCollection: ISystemContentType[] = [
          {
            ...systemContentType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSystemContentTypeToCollectionIfMissing(systemContentTypeCollection, systemContentType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SystemContentType to an array that doesn't contain it", () => {
        const systemContentType: ISystemContentType = sampleWithRequiredData;
        const systemContentTypeCollection: ISystemContentType[] = [sampleWithPartialData];
        expectedResult = service.addSystemContentTypeToCollectionIfMissing(systemContentTypeCollection, systemContentType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(systemContentType);
      });

      it('should add only unique SystemContentType to an array', () => {
        const systemContentTypeArray: ISystemContentType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const systemContentTypeCollection: ISystemContentType[] = [sampleWithRequiredData];
        expectedResult = service.addSystemContentTypeToCollectionIfMissing(systemContentTypeCollection, ...systemContentTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const systemContentType: ISystemContentType = sampleWithRequiredData;
        const systemContentType2: ISystemContentType = sampleWithPartialData;
        expectedResult = service.addSystemContentTypeToCollectionIfMissing([], systemContentType, systemContentType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(systemContentType);
        expect(expectedResult).toContain(systemContentType2);
      });

      it('should accept null and undefined values', () => {
        const systemContentType: ISystemContentType = sampleWithRequiredData;
        expectedResult = service.addSystemContentTypeToCollectionIfMissing([], null, systemContentType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(systemContentType);
      });

      it('should return initial array if no SystemContentType is added', () => {
        const systemContentTypeCollection: ISystemContentType[] = [sampleWithRequiredData];
        expectedResult = service.addSystemContentTypeToCollectionIfMissing(systemContentTypeCollection, undefined, null);
        expect(expectedResult).toEqual(systemContentTypeCollection);
      });
    });

    describe('compareSystemContentType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSystemContentType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSystemContentType(entity1, entity2);
        const compareResult2 = service.compareSystemContentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSystemContentType(entity1, entity2);
        const compareResult2 = service.compareSystemContentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSystemContentType(entity1, entity2);
        const compareResult2 = service.compareSystemContentType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
