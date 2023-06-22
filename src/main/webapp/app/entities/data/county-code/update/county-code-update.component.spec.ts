import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CountyCodeFormService } from './county-code-form.service';
import { CountyCodeService } from '../service/county-code.service';
import { ICountyCode } from '../county-code.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { CountyCodeUpdateComponent } from './county-code-update.component';

describe('CountyCode Management Update Component', () => {
  let comp: CountyCodeUpdateComponent;
  let fixture: ComponentFixture<CountyCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let countyCodeFormService: CountyCodeFormService;
  let countyCodeService: CountyCodeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CountyCodeUpdateComponent],
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
      .overrideTemplate(CountyCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CountyCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    countyCodeFormService = TestBed.inject(CountyCodeFormService);
    countyCodeService = TestBed.inject(CountyCodeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const countyCode: ICountyCode = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 97347 }];
      countyCode.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 90325 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ countyCode });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const countyCode: ICountyCode = { id: 456 };
      const placeholder: IPlaceholder = { id: 34637 };
      countyCode.placeholders = [placeholder];

      activatedRoute.data = of({ countyCode });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.countyCode).toEqual(countyCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountyCode>>();
      const countyCode = { id: 123 };
      jest.spyOn(countyCodeFormService, 'getCountyCode').mockReturnValue(countyCode);
      jest.spyOn(countyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ countyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: countyCode }));
      saveSubject.complete();

      // THEN
      expect(countyCodeFormService.getCountyCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(countyCodeService.update).toHaveBeenCalledWith(expect.objectContaining(countyCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountyCode>>();
      const countyCode = { id: 123 };
      jest.spyOn(countyCodeFormService, 'getCountyCode').mockReturnValue({ id: null });
      jest.spyOn(countyCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ countyCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: countyCode }));
      saveSubject.complete();

      // THEN
      expect(countyCodeFormService.getCountyCode).toHaveBeenCalled();
      expect(countyCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountyCode>>();
      const countyCode = { id: 123 };
      jest.spyOn(countyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ countyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(countyCodeService.update).toHaveBeenCalled();
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
  });
});
