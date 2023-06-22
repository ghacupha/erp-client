import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReportContentTypeFormService } from './report-content-type-form.service';
import { ReportContentTypeService } from '../service/report-content-type.service';
import { IReportContentType } from '../report-content-type.model';
import { ISystemContentType } from 'app/entities/system/system-content-type/system-content-type.model';
import { SystemContentTypeService } from 'app/entities/system/system-content-type/service/system-content-type.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { ReportContentTypeUpdateComponent } from './report-content-type-update.component';

describe('ReportContentType Management Update Component', () => {
  let comp: ReportContentTypeUpdateComponent;
  let fixture: ComponentFixture<ReportContentTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reportContentTypeFormService: ReportContentTypeFormService;
  let reportContentTypeService: ReportContentTypeService;
  let systemContentTypeService: SystemContentTypeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReportContentTypeUpdateComponent],
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
      .overrideTemplate(ReportContentTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReportContentTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reportContentTypeFormService = TestBed.inject(ReportContentTypeFormService);
    reportContentTypeService = TestBed.inject(ReportContentTypeService);
    systemContentTypeService = TestBed.inject(SystemContentTypeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SystemContentType query and add missing value', () => {
      const reportContentType: IReportContentType = { id: 456 };
      const systemContentType: ISystemContentType = { id: 1952 };
      reportContentType.systemContentType = systemContentType;

      const systemContentTypeCollection: ISystemContentType[] = [{ id: 53175 }];
      jest.spyOn(systemContentTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: systemContentTypeCollection })));
      const additionalSystemContentTypes = [systemContentType];
      const expectedCollection: ISystemContentType[] = [...additionalSystemContentTypes, ...systemContentTypeCollection];
      jest.spyOn(systemContentTypeService, 'addSystemContentTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportContentType });
      comp.ngOnInit();

      expect(systemContentTypeService.query).toHaveBeenCalled();
      expect(systemContentTypeService.addSystemContentTypeToCollectionIfMissing).toHaveBeenCalledWith(
        systemContentTypeCollection,
        ...additionalSystemContentTypes.map(expect.objectContaining)
      );
      expect(comp.systemContentTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const reportContentType: IReportContentType = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 86234 }];
      reportContentType.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 53639 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportContentType });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reportContentType: IReportContentType = { id: 456 };
      const systemContentType: ISystemContentType = { id: 39763 };
      reportContentType.systemContentType = systemContentType;
      const placeholder: IPlaceholder = { id: 70487 };
      reportContentType.placeholders = [placeholder];

      activatedRoute.data = of({ reportContentType });
      comp.ngOnInit();

      expect(comp.systemContentTypesSharedCollection).toContain(systemContentType);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.reportContentType).toEqual(reportContentType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportContentType>>();
      const reportContentType = { id: 123 };
      jest.spyOn(reportContentTypeFormService, 'getReportContentType').mockReturnValue(reportContentType);
      jest.spyOn(reportContentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportContentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportContentType }));
      saveSubject.complete();

      // THEN
      expect(reportContentTypeFormService.getReportContentType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reportContentTypeService.update).toHaveBeenCalledWith(expect.objectContaining(reportContentType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportContentType>>();
      const reportContentType = { id: 123 };
      jest.spyOn(reportContentTypeFormService, 'getReportContentType').mockReturnValue({ id: null });
      jest.spyOn(reportContentTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportContentType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportContentType }));
      saveSubject.complete();

      // THEN
      expect(reportContentTypeFormService.getReportContentType).toHaveBeenCalled();
      expect(reportContentTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportContentType>>();
      const reportContentType = { id: 123 };
      jest.spyOn(reportContentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportContentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reportContentTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSystemContentType', () => {
      it('Should forward to systemContentTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(systemContentTypeService, 'compareSystemContentType');
        comp.compareSystemContentType(entity, entity2);
        expect(systemContentTypeService.compareSystemContentType).toHaveBeenCalledWith(entity, entity2);
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
  });
});
