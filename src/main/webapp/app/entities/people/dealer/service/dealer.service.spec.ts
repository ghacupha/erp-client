import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDealer } from '../dealer.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../dealer.test-samples';

import { DealerService } from './dealer.service';

const requireRestSample: IDealer = {
  ...sampleWithRequiredData,
};

describe('Dealer Service', () => {
  let service: DealerService;
  let httpMock: HttpTestingController;
  let expectedResult: IDealer | IDealer[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DealerService);
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

    it('should create a Dealer', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dealer = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dealer).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Dealer', () => {
      const dealer = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dealer).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Dealer', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Dealer', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Dealer', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDealerToCollectionIfMissing', () => {
      it('should add a Dealer to an empty array', () => {
        const dealer: IDealer = sampleWithRequiredData;
        expectedResult = service.addDealerToCollectionIfMissing([], dealer);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dealer);
      });

      it('should not add a Dealer to an array that contains it', () => {
        const dealer: IDealer = sampleWithRequiredData;
        const dealerCollection: IDealer[] = [
          {
            ...dealer,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDealerToCollectionIfMissing(dealerCollection, dealer);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Dealer to an array that doesn't contain it", () => {
        const dealer: IDealer = sampleWithRequiredData;
        const dealerCollection: IDealer[] = [sampleWithPartialData];
        expectedResult = service.addDealerToCollectionIfMissing(dealerCollection, dealer);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dealer);
      });

      it('should add only unique Dealer to an array', () => {
        const dealerArray: IDealer[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dealerCollection: IDealer[] = [sampleWithRequiredData];
        expectedResult = service.addDealerToCollectionIfMissing(dealerCollection, ...dealerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dealer: IDealer = sampleWithRequiredData;
        const dealer2: IDealer = sampleWithPartialData;
        expectedResult = service.addDealerToCollectionIfMissing([], dealer, dealer2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dealer);
        expect(expectedResult).toContain(dealer2);
      });

      it('should accept null and undefined values', () => {
        const dealer: IDealer = sampleWithRequiredData;
        expectedResult = service.addDealerToCollectionIfMissing([], null, dealer, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dealer);
      });

      it('should return initial array if no Dealer is added', () => {
        const dealerCollection: IDealer[] = [sampleWithRequiredData];
        expectedResult = service.addDealerToCollectionIfMissing(dealerCollection, undefined, null);
        expect(expectedResult).toEqual(dealerCollection);
      });
    });

    describe('compareDealer', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDealer(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDealer(entity1, entity2);
        const compareResult2 = service.compareDealer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDealer(entity1, entity2);
        const compareResult2 = service.compareDealer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDealer(entity1, entity2);
        const compareResult2 = service.compareDealer(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
