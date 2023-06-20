import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPaymentCategory } from '../payment-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../payment-category.test-samples';

import { PaymentCategoryService } from './payment-category.service';

const requireRestSample: IPaymentCategory = {
  ...sampleWithRequiredData,
};

describe('PaymentCategory Service', () => {
  let service: PaymentCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: IPaymentCategory | IPaymentCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaymentCategoryService);
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

    it('should create a PaymentCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const paymentCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(paymentCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PaymentCategory', () => {
      const paymentCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(paymentCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PaymentCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PaymentCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PaymentCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPaymentCategoryToCollectionIfMissing', () => {
      it('should add a PaymentCategory to an empty array', () => {
        const paymentCategory: IPaymentCategory = sampleWithRequiredData;
        expectedResult = service.addPaymentCategoryToCollectionIfMissing([], paymentCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentCategory);
      });

      it('should not add a PaymentCategory to an array that contains it', () => {
        const paymentCategory: IPaymentCategory = sampleWithRequiredData;
        const paymentCategoryCollection: IPaymentCategory[] = [
          {
            ...paymentCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPaymentCategoryToCollectionIfMissing(paymentCategoryCollection, paymentCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PaymentCategory to an array that doesn't contain it", () => {
        const paymentCategory: IPaymentCategory = sampleWithRequiredData;
        const paymentCategoryCollection: IPaymentCategory[] = [sampleWithPartialData];
        expectedResult = service.addPaymentCategoryToCollectionIfMissing(paymentCategoryCollection, paymentCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentCategory);
      });

      it('should add only unique PaymentCategory to an array', () => {
        const paymentCategoryArray: IPaymentCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const paymentCategoryCollection: IPaymentCategory[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentCategoryToCollectionIfMissing(paymentCategoryCollection, ...paymentCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const paymentCategory: IPaymentCategory = sampleWithRequiredData;
        const paymentCategory2: IPaymentCategory = sampleWithPartialData;
        expectedResult = service.addPaymentCategoryToCollectionIfMissing([], paymentCategory, paymentCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentCategory);
        expect(expectedResult).toContain(paymentCategory2);
      });

      it('should accept null and undefined values', () => {
        const paymentCategory: IPaymentCategory = sampleWithRequiredData;
        expectedResult = service.addPaymentCategoryToCollectionIfMissing([], null, paymentCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentCategory);
      });

      it('should return initial array if no PaymentCategory is added', () => {
        const paymentCategoryCollection: IPaymentCategory[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentCategoryToCollectionIfMissing(paymentCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(paymentCategoryCollection);
      });
    });

    describe('comparePaymentCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePaymentCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePaymentCategory(entity1, entity2);
        const compareResult2 = service.comparePaymentCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePaymentCategory(entity1, entity2);
        const compareResult2 = service.comparePaymentCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePaymentCategory(entity1, entity2);
        const compareResult2 = service.comparePaymentCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
