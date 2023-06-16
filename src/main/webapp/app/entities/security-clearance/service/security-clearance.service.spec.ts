import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISecurityClearance } from '../security-clearance.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../security-clearance.test-samples';

import { SecurityClearanceService } from './security-clearance.service';

const requireRestSample: ISecurityClearance = {
  ...sampleWithRequiredData,
};

describe('SecurityClearance Service', () => {
  let service: SecurityClearanceService;
  let httpMock: HttpTestingController;
  let expectedResult: ISecurityClearance | ISecurityClearance[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SecurityClearanceService);
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

    it('should create a SecurityClearance', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const securityClearance = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(securityClearance).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SecurityClearance', () => {
      const securityClearance = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(securityClearance).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SecurityClearance', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SecurityClearance', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SecurityClearance', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSecurityClearanceToCollectionIfMissing', () => {
      it('should add a SecurityClearance to an empty array', () => {
        const securityClearance: ISecurityClearance = sampleWithRequiredData;
        expectedResult = service.addSecurityClearanceToCollectionIfMissing([], securityClearance);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityClearance);
      });

      it('should not add a SecurityClearance to an array that contains it', () => {
        const securityClearance: ISecurityClearance = sampleWithRequiredData;
        const securityClearanceCollection: ISecurityClearance[] = [
          {
            ...securityClearance,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSecurityClearanceToCollectionIfMissing(securityClearanceCollection, securityClearance);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SecurityClearance to an array that doesn't contain it", () => {
        const securityClearance: ISecurityClearance = sampleWithRequiredData;
        const securityClearanceCollection: ISecurityClearance[] = [sampleWithPartialData];
        expectedResult = service.addSecurityClearanceToCollectionIfMissing(securityClearanceCollection, securityClearance);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityClearance);
      });

      it('should add only unique SecurityClearance to an array', () => {
        const securityClearanceArray: ISecurityClearance[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const securityClearanceCollection: ISecurityClearance[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityClearanceToCollectionIfMissing(securityClearanceCollection, ...securityClearanceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const securityClearance: ISecurityClearance = sampleWithRequiredData;
        const securityClearance2: ISecurityClearance = sampleWithPartialData;
        expectedResult = service.addSecurityClearanceToCollectionIfMissing([], securityClearance, securityClearance2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityClearance);
        expect(expectedResult).toContain(securityClearance2);
      });

      it('should accept null and undefined values', () => {
        const securityClearance: ISecurityClearance = sampleWithRequiredData;
        expectedResult = service.addSecurityClearanceToCollectionIfMissing([], null, securityClearance, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityClearance);
      });

      it('should return initial array if no SecurityClearance is added', () => {
        const securityClearanceCollection: ISecurityClearance[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityClearanceToCollectionIfMissing(securityClearanceCollection, undefined, null);
        expect(expectedResult).toEqual(securityClearanceCollection);
      });
    });

    describe('compareSecurityClearance', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSecurityClearance(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSecurityClearance(entity1, entity2);
        const compareResult2 = service.compareSecurityClearance(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSecurityClearance(entity1, entity2);
        const compareResult2 = service.compareSecurityClearance(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSecurityClearance(entity1, entity2);
        const compareResult2 = service.compareSecurityClearance(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
