import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILeaseModelMetadata } from '../lease-model-metadata.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../lease-model-metadata.test-samples';

import { LeaseModelMetadataService, RestLeaseModelMetadata } from './lease-model-metadata.service';

const requireRestSample: RestLeaseModelMetadata = {
  ...sampleWithRequiredData,
  commencementDate: sampleWithRequiredData.commencementDate?.format(DATE_FORMAT),
  terminalDate: sampleWithRequiredData.terminalDate?.format(DATE_FORMAT),
};

describe('LeaseModelMetadata Service', () => {
  let service: LeaseModelMetadataService;
  let httpMock: HttpTestingController;
  let expectedResult: ILeaseModelMetadata | ILeaseModelMetadata[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LeaseModelMetadataService);
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

    it('should create a LeaseModelMetadata', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const leaseModelMetadata = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(leaseModelMetadata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LeaseModelMetadata', () => {
      const leaseModelMetadata = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(leaseModelMetadata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LeaseModelMetadata', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LeaseModelMetadata', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LeaseModelMetadata', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLeaseModelMetadataToCollectionIfMissing', () => {
      it('should add a LeaseModelMetadata to an empty array', () => {
        const leaseModelMetadata: ILeaseModelMetadata = sampleWithRequiredData;
        expectedResult = service.addLeaseModelMetadataToCollectionIfMissing([], leaseModelMetadata);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseModelMetadata);
      });

      it('should not add a LeaseModelMetadata to an array that contains it', () => {
        const leaseModelMetadata: ILeaseModelMetadata = sampleWithRequiredData;
        const leaseModelMetadataCollection: ILeaseModelMetadata[] = [
          {
            ...leaseModelMetadata,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLeaseModelMetadataToCollectionIfMissing(leaseModelMetadataCollection, leaseModelMetadata);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LeaseModelMetadata to an array that doesn't contain it", () => {
        const leaseModelMetadata: ILeaseModelMetadata = sampleWithRequiredData;
        const leaseModelMetadataCollection: ILeaseModelMetadata[] = [sampleWithPartialData];
        expectedResult = service.addLeaseModelMetadataToCollectionIfMissing(leaseModelMetadataCollection, leaseModelMetadata);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(leaseModelMetadata);
      });

      it('should add only unique LeaseModelMetadata to an array', () => {
        const leaseModelMetadataArray: ILeaseModelMetadata[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const leaseModelMetadataCollection: ILeaseModelMetadata[] = [sampleWithRequiredData];
        expectedResult = service.addLeaseModelMetadataToCollectionIfMissing(leaseModelMetadataCollection, ...leaseModelMetadataArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const leaseModelMetadata: ILeaseModelMetadata = sampleWithRequiredData;
        const leaseModelMetadata2: ILeaseModelMetadata = sampleWithPartialData;
        expectedResult = service.addLeaseModelMetadataToCollectionIfMissing([], leaseModelMetadata, leaseModelMetadata2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(leaseModelMetadata);
        expect(expectedResult).toContain(leaseModelMetadata2);
      });

      it('should accept null and undefined values', () => {
        const leaseModelMetadata: ILeaseModelMetadata = sampleWithRequiredData;
        expectedResult = service.addLeaseModelMetadataToCollectionIfMissing([], null, leaseModelMetadata, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseModelMetadata);
      });

      it('should return initial array if no LeaseModelMetadata is added', () => {
        const leaseModelMetadataCollection: ILeaseModelMetadata[] = [sampleWithRequiredData];
        expectedResult = service.addLeaseModelMetadataToCollectionIfMissing(leaseModelMetadataCollection, undefined, null);
        expect(expectedResult).toEqual(leaseModelMetadataCollection);
      });
    });

    describe('compareLeaseModelMetadata', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLeaseModelMetadata(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLeaseModelMetadata(entity1, entity2);
        const compareResult2 = service.compareLeaseModelMetadata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLeaseModelMetadata(entity1, entity2);
        const compareResult2 = service.compareLeaseModelMetadata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLeaseModelMetadata(entity1, entity2);
        const compareResult2 = service.compareLeaseModelMetadata(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
