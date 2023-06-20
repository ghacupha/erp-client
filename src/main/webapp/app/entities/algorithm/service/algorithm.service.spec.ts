import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAlgorithm } from '../algorithm.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../algorithm.test-samples';

import { AlgorithmService } from './algorithm.service';

const requireRestSample: IAlgorithm = {
  ...sampleWithRequiredData,
};

describe('Algorithm Service', () => {
  let service: AlgorithmService;
  let httpMock: HttpTestingController;
  let expectedResult: IAlgorithm | IAlgorithm[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlgorithmService);
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

    it('should create a Algorithm', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const algorithm = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(algorithm).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Algorithm', () => {
      const algorithm = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(algorithm).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Algorithm', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Algorithm', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Algorithm', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAlgorithmToCollectionIfMissing', () => {
      it('should add a Algorithm to an empty array', () => {
        const algorithm: IAlgorithm = sampleWithRequiredData;
        expectedResult = service.addAlgorithmToCollectionIfMissing([], algorithm);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(algorithm);
      });

      it('should not add a Algorithm to an array that contains it', () => {
        const algorithm: IAlgorithm = sampleWithRequiredData;
        const algorithmCollection: IAlgorithm[] = [
          {
            ...algorithm,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAlgorithmToCollectionIfMissing(algorithmCollection, algorithm);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Algorithm to an array that doesn't contain it", () => {
        const algorithm: IAlgorithm = sampleWithRequiredData;
        const algorithmCollection: IAlgorithm[] = [sampleWithPartialData];
        expectedResult = service.addAlgorithmToCollectionIfMissing(algorithmCollection, algorithm);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(algorithm);
      });

      it('should add only unique Algorithm to an array', () => {
        const algorithmArray: IAlgorithm[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const algorithmCollection: IAlgorithm[] = [sampleWithRequiredData];
        expectedResult = service.addAlgorithmToCollectionIfMissing(algorithmCollection, ...algorithmArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const algorithm: IAlgorithm = sampleWithRequiredData;
        const algorithm2: IAlgorithm = sampleWithPartialData;
        expectedResult = service.addAlgorithmToCollectionIfMissing([], algorithm, algorithm2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(algorithm);
        expect(expectedResult).toContain(algorithm2);
      });

      it('should accept null and undefined values', () => {
        const algorithm: IAlgorithm = sampleWithRequiredData;
        expectedResult = service.addAlgorithmToCollectionIfMissing([], null, algorithm, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(algorithm);
      });

      it('should return initial array if no Algorithm is added', () => {
        const algorithmCollection: IAlgorithm[] = [sampleWithRequiredData];
        expectedResult = service.addAlgorithmToCollectionIfMissing(algorithmCollection, undefined, null);
        expect(expectedResult).toEqual(algorithmCollection);
      });
    });

    describe('compareAlgorithm', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAlgorithm(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAlgorithm(entity1, entity2);
        const compareResult2 = service.compareAlgorithm(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAlgorithm(entity1, entity2);
        const compareResult2 = service.compareAlgorithm(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAlgorithm(entity1, entity2);
        const compareResult2 = service.compareAlgorithm(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
