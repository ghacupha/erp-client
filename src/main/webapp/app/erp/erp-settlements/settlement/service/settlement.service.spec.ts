import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISettlement } from '../settlement.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../settlement.test-samples';

import { SettlementService, RestSettlement } from './settlement.service';

const requireRestSample: RestSettlement = {
  ...sampleWithRequiredData,
  paymentDate: sampleWithRequiredData.paymentDate?.format(DATE_FORMAT),
};

describe('Settlement Service', () => {
  let service: SettlementService;
  let httpMock: HttpTestingController;
  let expectedResult: ISettlement | ISettlement[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SettlementService);
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

    it('should create a Settlement', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const settlement = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(settlement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Settlement', () => {
      const settlement = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(settlement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Settlement', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Settlement', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Settlement', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSettlementToCollectionIfMissing', () => {
      it('should add a Settlement to an empty array', () => {
        const settlement: ISettlement = sampleWithRequiredData;
        expectedResult = service.addSettlementToCollectionIfMissing([], settlement);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(settlement);
      });

      it('should not add a Settlement to an array that contains it', () => {
        const settlement: ISettlement = sampleWithRequiredData;
        const settlementCollection: ISettlement[] = [
          {
            ...settlement,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSettlementToCollectionIfMissing(settlementCollection, settlement);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Settlement to an array that doesn't contain it", () => {
        const settlement: ISettlement = sampleWithRequiredData;
        const settlementCollection: ISettlement[] = [sampleWithPartialData];
        expectedResult = service.addSettlementToCollectionIfMissing(settlementCollection, settlement);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(settlement);
      });

      it('should add only unique Settlement to an array', () => {
        const settlementArray: ISettlement[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const settlementCollection: ISettlement[] = [sampleWithRequiredData];
        expectedResult = service.addSettlementToCollectionIfMissing(settlementCollection, ...settlementArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const settlement: ISettlement = sampleWithRequiredData;
        const settlement2: ISettlement = sampleWithPartialData;
        expectedResult = service.addSettlementToCollectionIfMissing([], settlement, settlement2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(settlement);
        expect(expectedResult).toContain(settlement2);
      });

      it('should accept null and undefined values', () => {
        const settlement: ISettlement = sampleWithRequiredData;
        expectedResult = service.addSettlementToCollectionIfMissing([], null, settlement, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(settlement);
      });

      it('should return initial array if no Settlement is added', () => {
        const settlementCollection: ISettlement[] = [sampleWithRequiredData];
        expectedResult = service.addSettlementToCollectionIfMissing(settlementCollection, undefined, null);
        expect(expectedResult).toEqual(settlementCollection);
      });
    });

    describe('compareSettlement', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSettlement(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSettlement(entity1, entity2);
        const compareResult2 = service.compareSettlement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSettlement(entity1, entity2);
        const compareResult2 = service.compareSettlement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSettlement(entity1, entity2);
        const compareResult2 = service.compareSettlement(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
