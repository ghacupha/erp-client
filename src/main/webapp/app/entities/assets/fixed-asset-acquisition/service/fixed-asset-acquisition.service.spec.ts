import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFixedAssetAcquisition } from '../fixed-asset-acquisition.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../fixed-asset-acquisition.test-samples';

import { FixedAssetAcquisitionService, RestFixedAssetAcquisition } from './fixed-asset-acquisition.service';

const requireRestSample: RestFixedAssetAcquisition = {
  ...sampleWithRequiredData,
  purchaseDate: sampleWithRequiredData.purchaseDate?.format(DATE_FORMAT),
};

describe('FixedAssetAcquisition Service', () => {
  let service: FixedAssetAcquisitionService;
  let httpMock: HttpTestingController;
  let expectedResult: IFixedAssetAcquisition | IFixedAssetAcquisition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FixedAssetAcquisitionService);
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

    it('should create a FixedAssetAcquisition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fixedAssetAcquisition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fixedAssetAcquisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FixedAssetAcquisition', () => {
      const fixedAssetAcquisition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fixedAssetAcquisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FixedAssetAcquisition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FixedAssetAcquisition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FixedAssetAcquisition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFixedAssetAcquisitionToCollectionIfMissing', () => {
      it('should add a FixedAssetAcquisition to an empty array', () => {
        const fixedAssetAcquisition: IFixedAssetAcquisition = sampleWithRequiredData;
        expectedResult = service.addFixedAssetAcquisitionToCollectionIfMissing([], fixedAssetAcquisition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fixedAssetAcquisition);
      });

      it('should not add a FixedAssetAcquisition to an array that contains it', () => {
        const fixedAssetAcquisition: IFixedAssetAcquisition = sampleWithRequiredData;
        const fixedAssetAcquisitionCollection: IFixedAssetAcquisition[] = [
          {
            ...fixedAssetAcquisition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFixedAssetAcquisitionToCollectionIfMissing(fixedAssetAcquisitionCollection, fixedAssetAcquisition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FixedAssetAcquisition to an array that doesn't contain it", () => {
        const fixedAssetAcquisition: IFixedAssetAcquisition = sampleWithRequiredData;
        const fixedAssetAcquisitionCollection: IFixedAssetAcquisition[] = [sampleWithPartialData];
        expectedResult = service.addFixedAssetAcquisitionToCollectionIfMissing(fixedAssetAcquisitionCollection, fixedAssetAcquisition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fixedAssetAcquisition);
      });

      it('should add only unique FixedAssetAcquisition to an array', () => {
        const fixedAssetAcquisitionArray: IFixedAssetAcquisition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fixedAssetAcquisitionCollection: IFixedAssetAcquisition[] = [sampleWithRequiredData];
        expectedResult = service.addFixedAssetAcquisitionToCollectionIfMissing(
          fixedAssetAcquisitionCollection,
          ...fixedAssetAcquisitionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fixedAssetAcquisition: IFixedAssetAcquisition = sampleWithRequiredData;
        const fixedAssetAcquisition2: IFixedAssetAcquisition = sampleWithPartialData;
        expectedResult = service.addFixedAssetAcquisitionToCollectionIfMissing([], fixedAssetAcquisition, fixedAssetAcquisition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fixedAssetAcquisition);
        expect(expectedResult).toContain(fixedAssetAcquisition2);
      });

      it('should accept null and undefined values', () => {
        const fixedAssetAcquisition: IFixedAssetAcquisition = sampleWithRequiredData;
        expectedResult = service.addFixedAssetAcquisitionToCollectionIfMissing([], null, fixedAssetAcquisition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fixedAssetAcquisition);
      });

      it('should return initial array if no FixedAssetAcquisition is added', () => {
        const fixedAssetAcquisitionCollection: IFixedAssetAcquisition[] = [sampleWithRequiredData];
        expectedResult = service.addFixedAssetAcquisitionToCollectionIfMissing(fixedAssetAcquisitionCollection, undefined, null);
        expect(expectedResult).toEqual(fixedAssetAcquisitionCollection);
      });
    });

    describe('compareFixedAssetAcquisition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFixedAssetAcquisition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFixedAssetAcquisition(entity1, entity2);
        const compareResult2 = service.compareFixedAssetAcquisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFixedAssetAcquisition(entity1, entity2);
        const compareResult2 = service.compareFixedAssetAcquisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFixedAssetAcquisition(entity1, entity2);
        const compareResult2 = service.compareFixedAssetAcquisition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
