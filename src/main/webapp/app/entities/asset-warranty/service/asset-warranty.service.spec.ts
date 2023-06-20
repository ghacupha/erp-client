import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAssetWarranty } from '../asset-warranty.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../asset-warranty.test-samples';

import { AssetWarrantyService, RestAssetWarranty } from './asset-warranty.service';

const requireRestSample: RestAssetWarranty = {
  ...sampleWithRequiredData,
  expiryDate: sampleWithRequiredData.expiryDate?.format(DATE_FORMAT),
};

describe('AssetWarranty Service', () => {
  let service: AssetWarrantyService;
  let httpMock: HttpTestingController;
  let expectedResult: IAssetWarranty | IAssetWarranty[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AssetWarrantyService);
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

    it('should create a AssetWarranty', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const assetWarranty = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(assetWarranty).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AssetWarranty', () => {
      const assetWarranty = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(assetWarranty).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AssetWarranty', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AssetWarranty', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AssetWarranty', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAssetWarrantyToCollectionIfMissing', () => {
      it('should add a AssetWarranty to an empty array', () => {
        const assetWarranty: IAssetWarranty = sampleWithRequiredData;
        expectedResult = service.addAssetWarrantyToCollectionIfMissing([], assetWarranty);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetWarranty);
      });

      it('should not add a AssetWarranty to an array that contains it', () => {
        const assetWarranty: IAssetWarranty = sampleWithRequiredData;
        const assetWarrantyCollection: IAssetWarranty[] = [
          {
            ...assetWarranty,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAssetWarrantyToCollectionIfMissing(assetWarrantyCollection, assetWarranty);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AssetWarranty to an array that doesn't contain it", () => {
        const assetWarranty: IAssetWarranty = sampleWithRequiredData;
        const assetWarrantyCollection: IAssetWarranty[] = [sampleWithPartialData];
        expectedResult = service.addAssetWarrantyToCollectionIfMissing(assetWarrantyCollection, assetWarranty);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetWarranty);
      });

      it('should add only unique AssetWarranty to an array', () => {
        const assetWarrantyArray: IAssetWarranty[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const assetWarrantyCollection: IAssetWarranty[] = [sampleWithRequiredData];
        expectedResult = service.addAssetWarrantyToCollectionIfMissing(assetWarrantyCollection, ...assetWarrantyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const assetWarranty: IAssetWarranty = sampleWithRequiredData;
        const assetWarranty2: IAssetWarranty = sampleWithPartialData;
        expectedResult = service.addAssetWarrantyToCollectionIfMissing([], assetWarranty, assetWarranty2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetWarranty);
        expect(expectedResult).toContain(assetWarranty2);
      });

      it('should accept null and undefined values', () => {
        const assetWarranty: IAssetWarranty = sampleWithRequiredData;
        expectedResult = service.addAssetWarrantyToCollectionIfMissing([], null, assetWarranty, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetWarranty);
      });

      it('should return initial array if no AssetWarranty is added', () => {
        const assetWarrantyCollection: IAssetWarranty[] = [sampleWithRequiredData];
        expectedResult = service.addAssetWarrantyToCollectionIfMissing(assetWarrantyCollection, undefined, null);
        expect(expectedResult).toEqual(assetWarrantyCollection);
      });
    });

    describe('compareAssetWarranty', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAssetWarranty(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAssetWarranty(entity1, entity2);
        const compareResult2 = service.compareAssetWarranty(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAssetWarranty(entity1, entity2);
        const compareResult2 = service.compareAssetWarranty(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAssetWarranty(entity1, entity2);
        const compareResult2 = service.compareAssetWarranty(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
