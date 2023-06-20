import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWorkProjectRegister } from '../work-project-register.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../work-project-register.test-samples';

import { WorkProjectRegisterService } from './work-project-register.service';

const requireRestSample: IWorkProjectRegister = {
  ...sampleWithRequiredData,
};

describe('WorkProjectRegister Service', () => {
  let service: WorkProjectRegisterService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkProjectRegister | IWorkProjectRegister[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkProjectRegisterService);
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

    it('should create a WorkProjectRegister', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const workProjectRegister = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(workProjectRegister).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkProjectRegister', () => {
      const workProjectRegister = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(workProjectRegister).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkProjectRegister', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkProjectRegister', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkProjectRegister', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWorkProjectRegisterToCollectionIfMissing', () => {
      it('should add a WorkProjectRegister to an empty array', () => {
        const workProjectRegister: IWorkProjectRegister = sampleWithRequiredData;
        expectedResult = service.addWorkProjectRegisterToCollectionIfMissing([], workProjectRegister);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workProjectRegister);
      });

      it('should not add a WorkProjectRegister to an array that contains it', () => {
        const workProjectRegister: IWorkProjectRegister = sampleWithRequiredData;
        const workProjectRegisterCollection: IWorkProjectRegister[] = [
          {
            ...workProjectRegister,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkProjectRegisterToCollectionIfMissing(workProjectRegisterCollection, workProjectRegister);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkProjectRegister to an array that doesn't contain it", () => {
        const workProjectRegister: IWorkProjectRegister = sampleWithRequiredData;
        const workProjectRegisterCollection: IWorkProjectRegister[] = [sampleWithPartialData];
        expectedResult = service.addWorkProjectRegisterToCollectionIfMissing(workProjectRegisterCollection, workProjectRegister);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workProjectRegister);
      });

      it('should add only unique WorkProjectRegister to an array', () => {
        const workProjectRegisterArray: IWorkProjectRegister[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const workProjectRegisterCollection: IWorkProjectRegister[] = [sampleWithRequiredData];
        expectedResult = service.addWorkProjectRegisterToCollectionIfMissing(workProjectRegisterCollection, ...workProjectRegisterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workProjectRegister: IWorkProjectRegister = sampleWithRequiredData;
        const workProjectRegister2: IWorkProjectRegister = sampleWithPartialData;
        expectedResult = service.addWorkProjectRegisterToCollectionIfMissing([], workProjectRegister, workProjectRegister2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workProjectRegister);
        expect(expectedResult).toContain(workProjectRegister2);
      });

      it('should accept null and undefined values', () => {
        const workProjectRegister: IWorkProjectRegister = sampleWithRequiredData;
        expectedResult = service.addWorkProjectRegisterToCollectionIfMissing([], null, workProjectRegister, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workProjectRegister);
      });

      it('should return initial array if no WorkProjectRegister is added', () => {
        const workProjectRegisterCollection: IWorkProjectRegister[] = [sampleWithRequiredData];
        expectedResult = service.addWorkProjectRegisterToCollectionIfMissing(workProjectRegisterCollection, undefined, null);
        expect(expectedResult).toEqual(workProjectRegisterCollection);
      });
    });

    describe('compareWorkProjectRegister', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkProjectRegister(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWorkProjectRegister(entity1, entity2);
        const compareResult2 = service.compareWorkProjectRegister(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWorkProjectRegister(entity1, entity2);
        const compareResult2 = service.compareWorkProjectRegister(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWorkProjectRegister(entity1, entity2);
        const compareResult2 = service.compareWorkProjectRegister(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
