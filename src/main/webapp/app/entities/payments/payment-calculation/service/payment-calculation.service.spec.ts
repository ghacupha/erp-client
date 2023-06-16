import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPaymentCalculation } from '../payment-calculation.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../payment-calculation.test-samples';

import { PaymentCalculationService } from './payment-calculation.service';

const requireRestSample: IPaymentCalculation = {
  ...sampleWithRequiredData,
};

describe('PaymentCalculation Service', () => {
  let service: PaymentCalculationService;
  let httpMock: HttpTestingController;
  let expectedResult: IPaymentCalculation | IPaymentCalculation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaymentCalculationService);
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

    it('should create a PaymentCalculation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const paymentCalculation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(paymentCalculation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PaymentCalculation', () => {
      const paymentCalculation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(paymentCalculation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PaymentCalculation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PaymentCalculation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PaymentCalculation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPaymentCalculationToCollectionIfMissing', () => {
      it('should add a PaymentCalculation to an empty array', () => {
        const paymentCalculation: IPaymentCalculation = sampleWithRequiredData;
        expectedResult = service.addPaymentCalculationToCollectionIfMissing([], paymentCalculation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentCalculation);
      });

      it('should not add a PaymentCalculation to an array that contains it', () => {
        const paymentCalculation: IPaymentCalculation = sampleWithRequiredData;
        const paymentCalculationCollection: IPaymentCalculation[] = [
          {
            ...paymentCalculation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPaymentCalculationToCollectionIfMissing(paymentCalculationCollection, paymentCalculation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PaymentCalculation to an array that doesn't contain it", () => {
        const paymentCalculation: IPaymentCalculation = sampleWithRequiredData;
        const paymentCalculationCollection: IPaymentCalculation[] = [sampleWithPartialData];
        expectedResult = service.addPaymentCalculationToCollectionIfMissing(paymentCalculationCollection, paymentCalculation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentCalculation);
      });

      it('should add only unique PaymentCalculation to an array', () => {
        const paymentCalculationArray: IPaymentCalculation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const paymentCalculationCollection: IPaymentCalculation[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentCalculationToCollectionIfMissing(paymentCalculationCollection, ...paymentCalculationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const paymentCalculation: IPaymentCalculation = sampleWithRequiredData;
        const paymentCalculation2: IPaymentCalculation = sampleWithPartialData;
        expectedResult = service.addPaymentCalculationToCollectionIfMissing([], paymentCalculation, paymentCalculation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentCalculation);
        expect(expectedResult).toContain(paymentCalculation2);
      });

      it('should accept null and undefined values', () => {
        const paymentCalculation: IPaymentCalculation = sampleWithRequiredData;
        expectedResult = service.addPaymentCalculationToCollectionIfMissing([], null, paymentCalculation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentCalculation);
      });

      it('should return initial array if no PaymentCalculation is added', () => {
        const paymentCalculationCollection: IPaymentCalculation[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentCalculationToCollectionIfMissing(paymentCalculationCollection, undefined, null);
        expect(expectedResult).toEqual(paymentCalculationCollection);
      });
    });

    describe('comparePaymentCalculation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePaymentCalculation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePaymentCalculation(entity1, entity2);
        const compareResult2 = service.comparePaymentCalculation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePaymentCalculation(entity1, entity2);
        const compareResult2 = service.comparePaymentCalculation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePaymentCalculation(entity1, entity2);
        const compareResult2 = service.comparePaymentCalculation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
