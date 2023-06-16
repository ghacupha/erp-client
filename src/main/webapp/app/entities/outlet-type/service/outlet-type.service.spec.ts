import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOutletType } from '../outlet-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../outlet-type.test-samples';

import { OutletTypeService } from './outlet-type.service';

const requireRestSample: IOutletType = {
  ...sampleWithRequiredData,
};

describe('OutletType Service', () => {
  let service: OutletTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IOutletType | IOutletType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OutletTypeService);
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

    it('should create a OutletType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outletType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(outletType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OutletType', () => {
      const outletType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(outletType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OutletType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OutletType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OutletType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOutletTypeToCollectionIfMissing', () => {
      it('should add a OutletType to an empty array', () => {
        const outletType: IOutletType = sampleWithRequiredData;
        expectedResult = service.addOutletTypeToCollectionIfMissing([], outletType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(outletType);
      });

      it('should not add a OutletType to an array that contains it', () => {
        const outletType: IOutletType = sampleWithRequiredData;
        const outletTypeCollection: IOutletType[] = [
          {
            ...outletType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOutletTypeToCollectionIfMissing(outletTypeCollection, outletType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OutletType to an array that doesn't contain it", () => {
        const outletType: IOutletType = sampleWithRequiredData;
        const outletTypeCollection: IOutletType[] = [sampleWithPartialData];
        expectedResult = service.addOutletTypeToCollectionIfMissing(outletTypeCollection, outletType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(outletType);
      });

      it('should add only unique OutletType to an array', () => {
        const outletTypeArray: IOutletType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const outletTypeCollection: IOutletType[] = [sampleWithRequiredData];
        expectedResult = service.addOutletTypeToCollectionIfMissing(outletTypeCollection, ...outletTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const outletType: IOutletType = sampleWithRequiredData;
        const outletType2: IOutletType = sampleWithPartialData;
        expectedResult = service.addOutletTypeToCollectionIfMissing([], outletType, outletType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(outletType);
        expect(expectedResult).toContain(outletType2);
      });

      it('should accept null and undefined values', () => {
        const outletType: IOutletType = sampleWithRequiredData;
        expectedResult = service.addOutletTypeToCollectionIfMissing([], null, outletType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(outletType);
      });

      it('should return initial array if no OutletType is added', () => {
        const outletTypeCollection: IOutletType[] = [sampleWithRequiredData];
        expectedResult = service.addOutletTypeToCollectionIfMissing(outletTypeCollection, undefined, null);
        expect(expectedResult).toEqual(outletTypeCollection);
      });
    });

    describe('compareOutletType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOutletType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOutletType(entity1, entity2);
        const compareResult2 = service.compareOutletType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOutletType(entity1, entity2);
        const compareResult2 = service.compareOutletType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOutletType(entity1, entity2);
        const compareResult2 = service.compareOutletType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
