///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.7
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

import { IWorkInProgressOutstandingReport } from '../work-in-progress-outstanding-report.model';

import { WorkInProgressOutstandingReportService } from './work-in-progress-outstanding-report.service';

describe('WorkInProgressOutstandingReport Service', () => {
  let service: WorkInProgressOutstandingReportService;
  let httpMock: HttpTestingController;
  let elemDefault: IWorkInProgressOutstandingReport;
  let expectedResult: IWorkInProgressOutstandingReport | IWorkInProgressOutstandingReport[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkInProgressOutstandingReportService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sequenceNumber: 'AAAAAAA',
      particulars: 'AAAAAAA',
      dealerName: 'AAAAAAA',
      iso4217Code: 'AAAAAAA',
      instalmentAmount: 0,
      totalTransferAmount: 0,
      outstandingAmount: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should return a list of WorkInProgressOutstandingReport', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sequenceNumber: 'BBBBBB',
          particulars: 'BBBBBB',
          dealerName: 'BBBBBB',
          iso4217Code: 'BBBBBB',
          instalmentAmount: 1,
          totalTransferAmount: 1,
          outstandingAmount: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    describe('addWorkInProgressOutstandingReportToCollectionIfMissing', () => {
      it('should add a WorkInProgressOutstandingReport to an empty array', () => {
        const workInProgressOutstandingReport: IWorkInProgressOutstandingReport = { id: 123 };
        expectedResult = service.addWorkInProgressOutstandingReportToCollectionIfMissing([], workInProgressOutstandingReport);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressOutstandingReport);
      });

      it('should not add a WorkInProgressOutstandingReport to an array that contains it', () => {
        const workInProgressOutstandingReport: IWorkInProgressOutstandingReport = { id: 123 };
        const workInProgressOutstandingReportCollection: IWorkInProgressOutstandingReport[] = [
          {
            ...workInProgressOutstandingReport,
          },
          { id: 456 },
        ];
        expectedResult = service.addWorkInProgressOutstandingReportToCollectionIfMissing(
          workInProgressOutstandingReportCollection,
          workInProgressOutstandingReport
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkInProgressOutstandingReport to an array that doesn't contain it", () => {
        const workInProgressOutstandingReport: IWorkInProgressOutstandingReport = { id: 123 };
        const workInProgressOutstandingReportCollection: IWorkInProgressOutstandingReport[] = [{ id: 456 }];
        expectedResult = service.addWorkInProgressOutstandingReportToCollectionIfMissing(
          workInProgressOutstandingReportCollection,
          workInProgressOutstandingReport
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressOutstandingReport);
      });

      it('should add only unique WorkInProgressOutstandingReport to an array', () => {
        const workInProgressOutstandingReportArray: IWorkInProgressOutstandingReport[] = [{ id: 123 }, { id: 456 }, { id: 73469 }];
        const workInProgressOutstandingReportCollection: IWorkInProgressOutstandingReport[] = [{ id: 123 }];
        expectedResult = service.addWorkInProgressOutstandingReportToCollectionIfMissing(
          workInProgressOutstandingReportCollection,
          ...workInProgressOutstandingReportArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workInProgressOutstandingReport: IWorkInProgressOutstandingReport = { id: 123 };
        const workInProgressOutstandingReport2: IWorkInProgressOutstandingReport = { id: 456 };
        expectedResult = service.addWorkInProgressOutstandingReportToCollectionIfMissing(
          [],
          workInProgressOutstandingReport,
          workInProgressOutstandingReport2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressOutstandingReport);
        expect(expectedResult).toContain(workInProgressOutstandingReport2);
      });

      it('should accept null and undefined values', () => {
        const workInProgressOutstandingReport: IWorkInProgressOutstandingReport = { id: 123 };
        expectedResult = service.addWorkInProgressOutstandingReportToCollectionIfMissing(
          [],
          null,
          workInProgressOutstandingReport,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressOutstandingReport);
      });

      it('should return initial array if no WorkInProgressOutstandingReport is added', () => {
        const workInProgressOutstandingReportCollection: IWorkInProgressOutstandingReport[] = [{ id: 123 }];
        expectedResult = service.addWorkInProgressOutstandingReportToCollectionIfMissing(
          workInProgressOutstandingReportCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(workInProgressOutstandingReportCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
