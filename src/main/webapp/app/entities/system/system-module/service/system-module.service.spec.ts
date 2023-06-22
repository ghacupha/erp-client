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

import { ISystemModule } from '../system-module.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../system-module.test-samples';

import { SystemModuleService } from './system-module.service';

const requireRestSample: ISystemModule = {
  ...sampleWithRequiredData,
};

describe('SystemModule Service', () => {
  let service: SystemModuleService;
  let httpMock: HttpTestingController;
  let expectedResult: ISystemModule | ISystemModule[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SystemModuleService);
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

    it('should create a SystemModule', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const systemModule = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(systemModule).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SystemModule', () => {
      const systemModule = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(systemModule).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SystemModule', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SystemModule', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SystemModule', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSystemModuleToCollectionIfMissing', () => {
      it('should add a SystemModule to an empty array', () => {
        const systemModule: ISystemModule = sampleWithRequiredData;
        expectedResult = service.addSystemModuleToCollectionIfMissing([], systemModule);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(systemModule);
      });

      it('should not add a SystemModule to an array that contains it', () => {
        const systemModule: ISystemModule = sampleWithRequiredData;
        const systemModuleCollection: ISystemModule[] = [
          {
            ...systemModule,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSystemModuleToCollectionIfMissing(systemModuleCollection, systemModule);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SystemModule to an array that doesn't contain it", () => {
        const systemModule: ISystemModule = sampleWithRequiredData;
        const systemModuleCollection: ISystemModule[] = [sampleWithPartialData];
        expectedResult = service.addSystemModuleToCollectionIfMissing(systemModuleCollection, systemModule);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(systemModule);
      });

      it('should add only unique SystemModule to an array', () => {
        const systemModuleArray: ISystemModule[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const systemModuleCollection: ISystemModule[] = [sampleWithRequiredData];
        expectedResult = service.addSystemModuleToCollectionIfMissing(systemModuleCollection, ...systemModuleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const systemModule: ISystemModule = sampleWithRequiredData;
        const systemModule2: ISystemModule = sampleWithPartialData;
        expectedResult = service.addSystemModuleToCollectionIfMissing([], systemModule, systemModule2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(systemModule);
        expect(expectedResult).toContain(systemModule2);
      });

      it('should accept null and undefined values', () => {
        const systemModule: ISystemModule = sampleWithRequiredData;
        expectedResult = service.addSystemModuleToCollectionIfMissing([], null, systemModule, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(systemModule);
      });

      it('should return initial array if no SystemModule is added', () => {
        const systemModuleCollection: ISystemModule[] = [sampleWithRequiredData];
        expectedResult = service.addSystemModuleToCollectionIfMissing(systemModuleCollection, undefined, null);
        expect(expectedResult).toEqual(systemModuleCollection);
      });
    });

    describe('compareSystemModule', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSystemModule(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSystemModule(entity1, entity2);
        const compareResult2 = service.compareSystemModule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSystemModule(entity1, entity2);
        const compareResult2 = service.compareSystemModule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSystemModule(entity1, entity2);
        const compareResult2 = service.compareSystemModule(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
