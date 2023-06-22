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
import { ILeaseContract } from '../lease-contract.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../lease-contract.test-samples';

import { LeaseContractService, RestLeaseContract } from './lease-contract.service';

const requireRestSample: RestLeaseContract = {
  ...sampleWithRequiredData,
  commencementDate: sampleWithRequiredData.commencementDate?.format(DATE_FORMAT),
  terminalDate: sampleWithRequiredData.terminalDate?.format(DATE_FORMAT),
};

describe('LeaseContract Service', () => {
  let service: LeaseContractService;
  let httpMock: HttpTestingController;
  let expectedResult: ILeaseContract | ILeaseContract[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LeaseContractService);
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

    it('should create a LeaseContract', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const leaseContract = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(leaseContract).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LeaseContract', () => {
      const leaseContract = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(leaseContract).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LeaseContract', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LeaseContract', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LeaseContract', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLeaseContractToCollectionIfMissing', () => {
      it('should add a LeaseContract to an empty array', () => {
        const leaseContract: ILeaseContract = sampleWithRequiredData;
        expectedResult = service.addLeaseContractToCollectionIfMissing([], leaseContract);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseContract);
      });

      it('should not add a LeaseContract to an array that contains it', () => {
        const leaseContract: ILeaseContract = sampleWithRequiredData;
        const leaseContractCollection: ILeaseContract[] = [
          {
            ...leaseContract,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLeaseContractToCollectionIfMissing(leaseContractCollection, leaseContract);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LeaseContract to an array that doesn't contain it", () => {
        const leaseContract: ILeaseContract = sampleWithRequiredData;
        const leaseContractCollection: ILeaseContract[] = [sampleWithPartialData];
        expectedResult = service.addLeaseContractToCollectionIfMissing(leaseContractCollection, leaseContract);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(leaseContract);
      });

      it('should add only unique LeaseContract to an array', () => {
        const leaseContractArray: ILeaseContract[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const leaseContractCollection: ILeaseContract[] = [sampleWithRequiredData];
        expectedResult = service.addLeaseContractToCollectionIfMissing(leaseContractCollection, ...leaseContractArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const leaseContract: ILeaseContract = sampleWithRequiredData;
        const leaseContract2: ILeaseContract = sampleWithPartialData;
        expectedResult = service.addLeaseContractToCollectionIfMissing([], leaseContract, leaseContract2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(leaseContract);
        expect(expectedResult).toContain(leaseContract2);
      });

      it('should accept null and undefined values', () => {
        const leaseContract: ILeaseContract = sampleWithRequiredData;
        expectedResult = service.addLeaseContractToCollectionIfMissing([], null, leaseContract, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(leaseContract);
      });

      it('should return initial array if no LeaseContract is added', () => {
        const leaseContractCollection: ILeaseContract[] = [sampleWithRequiredData];
        expectedResult = service.addLeaseContractToCollectionIfMissing(leaseContractCollection, undefined, null);
        expect(expectedResult).toEqual(leaseContractCollection);
      });
    });

    describe('compareLeaseContract', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLeaseContract(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLeaseContract(entity1, entity2);
        const compareResult2 = service.compareLeaseContract(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLeaseContract(entity1, entity2);
        const compareResult2 = service.compareLeaseContract(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLeaseContract(entity1, entity2);
        const compareResult2 = service.compareLeaseContract(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
