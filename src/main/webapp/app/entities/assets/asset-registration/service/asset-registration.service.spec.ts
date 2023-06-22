import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAssetRegistration } from '../asset-registration.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../asset-registration.test-samples';

import { AssetRegistrationService } from './asset-registration.service';

const requireRestSample: IAssetRegistration = {
  ...sampleWithRequiredData,
};

describe('AssetRegistration Service', () => {
  let service: AssetRegistrationService;
  let httpMock: HttpTestingController;
  let expectedResult: IAssetRegistration | IAssetRegistration[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AssetRegistrationService);
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

    it('should create a AssetRegistration', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const assetRegistration = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(assetRegistration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AssetRegistration', () => {
      const assetRegistration = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(assetRegistration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AssetRegistration', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AssetRegistration', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AssetRegistration', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAssetRegistrationToCollectionIfMissing', () => {
      it('should add a AssetRegistration to an empty array', () => {
        const assetRegistration: IAssetRegistration = sampleWithRequiredData;
        expectedResult = service.addAssetRegistrationToCollectionIfMissing([], assetRegistration);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetRegistration);
      });

      it('should not add a AssetRegistration to an array that contains it', () => {
        const assetRegistration: IAssetRegistration = sampleWithRequiredData;
        const assetRegistrationCollection: IAssetRegistration[] = [
          {
            ...assetRegistration,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, assetRegistration);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AssetRegistration to an array that doesn't contain it", () => {
        const assetRegistration: IAssetRegistration = sampleWithRequiredData;
        const assetRegistrationCollection: IAssetRegistration[] = [sampleWithPartialData];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, assetRegistration);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetRegistration);
      });

      it('should add only unique AssetRegistration to an array', () => {
        const assetRegistrationArray: IAssetRegistration[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const assetRegistrationCollection: IAssetRegistration[] = [sampleWithRequiredData];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, ...assetRegistrationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const assetRegistration: IAssetRegistration = sampleWithRequiredData;
        const assetRegistration2: IAssetRegistration = sampleWithPartialData;
        expectedResult = service.addAssetRegistrationToCollectionIfMissing([], assetRegistration, assetRegistration2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetRegistration);
        expect(expectedResult).toContain(assetRegistration2);
      });

      it('should accept null and undefined values', () => {
        const assetRegistration: IAssetRegistration = sampleWithRequiredData;
        expectedResult = service.addAssetRegistrationToCollectionIfMissing([], null, assetRegistration, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetRegistration);
      });

      it('should return initial array if no AssetRegistration is added', () => {
        const assetRegistrationCollection: IAssetRegistration[] = [sampleWithRequiredData];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, undefined, null);
        expect(expectedResult).toEqual(assetRegistrationCollection);
      });
    });

    describe('compareAssetRegistration', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAssetRegistration(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAssetRegistration(entity1, entity2);
        const compareResult2 = service.compareAssetRegistration(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAssetRegistration(entity1, entity2);
        const compareResult2 = service.compareAssetRegistration(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAssetRegistration(entity1, entity2);
        const compareResult2 = service.compareAssetRegistration(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
