import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPaymentLabel } from '../payment-label.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../payment-label.test-samples';

import { PaymentLabelService } from './payment-label.service';

const requireRestSample: IPaymentLabel = {
  ...sampleWithRequiredData,
};

describe('PaymentLabel Service', () => {
  let service: PaymentLabelService;
  let httpMock: HttpTestingController;
  let expectedResult: IPaymentLabel | IPaymentLabel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaymentLabelService);
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

    it('should create a PaymentLabel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const paymentLabel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(paymentLabel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PaymentLabel', () => {
      const paymentLabel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(paymentLabel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PaymentLabel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PaymentLabel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PaymentLabel', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPaymentLabelToCollectionIfMissing', () => {
      it('should add a PaymentLabel to an empty array', () => {
        const paymentLabel: IPaymentLabel = sampleWithRequiredData;
        expectedResult = service.addPaymentLabelToCollectionIfMissing([], paymentLabel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentLabel);
      });

      it('should not add a PaymentLabel to an array that contains it', () => {
        const paymentLabel: IPaymentLabel = sampleWithRequiredData;
        const paymentLabelCollection: IPaymentLabel[] = [
          {
            ...paymentLabel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPaymentLabelToCollectionIfMissing(paymentLabelCollection, paymentLabel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PaymentLabel to an array that doesn't contain it", () => {
        const paymentLabel: IPaymentLabel = sampleWithRequiredData;
        const paymentLabelCollection: IPaymentLabel[] = [sampleWithPartialData];
        expectedResult = service.addPaymentLabelToCollectionIfMissing(paymentLabelCollection, paymentLabel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentLabel);
      });

      it('should add only unique PaymentLabel to an array', () => {
        const paymentLabelArray: IPaymentLabel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const paymentLabelCollection: IPaymentLabel[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentLabelToCollectionIfMissing(paymentLabelCollection, ...paymentLabelArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const paymentLabel: IPaymentLabel = sampleWithRequiredData;
        const paymentLabel2: IPaymentLabel = sampleWithPartialData;
        expectedResult = service.addPaymentLabelToCollectionIfMissing([], paymentLabel, paymentLabel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentLabel);
        expect(expectedResult).toContain(paymentLabel2);
      });

      it('should accept null and undefined values', () => {
        const paymentLabel: IPaymentLabel = sampleWithRequiredData;
        expectedResult = service.addPaymentLabelToCollectionIfMissing([], null, paymentLabel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentLabel);
      });

      it('should return initial array if no PaymentLabel is added', () => {
        const paymentLabelCollection: IPaymentLabel[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentLabelToCollectionIfMissing(paymentLabelCollection, undefined, null);
        expect(expectedResult).toEqual(paymentLabelCollection);
      });
    });

    describe('comparePaymentLabel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePaymentLabel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePaymentLabel(entity1, entity2);
        const compareResult2 = service.comparePaymentLabel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePaymentLabel(entity1, entity2);
        const compareResult2 = service.comparePaymentLabel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePaymentLabel(entity1, entity2);
        const compareResult2 = service.comparePaymentLabel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
