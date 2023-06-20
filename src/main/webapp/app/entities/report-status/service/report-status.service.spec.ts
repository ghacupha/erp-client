import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReportStatus } from '../report-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../report-status.test-samples';

import { ReportStatusService } from './report-status.service';

const requireRestSample: IReportStatus = {
  ...sampleWithRequiredData,
};

describe('ReportStatus Service', () => {
  let service: ReportStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: IReportStatus | IReportStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReportStatusService);
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

    it('should create a ReportStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reportStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reportStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReportStatus', () => {
      const reportStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reportStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReportStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReportStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReportStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReportStatusToCollectionIfMissing', () => {
      it('should add a ReportStatus to an empty array', () => {
        const reportStatus: IReportStatus = sampleWithRequiredData;
        expectedResult = service.addReportStatusToCollectionIfMissing([], reportStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportStatus);
      });

      it('should not add a ReportStatus to an array that contains it', () => {
        const reportStatus: IReportStatus = sampleWithRequiredData;
        const reportStatusCollection: IReportStatus[] = [
          {
            ...reportStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReportStatusToCollectionIfMissing(reportStatusCollection, reportStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReportStatus to an array that doesn't contain it", () => {
        const reportStatus: IReportStatus = sampleWithRequiredData;
        const reportStatusCollection: IReportStatus[] = [sampleWithPartialData];
        expectedResult = service.addReportStatusToCollectionIfMissing(reportStatusCollection, reportStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportStatus);
      });

      it('should add only unique ReportStatus to an array', () => {
        const reportStatusArray: IReportStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reportStatusCollection: IReportStatus[] = [sampleWithRequiredData];
        expectedResult = service.addReportStatusToCollectionIfMissing(reportStatusCollection, ...reportStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reportStatus: IReportStatus = sampleWithRequiredData;
        const reportStatus2: IReportStatus = sampleWithPartialData;
        expectedResult = service.addReportStatusToCollectionIfMissing([], reportStatus, reportStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportStatus);
        expect(expectedResult).toContain(reportStatus2);
      });

      it('should accept null and undefined values', () => {
        const reportStatus: IReportStatus = sampleWithRequiredData;
        expectedResult = service.addReportStatusToCollectionIfMissing([], null, reportStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportStatus);
      });

      it('should return initial array if no ReportStatus is added', () => {
        const reportStatusCollection: IReportStatus[] = [sampleWithRequiredData];
        expectedResult = service.addReportStatusToCollectionIfMissing(reportStatusCollection, undefined, null);
        expect(expectedResult).toEqual(reportStatusCollection);
      });
    });

    describe('compareReportStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReportStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReportStatus(entity1, entity2);
        const compareResult2 = service.compareReportStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReportStatus(entity1, entity2);
        const compareResult2 = service.compareReportStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReportStatus(entity1, entity2);
        const compareResult2 = service.compareReportStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
