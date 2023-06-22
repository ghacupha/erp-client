import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PdfReportRequisitionFormService } from './pdf-report-requisition-form.service';
import { PdfReportRequisitionService } from '../service/pdf-report-requisition.service';
import { IPdfReportRequisition } from '../pdf-report-requisition.model';
import { IReportTemplate } from 'app/entities/reports/report-template/report-template.model';
import { ReportTemplateService } from 'app/entities/reports/report-template/service/report-template.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

import { PdfReportRequisitionUpdateComponent } from './pdf-report-requisition-update.component';

describe('PdfReportRequisition Management Update Component', () => {
  let comp: PdfReportRequisitionUpdateComponent;
  let fixture: ComponentFixture<PdfReportRequisitionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pdfReportRequisitionFormService: PdfReportRequisitionFormService;
  let pdfReportRequisitionService: PdfReportRequisitionService;
  let reportTemplateService: ReportTemplateService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PdfReportRequisitionUpdateComponent],
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
      .overrideTemplate(PdfReportRequisitionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PdfReportRequisitionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pdfReportRequisitionFormService = TestBed.inject(PdfReportRequisitionFormService);
    pdfReportRequisitionService = TestBed.inject(PdfReportRequisitionService);
    reportTemplateService = TestBed.inject(ReportTemplateService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ReportTemplate query and add missing value', () => {
      const pdfReportRequisition: IPdfReportRequisition = { id: 456 };
      const reportTemplate: IReportTemplate = { id: 55421 };
      pdfReportRequisition.reportTemplate = reportTemplate;

      const reportTemplateCollection: IReportTemplate[] = [{ id: 17171 }];
      jest.spyOn(reportTemplateService, 'query').mockReturnValue(of(new HttpResponse({ body: reportTemplateCollection })));
      const additionalReportTemplates = [reportTemplate];
      const expectedCollection: IReportTemplate[] = [...additionalReportTemplates, ...reportTemplateCollection];
      jest.spyOn(reportTemplateService, 'addReportTemplateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pdfReportRequisition });
      comp.ngOnInit();

      expect(reportTemplateService.query).toHaveBeenCalled();
      expect(reportTemplateService.addReportTemplateToCollectionIfMissing).toHaveBeenCalledWith(
        reportTemplateCollection,
        ...additionalReportTemplates.map(expect.objectContaining)
      );
      expect(comp.reportTemplatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const pdfReportRequisition: IPdfReportRequisition = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 93793 }];
      pdfReportRequisition.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 53987 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pdfReportRequisition });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const pdfReportRequisition: IPdfReportRequisition = { id: 456 };
      const parameters: IUniversallyUniqueMapping[] = [{ id: 17789 }];
      pdfReportRequisition.parameters = parameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 64015 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...parameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pdfReportRequisition });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pdfReportRequisition: IPdfReportRequisition = { id: 456 };
      const reportTemplate: IReportTemplate = { id: 96290 };
      pdfReportRequisition.reportTemplate = reportTemplate;
      const placeholder: IPlaceholder = { id: 41212 };
      pdfReportRequisition.placeholders = [placeholder];
      const parameters: IUniversallyUniqueMapping = { id: 85009 };
      pdfReportRequisition.parameters = [parameters];

      activatedRoute.data = of({ pdfReportRequisition });
      comp.ngOnInit();

      expect(comp.reportTemplatesSharedCollection).toContain(reportTemplate);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.pdfReportRequisition).toEqual(pdfReportRequisition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPdfReportRequisition>>();
      const pdfReportRequisition = { id: 123 };
      jest.spyOn(pdfReportRequisitionFormService, 'getPdfReportRequisition').mockReturnValue(pdfReportRequisition);
      jest.spyOn(pdfReportRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pdfReportRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pdfReportRequisition }));
      saveSubject.complete();

      // THEN
      expect(pdfReportRequisitionFormService.getPdfReportRequisition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pdfReportRequisitionService.update).toHaveBeenCalledWith(expect.objectContaining(pdfReportRequisition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPdfReportRequisition>>();
      const pdfReportRequisition = { id: 123 };
      jest.spyOn(pdfReportRequisitionFormService, 'getPdfReportRequisition').mockReturnValue({ id: null });
      jest.spyOn(pdfReportRequisitionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pdfReportRequisition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pdfReportRequisition }));
      saveSubject.complete();

      // THEN
      expect(pdfReportRequisitionFormService.getPdfReportRequisition).toHaveBeenCalled();
      expect(pdfReportRequisitionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPdfReportRequisition>>();
      const pdfReportRequisition = { id: 123 };
      jest.spyOn(pdfReportRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pdfReportRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pdfReportRequisitionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareReportTemplate', () => {
      it('Should forward to reportTemplateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(reportTemplateService, 'compareReportTemplate');
        comp.compareReportTemplate(entity, entity2);
        expect(reportTemplateService.compareReportTemplate).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
