import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInstitutionCode } from '../institution-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../institution-code.test-samples';

import { InstitutionCodeService } from './institution-code.service';

const requireRestSample: IInstitutionCode = {
  ...sampleWithRequiredData,
};

describe('InstitutionCode Service', () => {
  let service: InstitutionCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IInstitutionCode | IInstitutionCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InstitutionCodeService);
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

    it('should create a InstitutionCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const institutionCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(institutionCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InstitutionCode', () => {
      const institutionCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(institutionCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InstitutionCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InstitutionCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InstitutionCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInstitutionCodeToCollectionIfMissing', () => {
      it('should add a InstitutionCode to an empty array', () => {
        const institutionCode: IInstitutionCode = sampleWithRequiredData;
        expectedResult = service.addInstitutionCodeToCollectionIfMissing([], institutionCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institutionCode);
      });

      it('should not add a InstitutionCode to an array that contains it', () => {
        const institutionCode: IInstitutionCode = sampleWithRequiredData;
        const institutionCodeCollection: IInstitutionCode[] = [
          {
            ...institutionCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInstitutionCodeToCollectionIfMissing(institutionCodeCollection, institutionCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InstitutionCode to an array that doesn't contain it", () => {
        const institutionCode: IInstitutionCode = sampleWithRequiredData;
        const institutionCodeCollection: IInstitutionCode[] = [sampleWithPartialData];
        expectedResult = service.addInstitutionCodeToCollectionIfMissing(institutionCodeCollection, institutionCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institutionCode);
      });

      it('should add only unique InstitutionCode to an array', () => {
        const institutionCodeArray: IInstitutionCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const institutionCodeCollection: IInstitutionCode[] = [sampleWithRequiredData];
        expectedResult = service.addInstitutionCodeToCollectionIfMissing(institutionCodeCollection, ...institutionCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const institutionCode: IInstitutionCode = sampleWithRequiredData;
        const institutionCode2: IInstitutionCode = sampleWithPartialData;
        expectedResult = service.addInstitutionCodeToCollectionIfMissing([], institutionCode, institutionCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institutionCode);
        expect(expectedResult).toContain(institutionCode2);
      });

      it('should accept null and undefined values', () => {
        const institutionCode: IInstitutionCode = sampleWithRequiredData;
        expectedResult = service.addInstitutionCodeToCollectionIfMissing([], null, institutionCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institutionCode);
      });

      it('should return initial array if no InstitutionCode is added', () => {
        const institutionCodeCollection: IInstitutionCode[] = [sampleWithRequiredData];
        expectedResult = service.addInstitutionCodeToCollectionIfMissing(institutionCodeCollection, undefined, null);
        expect(expectedResult).toEqual(institutionCodeCollection);
      });
    });

    describe('compareInstitutionCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInstitutionCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInstitutionCode(entity1, entity2);
        const compareResult2 = service.compareInstitutionCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInstitutionCode(entity1, entity2);
        const compareResult2 = service.compareInstitutionCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInstitutionCode(entity1, entity2);
        const compareResult2 = service.compareInstitutionCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
