import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReportRequisition } from '../report-requisition.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../report-requisition.test-samples';

import { ReportRequisitionService, RestReportRequisition } from './report-requisition.service';

const requireRestSample: RestReportRequisition = {
  ...sampleWithRequiredData,
  reportRequestTime: sampleWithRequiredData.reportRequestTime?.toJSON(),
};

describe('ReportRequisition Service', () => {
  let service: ReportRequisitionService;
  let httpMock: HttpTestingController;
  let expectedResult: IReportRequisition | IReportRequisition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReportRequisitionService);
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

    it('should create a ReportRequisition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reportRequisition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reportRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReportRequisition', () => {
      const reportRequisition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reportRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReportRequisition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReportRequisition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReportRequisition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReportRequisitionToCollectionIfMissing', () => {
      it('should add a ReportRequisition to an empty array', () => {
        const reportRequisition: IReportRequisition = sampleWithRequiredData;
        expectedResult = service.addReportRequisitionToCollectionIfMissing([], reportRequisition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportRequisition);
      });

      it('should not add a ReportRequisition to an array that contains it', () => {
        const reportRequisition: IReportRequisition = sampleWithRequiredData;
        const reportRequisitionCollection: IReportRequisition[] = [
          {
            ...reportRequisition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReportRequisitionToCollectionIfMissing(reportRequisitionCollection, reportRequisition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReportRequisition to an array that doesn't contain it", () => {
        const reportRequisition: IReportRequisition = sampleWithRequiredData;
        const reportRequisitionCollection: IReportRequisition[] = [sampleWithPartialData];
        expectedResult = service.addReportRequisitionToCollectionIfMissing(reportRequisitionCollection, reportRequisition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportRequisition);
      });

      it('should add only unique ReportRequisition to an array', () => {
        const reportRequisitionArray: IReportRequisition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reportRequisitionCollection: IReportRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addReportRequisitionToCollectionIfMissing(reportRequisitionCollection, ...reportRequisitionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reportRequisition: IReportRequisition = sampleWithRequiredData;
        const reportRequisition2: IReportRequisition = sampleWithPartialData;
        expectedResult = service.addReportRequisitionToCollectionIfMissing([], reportRequisition, reportRequisition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportRequisition);
        expect(expectedResult).toContain(reportRequisition2);
      });

      it('should accept null and undefined values', () => {
        const reportRequisition: IReportRequisition = sampleWithRequiredData;
        expectedResult = service.addReportRequisitionToCollectionIfMissing([], null, reportRequisition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportRequisition);
      });

      it('should return initial array if no ReportRequisition is added', () => {
        const reportRequisitionCollection: IReportRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addReportRequisitionToCollectionIfMissing(reportRequisitionCollection, undefined, null);
        expect(expectedResult).toEqual(reportRequisitionCollection);
      });
    });

    describe('compareReportRequisition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReportRequisition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReportRequisition(entity1, entity2);
        const compareResult2 = service.compareReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReportRequisition(entity1, entity2);
        const compareResult2 = service.compareReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReportRequisition(entity1, entity2);
        const compareResult2 = service.compareReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
