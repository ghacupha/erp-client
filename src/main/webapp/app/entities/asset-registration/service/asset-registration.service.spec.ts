import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAssetRegistration, AssetRegistration } from '../asset-registration.model';

import { AssetRegistrationService } from './asset-registration.service';

describe('AssetRegistration Service', () => {
  let service: AssetRegistrationService;
  let httpMock: HttpTestingController;
  let elemDefault: IAssetRegistration;
  let expectedResult: IAssetRegistration | IAssetRegistration[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AssetRegistrationService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      assetNumber: 'AAAAAAA',
      assetTag: 'AAAAAAA',
      assetDetails: 'AAAAAAA',
      assetCost: 0,
      commentsContentType: 'image/png',
      comments: 'AAAAAAA',
      modelNumber: 'AAAAAAA',
      serialNumber: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a AssetRegistration', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AssetRegistration()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AssetRegistration', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          assetNumber: 'BBBBBB',
          assetTag: 'BBBBBB',
          assetDetails: 'BBBBBB',
          assetCost: 1,
          comments: 'BBBBBB',
          modelNumber: 'BBBBBB',
          serialNumber: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AssetRegistration', () => {
      const patchObject = Object.assign(
        {
          assetNumber: 'BBBBBB',
          assetCost: 1,
          serialNumber: 'BBBBBB',
        },
        new AssetRegistration()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AssetRegistration', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          assetNumber: 'BBBBBB',
          assetTag: 'BBBBBB',
          assetDetails: 'BBBBBB',
          assetCost: 1,
          comments: 'BBBBBB',
          modelNumber: 'BBBBBB',
          serialNumber: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a AssetRegistration', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAssetRegistrationToCollectionIfMissing', () => {
      it('should add a AssetRegistration to an empty array', () => {
        const assetRegistration: IAssetRegistration = { id: 123 };
        expectedResult = service.addAssetRegistrationToCollectionIfMissing([], assetRegistration);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetRegistration);
      });

      it('should not add a AssetRegistration to an array that contains it', () => {
        const assetRegistration: IAssetRegistration = { id: 123 };
        const assetRegistrationCollection: IAssetRegistration[] = [
          {
            ...assetRegistration,
          },
          { id: 456 },
        ];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, assetRegistration);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AssetRegistration to an array that doesn't contain it", () => {
        const assetRegistration: IAssetRegistration = { id: 123 };
        const assetRegistrationCollection: IAssetRegistration[] = [{ id: 456 }];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, assetRegistration);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetRegistration);
      });

      it('should add only unique AssetRegistration to an array', () => {
        const assetRegistrationArray: IAssetRegistration[] = [{ id: 123 }, { id: 456 }, { id: 42595 }];
        const assetRegistrationCollection: IAssetRegistration[] = [{ id: 123 }];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, ...assetRegistrationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const assetRegistration: IAssetRegistration = { id: 123 };
        const assetRegistration2: IAssetRegistration = { id: 456 };
        expectedResult = service.addAssetRegistrationToCollectionIfMissing([], assetRegistration, assetRegistration2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assetRegistration);
        expect(expectedResult).toContain(assetRegistration2);
      });

      it('should accept null and undefined values', () => {
        const assetRegistration: IAssetRegistration = { id: 123 };
        expectedResult = service.addAssetRegistrationToCollectionIfMissing([], null, assetRegistration, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assetRegistration);
      });

      it('should return initial array if no AssetRegistration is added', () => {
        const assetRegistrationCollection: IAssetRegistration[] = [{ id: 123 }];
        expectedResult = service.addAssetRegistrationToCollectionIfMissing(assetRegistrationCollection, undefined, null);
        expect(expectedResult).toEqual(assetRegistrationCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
