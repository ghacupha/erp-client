import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AssetCategoryFormService } from './asset-category-form.service';
import { AssetCategoryService } from '../service/asset-category.service';
import { IAssetCategory } from '../asset-category.model';
import { IDepreciationMethod } from 'app/entities/assets/depreciation-method/depreciation-method.model';
import { DepreciationMethodService } from 'app/entities/assets/depreciation-method/service/depreciation-method.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { AssetCategoryUpdateComponent } from './asset-category-update.component';

describe('AssetCategory Management Update Component', () => {
  let comp: AssetCategoryUpdateComponent;
  let fixture: ComponentFixture<AssetCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assetCategoryFormService: AssetCategoryFormService;
  let assetCategoryService: AssetCategoryService;
  let depreciationMethodService: DepreciationMethodService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AssetCategoryUpdateComponent],
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
      .overrideTemplate(AssetCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssetCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assetCategoryFormService = TestBed.inject(AssetCategoryFormService);
    assetCategoryService = TestBed.inject(AssetCategoryService);
    depreciationMethodService = TestBed.inject(DepreciationMethodService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DepreciationMethod query and add missing value', () => {
      const assetCategory: IAssetCategory = { id: 456 };
      const depreciationMethod: IDepreciationMethod = { id: 57131 };
      assetCategory.depreciationMethod = depreciationMethod;

      const depreciationMethodCollection: IDepreciationMethod[] = [{ id: 65527 }];
      jest.spyOn(depreciationMethodService, 'query').mockReturnValue(of(new HttpResponse({ body: depreciationMethodCollection })));
      const additionalDepreciationMethods = [depreciationMethod];
      const expectedCollection: IDepreciationMethod[] = [...additionalDepreciationMethods, ...depreciationMethodCollection];
      jest.spyOn(depreciationMethodService, 'addDepreciationMethodToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetCategory });
      comp.ngOnInit();

      expect(depreciationMethodService.query).toHaveBeenCalled();
      expect(depreciationMethodService.addDepreciationMethodToCollectionIfMissing).toHaveBeenCalledWith(
        depreciationMethodCollection,
        ...additionalDepreciationMethods.map(expect.objectContaining)
      );
      expect(comp.depreciationMethodsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const assetCategory: IAssetCategory = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 97144 }];
      assetCategory.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 72891 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetCategory });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assetCategory: IAssetCategory = { id: 456 };
      const depreciationMethod: IDepreciationMethod = { id: 62074 };
      assetCategory.depreciationMethod = depreciationMethod;
      const placeholder: IPlaceholder = { id: 14808 };
      assetCategory.placeholders = [placeholder];

      activatedRoute.data = of({ assetCategory });
      comp.ngOnInit();

      expect(comp.depreciationMethodsSharedCollection).toContain(depreciationMethod);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.assetCategory).toEqual(assetCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetCategory>>();
      const assetCategory = { id: 123 };
      jest.spyOn(assetCategoryFormService, 'getAssetCategory').mockReturnValue(assetCategory);
      jest.spyOn(assetCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetCategory }));
      saveSubject.complete();

      // THEN
      expect(assetCategoryFormService.getAssetCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assetCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(assetCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetCategory>>();
      const assetCategory = { id: 123 };
      jest.spyOn(assetCategoryFormService, 'getAssetCategory').mockReturnValue({ id: null });
      jest.spyOn(assetCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetCategory }));
      saveSubject.complete();

      // THEN
      expect(assetCategoryFormService.getAssetCategory).toHaveBeenCalled();
      expect(assetCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetCategory>>();
      const assetCategory = { id: 123 };
      jest.spyOn(assetCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assetCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDepreciationMethod', () => {
      it('Should forward to depreciationMethodService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(depreciationMethodService, 'compareDepreciationMethod');
        comp.compareDepreciationMethod(entity, entity2);
        expect(depreciationMethodService.compareDepreciationMethod).toHaveBeenCalledWith(entity, entity2);
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
