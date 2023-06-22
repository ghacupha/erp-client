import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FixedAssetNetBookValueFormService } from './fixed-asset-net-book-value-form.service';
import { FixedAssetNetBookValueService } from '../service/fixed-asset-net-book-value.service';
import { IFixedAssetNetBookValue } from '../fixed-asset-net-book-value.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { FixedAssetNetBookValueUpdateComponent } from './fixed-asset-net-book-value-update.component';

describe('FixedAssetNetBookValue Management Update Component', () => {
  let comp: FixedAssetNetBookValueUpdateComponent;
  let fixture: ComponentFixture<FixedAssetNetBookValueUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fixedAssetNetBookValueFormService: FixedAssetNetBookValueFormService;
  let fixedAssetNetBookValueService: FixedAssetNetBookValueService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FixedAssetNetBookValueUpdateComponent],
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
      .overrideTemplate(FixedAssetNetBookValueUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FixedAssetNetBookValueUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixedAssetNetBookValueFormService = TestBed.inject(FixedAssetNetBookValueFormService);
    fixedAssetNetBookValueService = TestBed.inject(FixedAssetNetBookValueService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const fixedAssetNetBookValue: IFixedAssetNetBookValue = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 24399 }];
      fixedAssetNetBookValue.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 35519 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fixedAssetNetBookValue });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fixedAssetNetBookValue: IFixedAssetNetBookValue = { id: 456 };
      const placeholder: IPlaceholder = { id: 23707 };
      fixedAssetNetBookValue.placeholders = [placeholder];

      activatedRoute.data = of({ fixedAssetNetBookValue });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.fixedAssetNetBookValue).toEqual(fixedAssetNetBookValue);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetNetBookValue>>();
      const fixedAssetNetBookValue = { id: 123 };
      jest.spyOn(fixedAssetNetBookValueFormService, 'getFixedAssetNetBookValue').mockReturnValue(fixedAssetNetBookValue);
      jest.spyOn(fixedAssetNetBookValueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetNetBookValue });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fixedAssetNetBookValue }));
      saveSubject.complete();

      // THEN
      expect(fixedAssetNetBookValueFormService.getFixedAssetNetBookValue).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fixedAssetNetBookValueService.update).toHaveBeenCalledWith(expect.objectContaining(fixedAssetNetBookValue));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetNetBookValue>>();
      const fixedAssetNetBookValue = { id: 123 };
      jest.spyOn(fixedAssetNetBookValueFormService, 'getFixedAssetNetBookValue').mockReturnValue({ id: null });
      jest.spyOn(fixedAssetNetBookValueService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetNetBookValue: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fixedAssetNetBookValue }));
      saveSubject.complete();

      // THEN
      expect(fixedAssetNetBookValueFormService.getFixedAssetNetBookValue).toHaveBeenCalled();
      expect(fixedAssetNetBookValueService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetNetBookValue>>();
      const fixedAssetNetBookValue = { id: 123 };
      jest.spyOn(fixedAssetNetBookValueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetNetBookValue });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fixedAssetNetBookValueService.update).toHaveBeenCalled();
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
