import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { QuestionBaseFormService } from './question-base-form.service';
import { QuestionBaseService } from '../service/question-base.service';
import { IQuestionBase } from '../question-base.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

import { QuestionBaseUpdateComponent } from './question-base-update.component';

describe('QuestionBase Management Update Component', () => {
  let comp: QuestionBaseUpdateComponent;
  let fixture: ComponentFixture<QuestionBaseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let questionBaseFormService: QuestionBaseFormService;
  let questionBaseService: QuestionBaseService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [QuestionBaseUpdateComponent],
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
      .overrideTemplate(QuestionBaseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuestionBaseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    questionBaseFormService = TestBed.inject(QuestionBaseFormService);
    questionBaseService = TestBed.inject(QuestionBaseService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const questionBase: IQuestionBase = { id: 456 };
      const parameters: IUniversallyUniqueMapping[] = [{ id: 56557 }];
      questionBase.parameters = parameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 85195 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...parameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ questionBase });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const questionBase: IQuestionBase = { id: 456 };
      const placeholderItems: IPlaceholder[] = [{ id: 52896 }];
      questionBase.placeholderItems = placeholderItems;

      const placeholderCollection: IPlaceholder[] = [{ id: 32970 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholderItems];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ questionBase });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const questionBase: IQuestionBase = { id: 456 };
      const parameters: IUniversallyUniqueMapping = { id: 66315 };
      questionBase.parameters = [parameters];
      const placeholderItem: IPlaceholder = { id: 16847 };
      questionBase.placeholderItems = [placeholderItem];

      activatedRoute.data = of({ questionBase });
      comp.ngOnInit();

      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.placeholdersSharedCollection).toContain(placeholderItem);
      expect(comp.questionBase).toEqual(questionBase);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestionBase>>();
      const questionBase = { id: 123 };
      jest.spyOn(questionBaseFormService, 'getQuestionBase').mockReturnValue(questionBase);
      jest.spyOn(questionBaseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ questionBase });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: questionBase }));
      saveSubject.complete();

      // THEN
      expect(questionBaseFormService.getQuestionBase).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(questionBaseService.update).toHaveBeenCalledWith(expect.objectContaining(questionBase));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestionBase>>();
      const questionBase = { id: 123 };
      jest.spyOn(questionBaseFormService, 'getQuestionBase').mockReturnValue({ id: null });
      jest.spyOn(questionBaseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ questionBase: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: questionBase }));
      saveSubject.complete();

      // THEN
      expect(questionBaseFormService.getQuestionBase).toHaveBeenCalled();
      expect(questionBaseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestionBase>>();
      const questionBase = { id: 123 };
      jest.spyOn(questionBaseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ questionBase });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(questionBaseService.update).toHaveBeenCalled();
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
