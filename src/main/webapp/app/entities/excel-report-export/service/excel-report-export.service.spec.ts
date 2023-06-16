import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IExcelReportExport } from '../excel-report-export.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../excel-report-export.test-samples';

import { ExcelReportExportService, RestExcelReportExport } from './excel-report-export.service';

const requireRestSample: RestExcelReportExport = {
  ...sampleWithRequiredData,
  reportTimeStamp: sampleWithRequiredData.reportTimeStamp?.toJSON(),
};

describe('ExcelReportExport Service', () => {
  let service: ExcelReportExportService;
  let httpMock: HttpTestingController;
  let expectedResult: IExcelReportExport | IExcelReportExport[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ExcelReportExportService);
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

    it('should create a ExcelReportExport', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const excelReportExport = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(excelReportExport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ExcelReportExport', () => {
      const excelReportExport = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(excelReportExport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ExcelReportExport', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ExcelReportExport', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ExcelReportExport', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addExcelReportExportToCollectionIfMissing', () => {
      it('should add a ExcelReportExport to an empty array', () => {
        const excelReportExport: IExcelReportExport = sampleWithRequiredData;
        expectedResult = service.addExcelReportExportToCollectionIfMissing([], excelReportExport);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(excelReportExport);
      });

      it('should not add a ExcelReportExport to an array that contains it', () => {
        const excelReportExport: IExcelReportExport = sampleWithRequiredData;
        const excelReportExportCollection: IExcelReportExport[] = [
          {
            ...excelReportExport,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addExcelReportExportToCollectionIfMissing(excelReportExportCollection, excelReportExport);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ExcelReportExport to an array that doesn't contain it", () => {
        const excelReportExport: IExcelReportExport = sampleWithRequiredData;
        const excelReportExportCollection: IExcelReportExport[] = [sampleWithPartialData];
        expectedResult = service.addExcelReportExportToCollectionIfMissing(excelReportExportCollection, excelReportExport);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(excelReportExport);
      });

      it('should add only unique ExcelReportExport to an array', () => {
        const excelReportExportArray: IExcelReportExport[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const excelReportExportCollection: IExcelReportExport[] = [sampleWithRequiredData];
        expectedResult = service.addExcelReportExportToCollectionIfMissing(excelReportExportCollection, ...excelReportExportArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const excelReportExport: IExcelReportExport = sampleWithRequiredData;
        const excelReportExport2: IExcelReportExport = sampleWithPartialData;
        expectedResult = service.addExcelReportExportToCollectionIfMissing([], excelReportExport, excelReportExport2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(excelReportExport);
        expect(expectedResult).toContain(excelReportExport2);
      });

      it('should accept null and undefined values', () => {
        const excelReportExport: IExcelReportExport = sampleWithRequiredData;
        expectedResult = service.addExcelReportExportToCollectionIfMissing([], null, excelReportExport, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(excelReportExport);
      });

      it('should return initial array if no ExcelReportExport is added', () => {
        const excelReportExportCollection: IExcelReportExport[] = [sampleWithRequiredData];
        expectedResult = service.addExcelReportExportToCollectionIfMissing(excelReportExportCollection, undefined, null);
        expect(expectedResult).toEqual(excelReportExportCollection);
      });
    });

    describe('compareExcelReportExport', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareExcelReportExport(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareExcelReportExport(entity1, entity2);
        const compareResult2 = service.compareExcelReportExport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareExcelReportExport(entity1, entity2);
        const compareResult2 = service.compareExcelReportExport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareExcelReportExport(entity1, entity2);
        const compareResult2 = service.compareExcelReportExport(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
