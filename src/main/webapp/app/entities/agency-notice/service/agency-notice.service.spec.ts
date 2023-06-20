import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAgencyNotice } from '../agency-notice.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../agency-notice.test-samples';

import { AgencyNoticeService, RestAgencyNotice } from './agency-notice.service';

const requireRestSample: RestAgencyNotice = {
  ...sampleWithRequiredData,
  referenceDate: sampleWithRequiredData.referenceDate?.format(DATE_FORMAT),
};

describe('AgencyNotice Service', () => {
  let service: AgencyNoticeService;
  let httpMock: HttpTestingController;
  let expectedResult: IAgencyNotice | IAgencyNotice[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AgencyNoticeService);
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

    it('should create a AgencyNotice', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const agencyNotice = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(agencyNotice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AgencyNotice', () => {
      const agencyNotice = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(agencyNotice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AgencyNotice', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AgencyNotice', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AgencyNotice', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAgencyNoticeToCollectionIfMissing', () => {
      it('should add a AgencyNotice to an empty array', () => {
        const agencyNotice: IAgencyNotice = sampleWithRequiredData;
        expectedResult = service.addAgencyNoticeToCollectionIfMissing([], agencyNotice);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(agencyNotice);
      });

      it('should not add a AgencyNotice to an array that contains it', () => {
        const agencyNotice: IAgencyNotice = sampleWithRequiredData;
        const agencyNoticeCollection: IAgencyNotice[] = [
          {
            ...agencyNotice,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAgencyNoticeToCollectionIfMissing(agencyNoticeCollection, agencyNotice);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AgencyNotice to an array that doesn't contain it", () => {
        const agencyNotice: IAgencyNotice = sampleWithRequiredData;
        const agencyNoticeCollection: IAgencyNotice[] = [sampleWithPartialData];
        expectedResult = service.addAgencyNoticeToCollectionIfMissing(agencyNoticeCollection, agencyNotice);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(agencyNotice);
      });

      it('should add only unique AgencyNotice to an array', () => {
        const agencyNoticeArray: IAgencyNotice[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const agencyNoticeCollection: IAgencyNotice[] = [sampleWithRequiredData];
        expectedResult = service.addAgencyNoticeToCollectionIfMissing(agencyNoticeCollection, ...agencyNoticeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const agencyNotice: IAgencyNotice = sampleWithRequiredData;
        const agencyNotice2: IAgencyNotice = sampleWithPartialData;
        expectedResult = service.addAgencyNoticeToCollectionIfMissing([], agencyNotice, agencyNotice2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(agencyNotice);
        expect(expectedResult).toContain(agencyNotice2);
      });

      it('should accept null and undefined values', () => {
        const agencyNotice: IAgencyNotice = sampleWithRequiredData;
        expectedResult = service.addAgencyNoticeToCollectionIfMissing([], null, agencyNotice, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(agencyNotice);
      });

      it('should return initial array if no AgencyNotice is added', () => {
        const agencyNoticeCollection: IAgencyNotice[] = [sampleWithRequiredData];
        expectedResult = service.addAgencyNoticeToCollectionIfMissing(agencyNoticeCollection, undefined, null);
        expect(expectedResult).toEqual(agencyNoticeCollection);
      });
    });

    describe('compareAgencyNotice', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAgencyNotice(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAgencyNotice(entity1, entity2);
        const compareResult2 = service.compareAgencyNotice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAgencyNotice(entity1, entity2);
        const compareResult2 = service.compareAgencyNotice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAgencyNotice(entity1, entity2);
        const compareResult2 = service.compareAgencyNotice(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
