import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReportTemplate } from '../report-template.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../report-template.test-samples';

import { ReportTemplateService } from './report-template.service';

const requireRestSample: IReportTemplate = {
  ...sampleWithRequiredData,
};

describe('ReportTemplate Service', () => {
  let service: ReportTemplateService;
  let httpMock: HttpTestingController;
  let expectedResult: IReportTemplate | IReportTemplate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReportTemplateService);
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

    it('should create a ReportTemplate', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reportTemplate = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reportTemplate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReportTemplate', () => {
      const reportTemplate = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reportTemplate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReportTemplate', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReportTemplate', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReportTemplate', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReportTemplateToCollectionIfMissing', () => {
      it('should add a ReportTemplate to an empty array', () => {
        const reportTemplate: IReportTemplate = sampleWithRequiredData;
        expectedResult = service.addReportTemplateToCollectionIfMissing([], reportTemplate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportTemplate);
      });

      it('should not add a ReportTemplate to an array that contains it', () => {
        const reportTemplate: IReportTemplate = sampleWithRequiredData;
        const reportTemplateCollection: IReportTemplate[] = [
          {
            ...reportTemplate,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReportTemplateToCollectionIfMissing(reportTemplateCollection, reportTemplate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReportTemplate to an array that doesn't contain it", () => {
        const reportTemplate: IReportTemplate = sampleWithRequiredData;
        const reportTemplateCollection: IReportTemplate[] = [sampleWithPartialData];
        expectedResult = service.addReportTemplateToCollectionIfMissing(reportTemplateCollection, reportTemplate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportTemplate);
      });

      it('should add only unique ReportTemplate to an array', () => {
        const reportTemplateArray: IReportTemplate[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reportTemplateCollection: IReportTemplate[] = [sampleWithRequiredData];
        expectedResult = service.addReportTemplateToCollectionIfMissing(reportTemplateCollection, ...reportTemplateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reportTemplate: IReportTemplate = sampleWithRequiredData;
        const reportTemplate2: IReportTemplate = sampleWithPartialData;
        expectedResult = service.addReportTemplateToCollectionIfMissing([], reportTemplate, reportTemplate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportTemplate);
        expect(expectedResult).toContain(reportTemplate2);
      });

      it('should accept null and undefined values', () => {
        const reportTemplate: IReportTemplate = sampleWithRequiredData;
        expectedResult = service.addReportTemplateToCollectionIfMissing([], null, reportTemplate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportTemplate);
      });

      it('should return initial array if no ReportTemplate is added', () => {
        const reportTemplateCollection: IReportTemplate[] = [sampleWithRequiredData];
        expectedResult = service.addReportTemplateToCollectionIfMissing(reportTemplateCollection, undefined, null);
        expect(expectedResult).toEqual(reportTemplateCollection);
      });
    });

    describe('compareReportTemplate', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReportTemplate(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReportTemplate(entity1, entity2);
        const compareResult2 = service.compareReportTemplate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReportTemplate(entity1, entity2);
        const compareResult2 = service.compareReportTemplate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReportTemplate(entity1, entity2);
        const compareResult2 = service.compareReportTemplate(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
