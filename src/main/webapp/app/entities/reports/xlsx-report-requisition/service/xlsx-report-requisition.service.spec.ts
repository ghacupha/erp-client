///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IXlsxReportRequisition } from '../xlsx-report-requisition.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../xlsx-report-requisition.test-samples';

import { XlsxReportRequisitionService, RestXlsxReportRequisition } from './xlsx-report-requisition.service';

const requireRestSample: RestXlsxReportRequisition = {
  ...sampleWithRequiredData,
  reportDate: sampleWithRequiredData.reportDate?.format(DATE_FORMAT),
};

describe('XlsxReportRequisition Service', () => {
  let service: XlsxReportRequisitionService;
  let httpMock: HttpTestingController;
  let expectedResult: IXlsxReportRequisition | IXlsxReportRequisition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(XlsxReportRequisitionService);
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

    it('should create a XlsxReportRequisition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const xlsxReportRequisition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(xlsxReportRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a XlsxReportRequisition', () => {
      const xlsxReportRequisition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(xlsxReportRequisition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a XlsxReportRequisition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of XlsxReportRequisition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a XlsxReportRequisition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addXlsxReportRequisitionToCollectionIfMissing', () => {
      it('should add a XlsxReportRequisition to an empty array', () => {
        const xlsxReportRequisition: IXlsxReportRequisition = sampleWithRequiredData;
        expectedResult = service.addXlsxReportRequisitionToCollectionIfMissing([], xlsxReportRequisition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(xlsxReportRequisition);
      });

      it('should not add a XlsxReportRequisition to an array that contains it', () => {
        const xlsxReportRequisition: IXlsxReportRequisition = sampleWithRequiredData;
        const xlsxReportRequisitionCollection: IXlsxReportRequisition[] = [
          {
            ...xlsxReportRequisition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addXlsxReportRequisitionToCollectionIfMissing(xlsxReportRequisitionCollection, xlsxReportRequisition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a XlsxReportRequisition to an array that doesn't contain it", () => {
        const xlsxReportRequisition: IXlsxReportRequisition = sampleWithRequiredData;
        const xlsxReportRequisitionCollection: IXlsxReportRequisition[] = [sampleWithPartialData];
        expectedResult = service.addXlsxReportRequisitionToCollectionIfMissing(xlsxReportRequisitionCollection, xlsxReportRequisition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(xlsxReportRequisition);
      });

      it('should add only unique XlsxReportRequisition to an array', () => {
        const xlsxReportRequisitionArray: IXlsxReportRequisition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const xlsxReportRequisitionCollection: IXlsxReportRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addXlsxReportRequisitionToCollectionIfMissing(
          xlsxReportRequisitionCollection,
          ...xlsxReportRequisitionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const xlsxReportRequisition: IXlsxReportRequisition = sampleWithRequiredData;
        const xlsxReportRequisition2: IXlsxReportRequisition = sampleWithPartialData;
        expectedResult = service.addXlsxReportRequisitionToCollectionIfMissing([], xlsxReportRequisition, xlsxReportRequisition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(xlsxReportRequisition);
        expect(expectedResult).toContain(xlsxReportRequisition2);
      });

      it('should accept null and undefined values', () => {
        const xlsxReportRequisition: IXlsxReportRequisition = sampleWithRequiredData;
        expectedResult = service.addXlsxReportRequisitionToCollectionIfMissing([], null, xlsxReportRequisition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(xlsxReportRequisition);
      });

      it('should return initial array if no XlsxReportRequisition is added', () => {
        const xlsxReportRequisitionCollection: IXlsxReportRequisition[] = [sampleWithRequiredData];
        expectedResult = service.addXlsxReportRequisitionToCollectionIfMissing(xlsxReportRequisitionCollection, undefined, null);
        expect(expectedResult).toEqual(xlsxReportRequisitionCollection);
      });
    });

    describe('compareXlsxReportRequisition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareXlsxReportRequisition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareXlsxReportRequisition(entity1, entity2);
        const compareResult2 = service.compareXlsxReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareXlsxReportRequisition(entity1, entity2);
        const compareResult2 = service.compareXlsxReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareXlsxReportRequisition(entity1, entity2);
        const compareResult2 = service.compareXlsxReportRequisition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
