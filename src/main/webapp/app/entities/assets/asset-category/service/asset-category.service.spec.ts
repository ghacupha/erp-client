import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAssetCategory } from '../asset-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../asset-category.test-samples';

import { AssetCategoryService } from './asset-category.service';

const requireRestSample: IAssetCategory = {
  ...sampleWithRequiredData,
};

describe('AssetCategory Service', () => {
  let service: AssetCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: IAssetCategory | IAssetCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AssetCategoryService);
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

    it('should create a AssetCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const assetCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(assetCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AssetCategory', () => {
      const assetCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(assetCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AssetCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AssetCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AssetCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAssetCategoryToCollectionIfMissing', () => {
      it('should add a AssetCategory to an empty array', () => {
        const assetCategory: IAssetCategory = sampleWithRequiredData;
        expectedResult = service.addAssetCategoryToCollectionIfMissing([], assetCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetCategory);
      });

      it('should not add a AssetCategory to an array that contains it', () => {
        const assetCategory: IAssetCategory = sampleWithRequiredData;
        const assetCategoryCollection: IAssetCategory[] = [
          {
            ...assetCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAssetCategoryToCollectionIfMissing(assetCategoryCollection, assetCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AssetCategory to an array that doesn't contain it", () => {
        const assetCategory: IAssetCategory = sampleWithRequiredData;
        const assetCategoryCollection: IAssetCategory[] = [sampleWithPartialData];
        expectedResult = service.addAssetCategoryToCollectionIfMissing(assetCategoryCollection, assetCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetCategory);
      });

      it('should add only unique AssetCategory to an array', () => {
        const assetCategoryArray: IAssetCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const assetCategoryCollection: IAssetCategory[] = [sampleWithRequiredData];
        expectedResult = service.addAssetCategoryToCollectionIfMissing(assetCategoryCollection, ...assetCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const assetCategory: IAssetCategory = sampleWithRequiredData;
        const assetCategory2: IAssetCategory = sampleWithPartialData;
        expectedResult = service.addAssetCategoryToCollectionIfMissing([], assetCategory, assetCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetCategory);
        expect(expectedResult).toContain(assetCategory2);
      });

      it('should accept null and undefined values', () => {
        const assetCategory: IAssetCategory = sampleWithRequiredData;
        expectedResult = service.addAssetCategoryToCollectionIfMissing([], null, assetCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetCategory);
      });

      it('should return initial array if no AssetCategory is added', () => {
        const assetCategoryCollection: IAssetCategory[] = [sampleWithRequiredData];
        expectedResult = service.addAssetCategoryToCollectionIfMissing(assetCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(assetCategoryCollection);
      });
    });

    describe('compareAssetCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAssetCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAssetCategory(entity1, entity2);
        const compareResult2 = service.compareAssetCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAssetCategory(entity1, entity2);
        const compareResult2 = service.compareAssetCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAssetCategory(entity1, entity2);
        const compareResult2 = service.compareAssetCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
