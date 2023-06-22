import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMfbBranchCode } from '../mfb-branch-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../mfb-branch-code.test-samples';

import { MfbBranchCodeService } from './mfb-branch-code.service';

const requireRestSample: IMfbBranchCode = {
  ...sampleWithRequiredData,
};

describe('MfbBranchCode Service', () => {
  let service: MfbBranchCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IMfbBranchCode | IMfbBranchCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MfbBranchCodeService);
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

    it('should create a MfbBranchCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mfbBranchCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(mfbBranchCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MfbBranchCode', () => {
      const mfbBranchCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(mfbBranchCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MfbBranchCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MfbBranchCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MfbBranchCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMfbBranchCodeToCollectionIfMissing', () => {
      it('should add a MfbBranchCode to an empty array', () => {
        const mfbBranchCode: IMfbBranchCode = sampleWithRequiredData;
        expectedResult = service.addMfbBranchCodeToCollectionIfMissing([], mfbBranchCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mfbBranchCode);
      });

      it('should not add a MfbBranchCode to an array that contains it', () => {
        const mfbBranchCode: IMfbBranchCode = sampleWithRequiredData;
        const mfbBranchCodeCollection: IMfbBranchCode[] = [
          {
            ...mfbBranchCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMfbBranchCodeToCollectionIfMissing(mfbBranchCodeCollection, mfbBranchCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MfbBranchCode to an array that doesn't contain it", () => {
        const mfbBranchCode: IMfbBranchCode = sampleWithRequiredData;
        const mfbBranchCodeCollection: IMfbBranchCode[] = [sampleWithPartialData];
        expectedResult = service.addMfbBranchCodeToCollectionIfMissing(mfbBranchCodeCollection, mfbBranchCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mfbBranchCode);
      });

      it('should add only unique MfbBranchCode to an array', () => {
        const mfbBranchCodeArray: IMfbBranchCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const mfbBranchCodeCollection: IMfbBranchCode[] = [sampleWithRequiredData];
        expectedResult = service.addMfbBranchCodeToCollectionIfMissing(mfbBranchCodeCollection, ...mfbBranchCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const mfbBranchCode: IMfbBranchCode = sampleWithRequiredData;
        const mfbBranchCode2: IMfbBranchCode = sampleWithPartialData;
        expectedResult = service.addMfbBranchCodeToCollectionIfMissing([], mfbBranchCode, mfbBranchCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mfbBranchCode);
        expect(expectedResult).toContain(mfbBranchCode2);
      });

      it('should accept null and undefined values', () => {
        const mfbBranchCode: IMfbBranchCode = sampleWithRequiredData;
        expectedResult = service.addMfbBranchCodeToCollectionIfMissing([], null, mfbBranchCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mfbBranchCode);
      });

      it('should return initial array if no MfbBranchCode is added', () => {
        const mfbBranchCodeCollection: IMfbBranchCode[] = [sampleWithRequiredData];
        expectedResult = service.addMfbBranchCodeToCollectionIfMissing(mfbBranchCodeCollection, undefined, null);
        expect(expectedResult).toEqual(mfbBranchCodeCollection);
      });
    });

    describe('compareMfbBranchCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMfbBranchCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMfbBranchCode(entity1, entity2);
        const compareResult2 = service.compareMfbBranchCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMfbBranchCode(entity1, entity2);
        const compareResult2 = service.compareMfbBranchCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMfbBranchCode(entity1, entity2);
        const compareResult2 = service.compareMfbBranchCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
