import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISettlementRequisition } from '../settlement-requisition.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../settlement-requisition.test-samples';

import { SettlementRequisitionService, RestSettlementRequisition } from './settlement-requisition.service';

const requireRestSample: RestSettlementRequisition = {
  ...sampleWithRequiredData,
  timeOfRequisition: sampleWithRequiredData.timeOfRequisition?.toJSON(),
};

describe('SettlementRequisition Service', () => {
  let service: SettlementRequisitionService;
  let httpMock: HttpTestingController;
  let expectedResult: ISettlementRequisition | ISettlementRequisition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SettlementRequisitionService);
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

    it('should create a SettlementRequisition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const settlementRequisition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(settlementRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SettlementRequisition', () => {
      const settlementRequisition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(settlementRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SettlementRequisition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SettlementRequisition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SettlementRequisition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSettlementRequisitionToCollectionIfMissing', () => {
      it('should add a SettlementRequisition to an empty array', () => {
        const settlementRequisition: ISettlementRequisition = sampleWithRequiredData;
        expectedResult = service.addSettlementRequisitionToCollectionIfMissing([], settlementRequisition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(settlementRequisition);
      });

      it('should not add a SettlementRequisition to an array that contains it', () => {
        const settlementRequisition: ISettlementRequisition = sampleWithRequiredData;
        const settlementRequisitionCollection: ISettlementRequisition[] = [
          {
            ...settlementRequisition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSettlementRequisitionToCollectionIfMissing(settlementRequisitionCollection, settlementRequisition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SettlementRequisition to an array that doesn't contain it", () => {
        const settlementRequisition: ISettlementRequisition = sampleWithRequiredData;
        const settlementRequisitionCollection: ISettlementRequisition[] = [sampleWithPartialData];
        expectedResult = service.addSettlementRequisitionToCollectionIfMissing(settlementRequisitionCollection, settlementRequisition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(settlementRequisition);
      });

      it('should add only unique SettlementRequisition to an array', () => {
        const settlementRequisitionArray: ISettlementRequisition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const settlementRequisitionCollection: ISettlementRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addSettlementRequisitionToCollectionIfMissing(
          settlementRequisitionCollection,
          ...settlementRequisitionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const settlementRequisition: ISettlementRequisition = sampleWithRequiredData;
        const settlementRequisition2: ISettlementRequisition = sampleWithPartialData;
        expectedResult = service.addSettlementRequisitionToCollectionIfMissing([], settlementRequisition, settlementRequisition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(settlementRequisition);
        expect(expectedResult).toContain(settlementRequisition2);
      });

      it('should accept null and undefined values', () => {
        const settlementRequisition: ISettlementRequisition = sampleWithRequiredData;
        expectedResult = service.addSettlementRequisitionToCollectionIfMissing([], null, settlementRequisition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(settlementRequisition);
      });

      it('should return initial array if no SettlementRequisition is added', () => {
        const settlementRequisitionCollection: ISettlementRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addSettlementRequisitionToCollectionIfMissing(settlementRequisitionCollection, undefined, null);
        expect(expectedResult).toEqual(settlementRequisitionCollection);
      });
    });

    describe('compareSettlementRequisition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSettlementRequisition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSettlementRequisition(entity1, entity2);
        const compareResult2 = service.compareSettlementRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSettlementRequisition(entity1, entity2);
        const compareResult2 = service.compareSettlementRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSettlementRequisition(entity1, entity2);
        const compareResult2 = service.compareSettlementRequisition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
