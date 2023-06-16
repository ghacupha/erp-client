import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFileUpload } from '../file-upload.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../file-upload.test-samples';

import { FileUploadService, RestFileUpload } from './file-upload.service';

const requireRestSample: RestFileUpload = {
  ...sampleWithRequiredData,
  periodFrom: sampleWithRequiredData.periodFrom?.format(DATE_FORMAT),
  periodTo: sampleWithRequiredData.periodTo?.format(DATE_FORMAT),
};

describe('FileUpload Service', () => {
  let service: FileUploadService;
  let httpMock: HttpTestingController;
  let expectedResult: IFileUpload | IFileUpload[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FileUploadService);
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

    it('should create a FileUpload', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fileUpload = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fileUpload).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FileUpload', () => {
      const fileUpload = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fileUpload).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FileUpload', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FileUpload', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FileUpload', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFileUploadToCollectionIfMissing', () => {
      it('should add a FileUpload to an empty array', () => {
        const fileUpload: IFileUpload = sampleWithRequiredData;
        expectedResult = service.addFileUploadToCollectionIfMissing([], fileUpload);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileUpload);
      });

      it('should not add a FileUpload to an array that contains it', () => {
        const fileUpload: IFileUpload = sampleWithRequiredData;
        const fileUploadCollection: IFileUpload[] = [
          {
            ...fileUpload,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFileUploadToCollectionIfMissing(fileUploadCollection, fileUpload);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FileUpload to an array that doesn't contain it", () => {
        const fileUpload: IFileUpload = sampleWithRequiredData;
        const fileUploadCollection: IFileUpload[] = [sampleWithPartialData];
        expectedResult = service.addFileUploadToCollectionIfMissing(fileUploadCollection, fileUpload);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileUpload);
      });

      it('should add only unique FileUpload to an array', () => {
        const fileUploadArray: IFileUpload[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fileUploadCollection: IFileUpload[] = [sampleWithRequiredData];
        expectedResult = service.addFileUploadToCollectionIfMissing(fileUploadCollection, ...fileUploadArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fileUpload: IFileUpload = sampleWithRequiredData;
        const fileUpload2: IFileUpload = sampleWithPartialData;
        expectedResult = service.addFileUploadToCollectionIfMissing([], fileUpload, fileUpload2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileUpload);
        expect(expectedResult).toContain(fileUpload2);
      });

      it('should accept null and undefined values', () => {
        const fileUpload: IFileUpload = sampleWithRequiredData;
        expectedResult = service.addFileUploadToCollectionIfMissing([], null, fileUpload, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileUpload);
      });

      it('should return initial array if no FileUpload is added', () => {
        const fileUploadCollection: IFileUpload[] = [sampleWithRequiredData];
        expectedResult = service.addFileUploadToCollectionIfMissing(fileUploadCollection, undefined, null);
        expect(expectedResult).toEqual(fileUploadCollection);
      });
    });

    describe('compareFileUpload', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFileUpload(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFileUpload(entity1, entity2);
        const compareResult2 = service.compareFileUpload(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFileUpload(entity1, entity2);
        const compareResult2 = service.compareFileUpload(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFileUpload(entity1, entity2);
        const compareResult2 = service.compareFileUpload(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
