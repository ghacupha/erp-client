import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IContractMetadata } from '../contract-metadata.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../contract-metadata.test-samples';

import { ContractMetadataService, RestContractMetadata } from './contract-metadata.service';

const requireRestSample: RestContractMetadata = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.format(DATE_FORMAT),
  terminationDate: sampleWithRequiredData.terminationDate?.format(DATE_FORMAT),
};

describe('ContractMetadata Service', () => {
  let service: ContractMetadataService;
  let httpMock: HttpTestingController;
  let expectedResult: IContractMetadata | IContractMetadata[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContractMetadataService);
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

    it('should create a ContractMetadata', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const contractMetadata = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contractMetadata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContractMetadata', () => {
      const contractMetadata = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contractMetadata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContractMetadata', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContractMetadata', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ContractMetadata', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContractMetadataToCollectionIfMissing', () => {
      it('should add a ContractMetadata to an empty array', () => {
        const contractMetadata: IContractMetadata = sampleWithRequiredData;
        expectedResult = service.addContractMetadataToCollectionIfMissing([], contractMetadata);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contractMetadata);
      });

      it('should not add a ContractMetadata to an array that contains it', () => {
        const contractMetadata: IContractMetadata = sampleWithRequiredData;
        const contractMetadataCollection: IContractMetadata[] = [
          {
            ...contractMetadata,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContractMetadataToCollectionIfMissing(contractMetadataCollection, contractMetadata);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContractMetadata to an array that doesn't contain it", () => {
        const contractMetadata: IContractMetadata = sampleWithRequiredData;
        const contractMetadataCollection: IContractMetadata[] = [sampleWithPartialData];
        expectedResult = service.addContractMetadataToCollectionIfMissing(contractMetadataCollection, contractMetadata);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contractMetadata);
      });

      it('should add only unique ContractMetadata to an array', () => {
        const contractMetadataArray: IContractMetadata[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contractMetadataCollection: IContractMetadata[] = [sampleWithRequiredData];
        expectedResult = service.addContractMetadataToCollectionIfMissing(contractMetadataCollection, ...contractMetadataArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contractMetadata: IContractMetadata = sampleWithRequiredData;
        const contractMetadata2: IContractMetadata = sampleWithPartialData;
        expectedResult = service.addContractMetadataToCollectionIfMissing([], contractMetadata, contractMetadata2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contractMetadata);
        expect(expectedResult).toContain(contractMetadata2);
      });

      it('should accept null and undefined values', () => {
        const contractMetadata: IContractMetadata = sampleWithRequiredData;
        expectedResult = service.addContractMetadataToCollectionIfMissing([], null, contractMetadata, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contractMetadata);
      });

      it('should return initial array if no ContractMetadata is added', () => {
        const contractMetadataCollection: IContractMetadata[] = [sampleWithRequiredData];
        expectedResult = service.addContractMetadataToCollectionIfMissing(contractMetadataCollection, undefined, null);
        expect(expectedResult).toEqual(contractMetadataCollection);
      });
    });

    describe('compareContractMetadata', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContractMetadata(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContractMetadata(entity1, entity2);
        const compareResult2 = service.compareContractMetadata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContractMetadata(entity1, entity2);
        const compareResult2 = service.compareContractMetadata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContractMetadata(entity1, entity2);
        const compareResult2 = service.compareContractMetadata(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
