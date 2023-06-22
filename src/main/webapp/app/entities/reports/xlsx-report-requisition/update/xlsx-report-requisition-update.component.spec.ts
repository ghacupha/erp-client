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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { XlsxReportRequisitionFormService } from './xlsx-report-requisition-form.service';
import { XlsxReportRequisitionService } from '../service/xlsx-report-requisition.service';
import { IXlsxReportRequisition } from '../xlsx-report-requisition.model';
import { IReportTemplate } from 'app/entities/reports/report-template/report-template.model';
import { ReportTemplateService } from 'app/entities/reports/report-template/service/report-template.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

import { XlsxReportRequisitionUpdateComponent } from './xlsx-report-requisition-update.component';

describe('XlsxReportRequisition Management Update Component', () => {
  let comp: XlsxReportRequisitionUpdateComponent;
  let fixture: ComponentFixture<XlsxReportRequisitionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let xlsxReportRequisitionFormService: XlsxReportRequisitionFormService;
  let xlsxReportRequisitionService: XlsxReportRequisitionService;
  let reportTemplateService: ReportTemplateService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [XlsxReportRequisitionUpdateComponent],
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
      .overrideTemplate(XlsxReportRequisitionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(XlsxReportRequisitionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    xlsxReportRequisitionFormService = TestBed.inject(XlsxReportRequisitionFormService);
    xlsxReportRequisitionService = TestBed.inject(XlsxReportRequisitionService);
    reportTemplateService = TestBed.inject(ReportTemplateService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ReportTemplate query and add missing value', () => {
      const xlsxReportRequisition: IXlsxReportRequisition = { id: 456 };
      const reportTemplate: IReportTemplate = { id: 46556 };
      xlsxReportRequisition.reportTemplate = reportTemplate;

      const reportTemplateCollection: IReportTemplate[] = [{ id: 31178 }];
      jest.spyOn(reportTemplateService, 'query').mockReturnValue(of(new HttpResponse({ body: reportTemplateCollection })));
      const additionalReportTemplates = [reportTemplate];
      const expectedCollection: IReportTemplate[] = [...additionalReportTemplates, ...reportTemplateCollection];
      jest.spyOn(reportTemplateService, 'addReportTemplateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ xlsxReportRequisition });
      comp.ngOnInit();

      expect(reportTemplateService.query).toHaveBeenCalled();
      expect(reportTemplateService.addReportTemplateToCollectionIfMissing).toHaveBeenCalledWith(
        reportTemplateCollection,
        ...additionalReportTemplates.map(expect.objectContaining)
      );
      expect(comp.reportTemplatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const xlsxReportRequisition: IXlsxReportRequisition = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 30961 }];
      xlsxReportRequisition.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 47499 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ xlsxReportRequisition });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const xlsxReportRequisition: IXlsxReportRequisition = { id: 456 };
      const parameters: IUniversallyUniqueMapping[] = [{ id: 85715 }];
      xlsxReportRequisition.parameters = parameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 21534 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...parameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ xlsxReportRequisition });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const xlsxReportRequisition: IXlsxReportRequisition = { id: 456 };
      const reportTemplate: IReportTemplate = { id: 21979 };
      xlsxReportRequisition.reportTemplate = reportTemplate;
      const placeholder: IPlaceholder = { id: 75395 };
      xlsxReportRequisition.placeholders = [placeholder];
      const parameters: IUniversallyUniqueMapping = { id: 23116 };
      xlsxReportRequisition.parameters = [parameters];

      activatedRoute.data = of({ xlsxReportRequisition });
      comp.ngOnInit();

      expect(comp.reportTemplatesSharedCollection).toContain(reportTemplate);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.xlsxReportRequisition).toEqual(xlsxReportRequisition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IXlsxReportRequisition>>();
      const xlsxReportRequisition = { id: 123 };
      jest.spyOn(xlsxReportRequisitionFormService, 'getXlsxReportRequisition').mockReturnValue(xlsxReportRequisition);
      jest.spyOn(xlsxReportRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ xlsxReportRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: xlsxReportRequisition }));
      saveSubject.complete();

      // THEN
      expect(xlsxReportRequisitionFormService.getXlsxReportRequisition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(xlsxReportRequisitionService.update).toHaveBeenCalledWith(expect.objectContaining(xlsxReportRequisition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IXlsxReportRequisition>>();
      const xlsxReportRequisition = { id: 123 };
      jest.spyOn(xlsxReportRequisitionFormService, 'getXlsxReportRequisition').mockReturnValue({ id: null });
      jest.spyOn(xlsxReportRequisitionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ xlsxReportRequisition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: xlsxReportRequisition }));
      saveSubject.complete();

      // THEN
      expect(xlsxReportRequisitionFormService.getXlsxReportRequisition).toHaveBeenCalled();
      expect(xlsxReportRequisitionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IXlsxReportRequisition>>();
      const xlsxReportRequisition = { id: 123 };
      jest.spyOn(xlsxReportRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ xlsxReportRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(xlsxReportRequisitionService.update).toHaveBeenCalled();
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
