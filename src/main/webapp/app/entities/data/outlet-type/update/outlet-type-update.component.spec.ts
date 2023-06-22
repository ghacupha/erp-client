import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OutletTypeFormService } from './outlet-type-form.service';
import { OutletTypeService } from '../service/outlet-type.service';
import { IOutletType } from '../outlet-type.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { OutletTypeUpdateComponent } from './outlet-type-update.component';

describe('OutletType Management Update Component', () => {
  let comp: OutletTypeUpdateComponent;
  let fixture: ComponentFixture<OutletTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let outletTypeFormService: OutletTypeFormService;
  let outletTypeService: OutletTypeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OutletTypeUpdateComponent],
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
      .overrideTemplate(OutletTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OutletTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    outletTypeFormService = TestBed.inject(OutletTypeFormService);
    outletTypeService = TestBed.inject(OutletTypeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const outletType: IOutletType = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 37580 }];
      outletType.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 88745 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ outletType });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const outletType: IOutletType = { id: 456 };
      const placeholder: IPlaceholder = { id: 35105 };
      outletType.placeholders = [placeholder];

      activatedRoute.data = of({ outletType });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.outletType).toEqual(outletType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOutletType>>();
      const outletType = { id: 123 };
      jest.spyOn(outletTypeFormService, 'getOutletType').mockReturnValue(outletType);
      jest.spyOn(outletTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outletType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: outletType }));
      saveSubject.complete();

      // THEN
      expect(outletTypeFormService.getOutletType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(outletTypeService.update).toHaveBeenCalledWith(expect.objectContaining(outletType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOutletType>>();
      const outletType = { id: 123 };
      jest.spyOn(outletTypeFormService, 'getOutletType').mockReturnValue({ id: null });
      jest.spyOn(outletTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outletType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: outletType }));
      saveSubject.complete();

      // THEN
      expect(outletTypeFormService.getOutletType).toHaveBeenCalled();
      expect(outletTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOutletType>>();
      const outletType = { id: 123 };
      jest.spyOn(outletTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outletType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(outletTypeService.update).toHaveBeenCalled();
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
