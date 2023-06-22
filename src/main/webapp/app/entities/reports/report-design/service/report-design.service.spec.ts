import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReportDesign } from '../report-design.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../report-design.test-samples';

import { ReportDesignService } from './report-design.service';

const requireRestSample: IReportDesign = {
  ...sampleWithRequiredData,
};

describe('ReportDesign Service', () => {
  let service: ReportDesignService;
  let httpMock: HttpTestingController;
  let expectedResult: IReportDesign | IReportDesign[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReportDesignService);
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

    it('should create a ReportDesign', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reportDesign = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reportDesign).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReportDesign', () => {
      const reportDesign = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reportDesign).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReportDesign', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReportDesign', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReportDesign', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReportDesignToCollectionIfMissing', () => {
      it('should add a ReportDesign to an empty array', () => {
        const reportDesign: IReportDesign = sampleWithRequiredData;
        expectedResult = service.addReportDesignToCollectionIfMissing([], reportDesign);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportDesign);
      });

      it('should not add a ReportDesign to an array that contains it', () => {
        const reportDesign: IReportDesign = sampleWithRequiredData;
        const reportDesignCollection: IReportDesign[] = [
          {
            ...reportDesign,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReportDesignToCollectionIfMissing(reportDesignCollection, reportDesign);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReportDesign to an array that doesn't contain it", () => {
        const reportDesign: IReportDesign = sampleWithRequiredData;
        const reportDesignCollection: IReportDesign[] = [sampleWithPartialData];
        expectedResult = service.addReportDesignToCollectionIfMissing(reportDesignCollection, reportDesign);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportDesign);
      });

      it('should add only unique ReportDesign to an array', () => {
        const reportDesignArray: IReportDesign[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reportDesignCollection: IReportDesign[] = [sampleWithRequiredData];
        expectedResult = service.addReportDesignToCollectionIfMissing(reportDesignCollection, ...reportDesignArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reportDesign: IReportDesign = sampleWithRequiredData;
        const reportDesign2: IReportDesign = sampleWithPartialData;
        expectedResult = service.addReportDesignToCollectionIfMissing([], reportDesign, reportDesign2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reportDesign);
        expect(expectedResult).toContain(reportDesign2);
      });

      it('should accept null and undefined values', () => {
        const reportDesign: IReportDesign = sampleWithRequiredData;
        expectedResult = service.addReportDesignToCollectionIfMissing([], null, reportDesign, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reportDesign);
      });

      it('should return initial array if no ReportDesign is added', () => {
        const reportDesignCollection: IReportDesign[] = [sampleWithRequiredData];
        expectedResult = service.addReportDesignToCollectionIfMissing(reportDesignCollection, undefined, null);
        expect(expectedResult).toEqual(reportDesignCollection);
      });
    });

    describe('compareReportDesign', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReportDesign(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReportDesign(entity1, entity2);
        const compareResult2 = service.compareReportDesign(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReportDesign(entity1, entity2);
        const compareResult2 = service.compareReportDesign(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReportDesign(entity1, entity2);
        const compareResult2 = service.compareReportDesign(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
