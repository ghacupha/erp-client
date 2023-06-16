import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOutletStatus } from '../outlet-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../outlet-status.test-samples';

import { OutletStatusService } from './outlet-status.service';

const requireRestSample: IOutletStatus = {
  ...sampleWithRequiredData,
};

describe('OutletStatus Service', () => {
  let service: OutletStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: IOutletStatus | IOutletStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OutletStatusService);
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

    it('should create a OutletStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outletStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(outletStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OutletStatus', () => {
      const outletStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(outletStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OutletStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OutletStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OutletStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOutletStatusToCollectionIfMissing', () => {
      it('should add a OutletStatus to an empty array', () => {
        const outletStatus: IOutletStatus = sampleWithRequiredData;
        expectedResult = service.addOutletStatusToCollectionIfMissing([], outletStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(outletStatus);
      });

      it('should not add a OutletStatus to an array that contains it', () => {
        const outletStatus: IOutletStatus = sampleWithRequiredData;
        const outletStatusCollection: IOutletStatus[] = [
          {
            ...outletStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOutletStatusToCollectionIfMissing(outletStatusCollection, outletStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OutletStatus to an array that doesn't contain it", () => {
        const outletStatus: IOutletStatus = sampleWithRequiredData;
        const outletStatusCollection: IOutletStatus[] = [sampleWithPartialData];
        expectedResult = service.addOutletStatusToCollectionIfMissing(outletStatusCollection, outletStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(outletStatus);
      });

      it('should add only unique OutletStatus to an array', () => {
        const outletStatusArray: IOutletStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const outletStatusCollection: IOutletStatus[] = [sampleWithRequiredData];
        expectedResult = service.addOutletStatusToCollectionIfMissing(outletStatusCollection, ...outletStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const outletStatus: IOutletStatus = sampleWithRequiredData;
        const outletStatus2: IOutletStatus = sampleWithPartialData;
        expectedResult = service.addOutletStatusToCollectionIfMissing([], outletStatus, outletStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(outletStatus);
        expect(expectedResult).toContain(outletStatus2);
      });

      it('should accept null and undefined values', () => {
        const outletStatus: IOutletStatus = sampleWithRequiredData;
        expectedResult = service.addOutletStatusToCollectionIfMissing([], null, outletStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(outletStatus);
      });

      it('should return initial array if no OutletStatus is added', () => {
        const outletStatusCollection: IOutletStatus[] = [sampleWithRequiredData];
        expectedResult = service.addOutletStatusToCollectionIfMissing(outletStatusCollection, undefined, null);
        expect(expectedResult).toEqual(outletStatusCollection);
      });
    });

    describe('compareOutletStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOutletStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOutletStatus(entity1, entity2);
        const compareResult2 = service.compareOutletStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOutletStatus(entity1, entity2);
        const compareResult2 = service.compareOutletStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOutletStatus(entity1, entity2);
        const compareResult2 = service.compareOutletStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
