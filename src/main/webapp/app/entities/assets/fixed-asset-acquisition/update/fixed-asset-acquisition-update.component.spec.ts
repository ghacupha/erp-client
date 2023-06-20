import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FixedAssetAcquisitionFormService } from './fixed-asset-acquisition-form.service';
import { FixedAssetAcquisitionService } from '../service/fixed-asset-acquisition.service';
import { IFixedAssetAcquisition } from '../fixed-asset-acquisition.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

import { FixedAssetAcquisitionUpdateComponent } from './fixed-asset-acquisition-update.component';

describe('FixedAssetAcquisition Management Update Component', () => {
  let comp: FixedAssetAcquisitionUpdateComponent;
  let fixture: ComponentFixture<FixedAssetAcquisitionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fixedAssetAcquisitionFormService: FixedAssetAcquisitionFormService;
  let fixedAssetAcquisitionService: FixedAssetAcquisitionService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FixedAssetAcquisitionUpdateComponent],
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
      .overrideTemplate(FixedAssetAcquisitionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FixedAssetAcquisitionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixedAssetAcquisitionFormService = TestBed.inject(FixedAssetAcquisitionFormService);
    fixedAssetAcquisitionService = TestBed.inject(FixedAssetAcquisitionService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const fixedAssetAcquisition: IFixedAssetAcquisition = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 43365 }];
      fixedAssetAcquisition.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 61260 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fixedAssetAcquisition });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fixedAssetAcquisition: IFixedAssetAcquisition = { id: 456 };
      const placeholder: IPlaceholder = { id: 67851 };
      fixedAssetAcquisition.placeholders = [placeholder];

      activatedRoute.data = of({ fixedAssetAcquisition });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.fixedAssetAcquisition).toEqual(fixedAssetAcquisition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetAcquisition>>();
      const fixedAssetAcquisition = { id: 123 };
      jest.spyOn(fixedAssetAcquisitionFormService, 'getFixedAssetAcquisition').mockReturnValue(fixedAssetAcquisition);
      jest.spyOn(fixedAssetAcquisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetAcquisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fixedAssetAcquisition }));
      saveSubject.complete();

      // THEN
      expect(fixedAssetAcquisitionFormService.getFixedAssetAcquisition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fixedAssetAcquisitionService.update).toHaveBeenCalledWith(expect.objectContaining(fixedAssetAcquisition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetAcquisition>>();
      const fixedAssetAcquisition = { id: 123 };
      jest.spyOn(fixedAssetAcquisitionFormService, 'getFixedAssetAcquisition').mockReturnValue({ id: null });
      jest.spyOn(fixedAssetAcquisitionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetAcquisition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fixedAssetAcquisition }));
      saveSubject.complete();

      // THEN
      expect(fixedAssetAcquisitionFormService.getFixedAssetAcquisition).toHaveBeenCalled();
      expect(fixedAssetAcquisitionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetAcquisition>>();
      const fixedAssetAcquisition = { id: 123 };
      jest.spyOn(fixedAssetAcquisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetAcquisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fixedAssetAcquisitionService.update).toHaveBeenCalled();
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
