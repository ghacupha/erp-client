import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReportContentType } from '../report-content-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../report-content-type.test-samples';

import { ReportContentTypeService } from './report-content-type.service';

const requireRestSample: IReportContentType = {
  ...sampleWithRequiredData,
};

describe('ReportContentType Service', () => {
  let service: ReportContentTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IReportContentType | IReportContentType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReportContentTypeService);
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

    it('should create a ReportContentType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reportContentType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reportContentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReportContentType', () => {
      const reportContentType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reportContentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReportContentType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReportContentType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReportContentType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReportContentTypeToCollectionIfMissing', () => {
      it('should add a ReportContentType to an empty array', () => {
        const reportContentType: IReportContentType = sampleWithRequiredData;
        expectedResult = service.addReportContentTypeToCollectionIfMissing([], reportContentType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportContentType);
      });

      it('should not add a ReportContentType to an array that contains it', () => {
        const reportContentType: IReportContentType = sampleWithRequiredData;
        const reportContentTypeCollection: IReportContentType[] = [
          {
            ...reportContentType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReportContentTypeToCollectionIfMissing(reportContentTypeCollection, reportContentType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReportContentType to an array that doesn't contain it", () => {
        const reportContentType: IReportContentType = sampleWithRequiredData;
        const reportContentTypeCollection: IReportContentType[] = [sampleWithPartialData];
        expectedResult = service.addReportContentTypeToCollectionIfMissing(reportContentTypeCollection, reportContentType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportContentType);
      });

      it('should add only unique ReportContentType to an array', () => {
        const reportContentTypeArray: IReportContentType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reportContentTypeCollection: IReportContentType[] = [sampleWithRequiredData];
        expectedResult = service.addReportContentTypeToCollectionIfMissing(reportContentTypeCollection, ...reportContentTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reportContentType: IReportContentType = sampleWithRequiredData;
        const reportContentType2: IReportContentType = sampleWithPartialData;
        expectedResult = service.addReportContentTypeToCollectionIfMissing([], reportContentType, reportContentType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportContentType);
        expect(expectedResult).toContain(reportContentType2);
      });

      it('should accept null and undefined values', () => {
        const reportContentType: IReportContentType = sampleWithRequiredData;
        expectedResult = service.addReportContentTypeToCollectionIfMissing([], null, reportContentType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportContentType);
      });

      it('should return initial array if no ReportContentType is added', () => {
        const reportContentTypeCollection: IReportContentType[] = [sampleWithRequiredData];
        expectedResult = service.addReportContentTypeToCollectionIfMissing(reportContentTypeCollection, undefined, null);
        expect(expectedResult).toEqual(reportContentTypeCollection);
      });
    });

    describe('compareReportContentType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReportContentType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReportContentType(entity1, entity2);
        const compareResult2 = service.compareReportContentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReportContentType(entity1, entity2);
        const compareResult2 = service.compareReportContentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReportContentType(entity1, entity2);
        const compareResult2 = service.compareReportContentType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
