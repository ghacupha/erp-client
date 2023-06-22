import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StringQuestionBaseFormService } from './string-question-base-form.service';
import { StringQuestionBaseService } from '../service/string-question-base.service';
import { IStringQuestionBase } from '../string-question-base.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { StringQuestionBaseUpdateComponent } from './string-question-base-update.component';

describe('StringQuestionBase Management Update Component', () => {
  let comp: StringQuestionBaseUpdateComponent;
  let fixture: ComponentFixture<StringQuestionBaseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let stringQuestionBaseFormService: StringQuestionBaseFormService;
  let stringQuestionBaseService: StringQuestionBaseService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StringQuestionBaseUpdateComponent],
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
      .overrideTemplate(StringQuestionBaseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StringQuestionBaseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    stringQuestionBaseFormService = TestBed.inject(StringQuestionBaseFormService);
    stringQuestionBaseService = TestBed.inject(StringQuestionBaseService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const stringQuestionBase: IStringQuestionBase = { id: 456 };
      const parameters: IUniversallyUniqueMapping[] = [{ id: 11799 }];
      stringQuestionBase.parameters = parameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 9118 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...parameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ stringQuestionBase });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const stringQuestionBase: IStringQuestionBase = { id: 456 };
      const placeholderItems: IPlaceholder[] = [{ id: 11355 }];
      stringQuestionBase.placeholderItems = placeholderItems;

      const placeholderCollection: IPlaceholder[] = [{ id: 41429 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholderItems];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ stringQuestionBase });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const stringQuestionBase: IStringQuestionBase = { id: 456 };
      const parameters: IUniversallyUniqueMapping = { id: 72322 };
      stringQuestionBase.parameters = [parameters];
      const placeholderItem: IPlaceholder = { id: 97096 };
      stringQuestionBase.placeholderItems = [placeholderItem];

      activatedRoute.data = of({ stringQuestionBase });
      comp.ngOnInit();

      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.placeholdersSharedCollection).toContain(placeholderItem);
      expect(comp.stringQuestionBase).toEqual(stringQuestionBase);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStringQuestionBase>>();
      const stringQuestionBase = { id: 123 };
      jest.spyOn(stringQuestionBaseFormService, 'getStringQuestionBase').mockReturnValue(stringQuestionBase);
      jest.spyOn(stringQuestionBaseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stringQuestionBase });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stringQuestionBase }));
      saveSubject.complete();

      // THEN
      expect(stringQuestionBaseFormService.getStringQuestionBase).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(stringQuestionBaseService.update).toHaveBeenCalledWith(expect.objectContaining(stringQuestionBase));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStringQuestionBase>>();
      const stringQuestionBase = { id: 123 };
      jest.spyOn(stringQuestionBaseFormService, 'getStringQuestionBase').mockReturnValue({ id: null });
      jest.spyOn(stringQuestionBaseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stringQuestionBase: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stringQuestionBase }));
      saveSubject.complete();

      // THEN
      expect(stringQuestionBaseFormService.getStringQuestionBase).toHaveBeenCalled();
      expect(stringQuestionBaseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStringQuestionBase>>();
      const stringQuestionBase = { id: 123 };
      jest.spyOn(stringQuestionBaseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stringQuestionBase });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(stringQuestionBaseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
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
