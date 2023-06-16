import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWorkInProgressRegistration, WorkInProgressRegistration } from '../work-in-progress-registration.model';

import { WorkInProgressRegistrationService } from './work-in-progress-registration.service';

describe('WorkInProgressRegistration Service', () => {
  let service: WorkInProgressRegistrationService;
  let httpMock: HttpTestingController;
  let elemDefault: IWorkInProgressRegistration;
  let expectedResult: IWorkInProgressRegistration | IWorkInProgressRegistration[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkInProgressRegistrationService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sequenceNumber: 'AAAAAAA',
      particulars: 'AAAAAAA',
      instalmentAmount: 0,
      commentsContentType: 'image/png',
      comments: 'AAAAAAA',
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

    it('should create a WorkInProgressRegistration', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new WorkInProgressRegistration()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkInProgressRegistration', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sequenceNumber: 'BBBBBB',
          particulars: 'BBBBBB',
          instalmentAmount: 1,
          comments: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkInProgressRegistration', () => {
      const patchObject = Object.assign(
        {
          sequenceNumber: 'BBBBBB',
          instalmentAmount: 1,
          comments: 'BBBBBB',
        },
        new WorkInProgressRegistration()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkInProgressRegistration', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sequenceNumber: 'BBBBBB',
          particulars: 'BBBBBB',
          instalmentAmount: 1,
          comments: 'BBBBBB',
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

    it('should delete a WorkInProgressRegistration', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addWorkInProgressRegistrationToCollectionIfMissing', () => {
      it('should add a WorkInProgressRegistration to an empty array', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = { id: 123 };
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing([], workInProgressRegistration);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressRegistration);
      });

      it('should not add a WorkInProgressRegistration to an array that contains it', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = { id: 123 };
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [
          {
            ...workInProgressRegistration,
          },
          { id: 456 },
        ];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          workInProgressRegistrationCollection,
          workInProgressRegistration
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkInProgressRegistration to an array that doesn't contain it", () => {
        const workInProgressRegistration: IWorkInProgressRegistration = { id: 123 };
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [{ id: 456 }];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          workInProgressRegistrationCollection,
          workInProgressRegistration
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressRegistration);
      });

      it('should add only unique WorkInProgressRegistration to an array', () => {
        const workInProgressRegistrationArray: IWorkInProgressRegistration[] = [{ id: 123 }, { id: 456 }, { id: 96826 }];
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [{ id: 123 }];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          workInProgressRegistrationCollection,
          ...workInProgressRegistrationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = { id: 123 };
        const workInProgressRegistration2: IWorkInProgressRegistration = { id: 456 };
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(
          [],
          workInProgressRegistration,
          workInProgressRegistration2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workInProgressRegistration);
        expect(expectedResult).toContain(workInProgressRegistration2);
      });

      it('should accept null and undefined values', () => {
        const workInProgressRegistration: IWorkInProgressRegistration = { id: 123 };
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing([], null, workInProgressRegistration, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workInProgressRegistration);
      });

      it('should return initial array if no WorkInProgressRegistration is added', () => {
        const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [{ id: 123 }];
        expectedResult = service.addWorkInProgressRegistrationToCollectionIfMissing(workInProgressRegistrationCollection, undefined, null);
        expect(expectedResult).toEqual(workInProgressRegistrationCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
