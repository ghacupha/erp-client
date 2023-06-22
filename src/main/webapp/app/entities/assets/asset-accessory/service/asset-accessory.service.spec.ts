import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAssetAccessory } from '../asset-accessory.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../asset-accessory.test-samples';

import { AssetAccessoryService } from './asset-accessory.service';

const requireRestSample: IAssetAccessory = {
  ...sampleWithRequiredData,
};

describe('AssetAccessory Service', () => {
  let service: AssetAccessoryService;
  let httpMock: HttpTestingController;
  let expectedResult: IAssetAccessory | IAssetAccessory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AssetAccessoryService);
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

    it('should create a AssetAccessory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const assetAccessory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(assetAccessory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AssetAccessory', () => {
      const assetAccessory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(assetAccessory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AssetAccessory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AssetAccessory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AssetAccessory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAssetAccessoryToCollectionIfMissing', () => {
      it('should add a AssetAccessory to an empty array', () => {
        const assetAccessory: IAssetAccessory = sampleWithRequiredData;
        expectedResult = service.addAssetAccessoryToCollectionIfMissing([], assetAccessory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetAccessory);
      });

      it('should not add a AssetAccessory to an array that contains it', () => {
        const assetAccessory: IAssetAccessory = sampleWithRequiredData;
        const assetAccessoryCollection: IAssetAccessory[] = [
          {
            ...assetAccessory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAssetAccessoryToCollectionIfMissing(assetAccessoryCollection, assetAccessory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AssetAccessory to an array that doesn't contain it", () => {
        const assetAccessory: IAssetAccessory = sampleWithRequiredData;
        const assetAccessoryCollection: IAssetAccessory[] = [sampleWithPartialData];
        expectedResult = service.addAssetAccessoryToCollectionIfMissing(assetAccessoryCollection, assetAccessory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetAccessory);
      });

      it('should add only unique AssetAccessory to an array', () => {
        const assetAccessoryArray: IAssetAccessory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const assetAccessoryCollection: IAssetAccessory[] = [sampleWithRequiredData];
        expectedResult = service.addAssetAccessoryToCollectionIfMissing(assetAccessoryCollection, ...assetAccessoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const assetAccessory: IAssetAccessory = sampleWithRequiredData;
        const assetAccessory2: IAssetAccessory = sampleWithPartialData;
        expectedResult = service.addAssetAccessoryToCollectionIfMissing([], assetAccessory, assetAccessory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetAccessory);
        expect(expectedResult).toContain(assetAccessory2);
      });

      it('should accept null and undefined values', () => {
        const assetAccessory: IAssetAccessory = sampleWithRequiredData;
        expectedResult = service.addAssetAccessoryToCollectionIfMissing([], null, assetAccessory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetAccessory);
      });

      it('should return initial array if no AssetAccessory is added', () => {
        const assetAccessoryCollection: IAssetAccessory[] = [sampleWithRequiredData];
        expectedResult = service.addAssetAccessoryToCollectionIfMissing(assetAccessoryCollection, undefined, null);
        expect(expectedResult).toEqual(assetAccessoryCollection);
      });
    });

    describe('compareAssetAccessory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAssetAccessory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAssetAccessory(entity1, entity2);
        const compareResult2 = service.compareAssetAccessory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAssetAccessory(entity1, entity2);
        const compareResult2 = service.compareAssetAccessory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAssetAccessory(entity1, entity2);
        const compareResult2 = service.compareAssetAccessory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
