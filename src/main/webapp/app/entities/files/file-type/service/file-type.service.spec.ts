import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFileType } from '../file-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../file-type.test-samples';

import { FileTypeService } from './file-type.service';

const requireRestSample: IFileType = {
  ...sampleWithRequiredData,
};

describe('FileType Service', () => {
  let service: FileTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFileType | IFileType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FileTypeService);
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

    it('should create a FileType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fileType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fileType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FileType', () => {
      const fileType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fileType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FileType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FileType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FileType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFileTypeToCollectionIfMissing', () => {
      it('should add a FileType to an empty array', () => {
        const fileType: IFileType = sampleWithRequiredData;
        expectedResult = service.addFileTypeToCollectionIfMissing([], fileType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileType);
      });

      it('should not add a FileType to an array that contains it', () => {
        const fileType: IFileType = sampleWithRequiredData;
        const fileTypeCollection: IFileType[] = [
          {
            ...fileType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFileTypeToCollectionIfMissing(fileTypeCollection, fileType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FileType to an array that doesn't contain it", () => {
        const fileType: IFileType = sampleWithRequiredData;
        const fileTypeCollection: IFileType[] = [sampleWithPartialData];
        expectedResult = service.addFileTypeToCollectionIfMissing(fileTypeCollection, fileType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileType);
      });

      it('should add only unique FileType to an array', () => {
        const fileTypeArray: IFileType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fileTypeCollection: IFileType[] = [sampleWithRequiredData];
        expectedResult = service.addFileTypeToCollectionIfMissing(fileTypeCollection, ...fileTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fileType: IFileType = sampleWithRequiredData;
        const fileType2: IFileType = sampleWithPartialData;
        expectedResult = service.addFileTypeToCollectionIfMissing([], fileType, fileType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileType);
        expect(expectedResult).toContain(fileType2);
      });

      it('should accept null and undefined values', () => {
        const fileType: IFileType = sampleWithRequiredData;
        expectedResult = service.addFileTypeToCollectionIfMissing([], null, fileType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileType);
      });

      it('should return initial array if no FileType is added', () => {
        const fileTypeCollection: IFileType[] = [sampleWithRequiredData];
        expectedResult = service.addFileTypeToCollectionIfMissing(fileTypeCollection, undefined, null);
        expect(expectedResult).toEqual(fileTypeCollection);
      });
    });

    describe('compareFileType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFileType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFileType(entity1, entity2);
        const compareResult2 = service.compareFileType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFileType(entity1, entity2);
        const compareResult2 = service.compareFileType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFileType(entity1, entity2);
        const compareResult2 = service.compareFileType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
