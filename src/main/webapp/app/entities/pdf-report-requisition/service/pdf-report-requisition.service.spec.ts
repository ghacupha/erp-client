import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPdfReportRequisition } from '../pdf-report-requisition.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../pdf-report-requisition.test-samples';

import { PdfReportRequisitionService, RestPdfReportRequisition } from './pdf-report-requisition.service';

const requireRestSample: RestPdfReportRequisition = {
  ...sampleWithRequiredData,
  reportDate: sampleWithRequiredData.reportDate?.format(DATE_FORMAT),
};

describe('PdfReportRequisition Service', () => {
  let service: PdfReportRequisitionService;
  let httpMock: HttpTestingController;
  let expectedResult: IPdfReportRequisition | IPdfReportRequisition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PdfReportRequisitionService);
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

    it('should create a PdfReportRequisition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pdfReportRequisition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pdfReportRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PdfReportRequisition', () => {
      const pdfReportRequisition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pdfReportRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PdfReportRequisition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PdfReportRequisition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PdfReportRequisition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPdfReportRequisitionToCollectionIfMissing', () => {
      it('should add a PdfReportRequisition to an empty array', () => {
        const pdfReportRequisition: IPdfReportRequisition = sampleWithRequiredData;
        expectedResult = service.addPdfReportRequisitionToCollectionIfMissing([], pdfReportRequisition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pdfReportRequisition);
      });

      it('should not add a PdfReportRequisition to an array that contains it', () => {
        const pdfReportRequisition: IPdfReportRequisition = sampleWithRequiredData;
        const pdfReportRequisitionCollection: IPdfReportRequisition[] = [
          {
            ...pdfReportRequisition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPdfReportRequisitionToCollectionIfMissing(pdfReportRequisitionCollection, pdfReportRequisition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PdfReportRequisition to an array that doesn't contain it", () => {
        const pdfReportRequisition: IPdfReportRequisition = sampleWithRequiredData;
        const pdfReportRequisitionCollection: IPdfReportRequisition[] = [sampleWithPartialData];
        expectedResult = service.addPdfReportRequisitionToCollectionIfMissing(pdfReportRequisitionCollection, pdfReportRequisition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pdfReportRequisition);
      });

      it('should add only unique PdfReportRequisition to an array', () => {
        const pdfReportRequisitionArray: IPdfReportRequisition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pdfReportRequisitionCollection: IPdfReportRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addPdfReportRequisitionToCollectionIfMissing(pdfReportRequisitionCollection, ...pdfReportRequisitionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pdfReportRequisition: IPdfReportRequisition = sampleWithRequiredData;
        const pdfReportRequisition2: IPdfReportRequisition = sampleWithPartialData;
        expectedResult = service.addPdfReportRequisitionToCollectionIfMissing([], pdfReportRequisition, pdfReportRequisition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pdfReportRequisition);
        expect(expectedResult).toContain(pdfReportRequisition2);
      });

      it('should accept null and undefined values', () => {
        const pdfReportRequisition: IPdfReportRequisition = sampleWithRequiredData;
        expectedResult = service.addPdfReportRequisitionToCollectionIfMissing([], null, pdfReportRequisition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pdfReportRequisition);
      });

      it('should return initial array if no PdfReportRequisition is added', () => {
        const pdfReportRequisitionCollection: IPdfReportRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addPdfReportRequisitionToCollectionIfMissing(pdfReportRequisitionCollection, undefined, null);
        expect(expectedResult).toEqual(pdfReportRequisitionCollection);
      });
    });

    describe('comparePdfReportRequisition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePdfReportRequisition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePdfReportRequisition(entity1, entity2);
        const compareResult2 = service.comparePdfReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePdfReportRequisition(entity1, entity2);
        const compareResult2 = service.comparePdfReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePdfReportRequisition(entity1, entity2);
        const compareResult2 = service.comparePdfReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
