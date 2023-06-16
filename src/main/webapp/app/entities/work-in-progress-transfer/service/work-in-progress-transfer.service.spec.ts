import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWorkInProgressTransfer, WorkInProgressTransfer } from '../work-in-progress-transfer.model';

import { WorkInProgressTransferService } from './work-in-progress-transfer.service';

describe('WorkInProgressTransfer Service', () => {
  let service: WorkInProgressTransferService;
  let httpMock: HttpTestingController;
  let elemDefault: IWorkInProgressTransfer;
  let expectedResult: IWorkInProgressTransfer | IWorkInProgressTransfer[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkInProgressTransferService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      description: 'AAAAAAA',
      targetAssetNumber: 'AAAAAAA',
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

    it('should create a WorkInProgressTransfer', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new WorkInProgressTransfer()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkInProgressTransfer', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          description: 'BBBBBB',
          targetAssetNumber: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkInProgressTransfer', () => {
      const patchObject = Object.assign(
        {
          description: 'BBBBBB',
        },
        new WorkInProgressTransfer()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkInProgressTransfer', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          description: 'BBBBBB',
          targetAssetNumber: 'BBBBBB',
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

    it('should delete a WorkInProgressTransfer', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addWorkInProgressTransferToCollectionIfMissing', () => {
      it('should add a WorkInProgressTransfer to an empty array', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = { id: 123 };
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing([], workInProgressTransfer);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressTransfer);
      });

      it('should not add a WorkInProgressTransfer to an array that contains it', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = { id: 123 };
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [
          {
            ...workInProgressTransfer,
          },
          { id: 456 },
        ];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(workInProgressTransferCollection, workInProgressTransfer);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkInProgressTransfer to an array that doesn't contain it", () => {
        const workInProgressTransfer: IWorkInProgressTransfer = { id: 123 };
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [{ id: 456 }];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(workInProgressTransferCollection, workInProgressTransfer);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressTransfer);
      });

      it('should add only unique WorkInProgressTransfer to an array', () => {
        const workInProgressTransferArray: IWorkInProgressTransfer[] = [{ id: 123 }, { id: 456 }, { id: 22379 }];
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [{ id: 123 }];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(
          workInProgressTransferCollection,
          ...workInProgressTransferArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = { id: 123 };
        const workInProgressTransfer2: IWorkInProgressTransfer = { id: 456 };
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing([], workInProgressTransfer, workInProgressTransfer2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressTransfer);
        expect(expectedResult).toContain(workInProgressTransfer2);
      });

      it('should accept null and undefined values', () => {
        const workInProgressTransfer: IWorkInProgressTransfer = { id: 123 };
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing([], null, workInProgressTransfer, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressTransfer);
      });

      it('should return initial array if no WorkInProgressTransfer is added', () => {
        const workInProgressTransferCollection: IWorkInProgressTransfer[] = [{ id: 123 }];
        expectedResult = service.addWorkInProgressTransferToCollectionIfMissing(workInProgressTransferCollection, undefined, null);
        expect(expectedResult).toEqual(workInProgressTransferCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
