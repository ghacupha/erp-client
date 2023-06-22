import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReportStatusFormService } from './report-status-form.service';
import { ReportStatusService } from '../service/report-status.service';
import { IReportStatus } from '../report-status.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IProcessStatus } from 'app/entities/system/process-status/process-status.model';
import { ProcessStatusService } from 'app/entities/system/process-status/service/process-status.service';

import { ReportStatusUpdateComponent } from './report-status-update.component';

describe('ReportStatus Management Update Component', () => {
  let comp: ReportStatusUpdateComponent;
  let fixture: ComponentFixture<ReportStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reportStatusFormService: ReportStatusFormService;
  let reportStatusService: ReportStatusService;
  let placeholderService: PlaceholderService;
  let processStatusService: ProcessStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReportStatusUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ReportStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReportStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reportStatusFormService = TestBed.inject(ReportStatusFormService);
    reportStatusService = TestBed.inject(ReportStatusService);
    placeholderService = TestBed.inject(PlaceholderService);
    processStatusService = TestBed.inject(ProcessStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const reportStatus: IReportStatus = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 83138 }];
      reportStatus.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 41146 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportStatus });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ProcessStatus query and add missing value', () => {
      const reportStatus: IReportStatus = { id: 456 };
      const processStatus: IProcessStatus = { id: 54365 };
      reportStatus.processStatus = processStatus;

      const processStatusCollection: IProcessStatus[] = [{ id: 42210 }];
      jest.spyOn(processStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: processStatusCollection })));
      const additionalProcessStatuses = [processStatus];
      const expectedCollection: IProcessStatus[] = [...additionalProcessStatuses, ...processStatusCollection];
      jest.spyOn(processStatusService, 'addProcessStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportStatus });
      comp.ngOnInit();

      expect(processStatusService.query).toHaveBeenCalled();
      expect(processStatusService.addProcessStatusToCollectionIfMissing).toHaveBeenCalledWith(
        processStatusCollection,
        ...additionalProcessStatuses.map(expect.objectContaining)
      );
      expect(comp.processStatusesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reportStatus: IReportStatus = { id: 456 };
      const placeholder: IPlaceholder = { id: 18063 };
      reportStatus.placeholders = [placeholder];
      const processStatus: IProcessStatus = { id: 68314 };
      reportStatus.processStatus = processStatus;

      activatedRoute.data = of({ reportStatus });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.processStatusesSharedCollection).toContain(processStatus);
      expect(comp.reportStatus).toEqual(reportStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportStatus>>();
      const reportStatus = { id: 123 };
      jest.spyOn(reportStatusFormService, 'getReportStatus').mockReturnValue(reportStatus);
      jest.spyOn(reportStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportStatus }));
      saveSubject.complete();

      // THEN
      expect(reportStatusFormService.getReportStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reportStatusService.update).toHaveBeenCalledWith(expect.objectContaining(reportStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportStatus>>();
      const reportStatus = { id: 123 };
      jest.spyOn(reportStatusFormService, 'getReportStatus').mockReturnValue({ id: null });
      jest.spyOn(reportStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportStatus }));
      saveSubject.complete();

      // THEN
      expect(reportStatusFormService.getReportStatus).toHaveBeenCalled();
      expect(reportStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportStatus>>();
      const reportStatus = { id: 123 };
      jest.spyOn(reportStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reportStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProcessStatus', () => {
      it('Should forward to processStatusService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(processStatusService, 'compareProcessStatus');
        comp.compareProcessStatus(entity, entity2);
        expect(processStatusService.compareProcessStatus).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
