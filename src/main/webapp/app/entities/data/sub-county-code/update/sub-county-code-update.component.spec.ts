import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SubCountyCodeFormService } from './sub-county-code-form.service';
import { SubCountyCodeService } from '../service/sub-county-code.service';
import { ISubCountyCode } from '../sub-county-code.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { SubCountyCodeUpdateComponent } from './sub-county-code-update.component';

describe('SubCountyCode Management Update Component', () => {
  let comp: SubCountyCodeUpdateComponent;
  let fixture: ComponentFixture<SubCountyCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let subCountyCodeFormService: SubCountyCodeFormService;
  let subCountyCodeService: SubCountyCodeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SubCountyCodeUpdateComponent],
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
      .overrideTemplate(SubCountyCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubCountyCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    subCountyCodeFormService = TestBed.inject(SubCountyCodeFormService);
    subCountyCodeService = TestBed.inject(SubCountyCodeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const subCountyCode: ISubCountyCode = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 31232 }];
      subCountyCode.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 31150 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ subCountyCode });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const subCountyCode: ISubCountyCode = { id: 456 };
      const placeholder: IPlaceholder = { id: 87689 };
      subCountyCode.placeholders = [placeholder];

      activatedRoute.data = of({ subCountyCode });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.subCountyCode).toEqual(subCountyCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubCountyCode>>();
      const subCountyCode = { id: 123 };
      jest.spyOn(subCountyCodeFormService, 'getSubCountyCode').mockReturnValue(subCountyCode);
      jest.spyOn(subCountyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subCountyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subCountyCode }));
      saveSubject.complete();

      // THEN
      expect(subCountyCodeFormService.getSubCountyCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(subCountyCodeService.update).toHaveBeenCalledWith(expect.objectContaining(subCountyCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubCountyCode>>();
      const subCountyCode = { id: 123 };
      jest.spyOn(subCountyCodeFormService, 'getSubCountyCode').mockReturnValue({ id: null });
      jest.spyOn(subCountyCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subCountyCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subCountyCode }));
      saveSubject.complete();

      // THEN
      expect(subCountyCodeFormService.getSubCountyCode).toHaveBeenCalled();
      expect(subCountyCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubCountyCode>>();
      const subCountyCode = { id: 123 };
      jest.spyOn(subCountyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subCountyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(subCountyCodeService.update).toHaveBeenCalled();
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
