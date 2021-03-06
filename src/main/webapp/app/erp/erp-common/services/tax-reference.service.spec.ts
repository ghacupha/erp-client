import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITaxReference, TaxReference } from '../models/tax-reference.model';

import { TaxReferenceService } from './tax-reference.service';
import { ErpCommonModule } from '../erp-common.module';
import { taxReferenceTypes } from '../enumerations/tax-reference-types.model';

describe('Service Tests', () => {
  describe('TaxReference Service', () => {
    let service: TaxReferenceService;
    let httpMock: HttpTestingController;
    let elemDefault: ITaxReference;
    let expectedResult: ITaxReference | ITaxReference[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ErpCommonModule, HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TaxReferenceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        taxName: 'AAAAAAA',
        taxDescription: 'AAAAAAA',
        taxPercentage: 0,
        taxReferenceType: taxReferenceTypes.TELCO_EXCISE_DUTY,
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

      it('should create a TaxReference', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TaxReference()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TaxReference', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            taxName: 'BBBBBB',
            taxDescription: 'BBBBBB',
            taxPercentage: 1,
            taxReferenceType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TaxReference', () => {
        const patchObject = Object.assign(
          {
            taxName: 'BBBBBB',
            taxDescription: 'BBBBBB',
            taxPercentage: 1,
          },
          new TaxReference()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TaxReference', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            taxName: 'BBBBBB',
            taxDescription: 'BBBBBB',
            taxPercentage: 1,
            taxReferenceType: 'BBBBBB',
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

      it('should delete a TaxReference', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTaxReferenceToCollectionIfMissing', () => {
        it('should add a TaxReference to an empty array', () => {
          const taxReference: ITaxReference = { id: 123 };
          expectedResult = service.addTaxReferenceToCollectionIfMissing([], taxReference);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(taxReference);
        });

        it('should not add a TaxReference to an array that contains it', () => {
          const taxReference: ITaxReference = { id: 123 };
          const taxReferenceCollection: ITaxReference[] = [
            {
              ...taxReference,
            },
            { id: 456 },
          ];
          expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, taxReference);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TaxReference to an array that doesn't contain it", () => {
          const taxReference: ITaxReference = { id: 123 };
          const taxReferenceCollection: ITaxReference[] = [{ id: 456 }];
          expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, taxReference);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(taxReference);
        });

        it('should add only unique TaxReference to an array', () => {
          const taxReferenceArray: ITaxReference[] = [{ id: 123 }, { id: 456 }, { id: 74369 }];
          const taxReferenceCollection: ITaxReference[] = [{ id: 123 }];
          expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, ...taxReferenceArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const taxReference: ITaxReference = { id: 123 };
          const taxReference2: ITaxReference = { id: 456 };
          expectedResult = service.addTaxReferenceToCollectionIfMissing([], taxReference, taxReference2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(taxReference);
          expect(expectedResult).toContain(taxReference2);
        });

        it('should accept null and undefined values', () => {
          const taxReference: ITaxReference = { id: 123 };
          expectedResult = service.addTaxReferenceToCollectionIfMissing([], null, taxReference, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(taxReference);
        });

        it('should return initial array if no TaxReference is added', () => {
          const taxReferenceCollection: ITaxReference[] = [{ id: 123 }];
          expectedResult = service.addTaxReferenceToCollectionIfMissing(taxReferenceCollection, undefined, null);
          expect(expectedResult).toEqual(taxReferenceCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
