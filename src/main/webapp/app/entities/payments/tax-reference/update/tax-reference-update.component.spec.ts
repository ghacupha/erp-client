import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TaxReferenceFormService } from './tax-reference-form.service';
import { TaxReferenceService } from '../service/tax-reference.service';
import { ITaxReference } from '../tax-reference.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

import { TaxReferenceUpdateComponent } from './tax-reference-update.component';

describe('TaxReference Management Update Component', () => {
  let comp: TaxReferenceUpdateComponent;
  let fixture: ComponentFixture<TaxReferenceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taxReferenceFormService: TaxReferenceFormService;
  let taxReferenceService: TaxReferenceService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TaxReferenceUpdateComponent],
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
      .overrideTemplate(TaxReferenceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaxReferenceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taxReferenceFormService = TestBed.inject(TaxReferenceFormService);
    taxReferenceService = TestBed.inject(TaxReferenceService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const taxReference: ITaxReference = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 65475 }];
      taxReference.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 91899 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taxReference });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taxReference: ITaxReference = { id: 456 };
      const placeholder: IPlaceholder = { id: 91533 };
      taxReference.placeholders = [placeholder];

      activatedRoute.data = of({ taxReference });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.taxReference).toEqual(taxReference);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaxReference>>();
      const taxReference = { id: 123 };
      jest.spyOn(taxReferenceFormService, 'getTaxReference').mockReturnValue(taxReference);
      jest.spyOn(taxReferenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taxReference });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taxReference }));
      saveSubject.complete();

      // THEN
      expect(taxReferenceFormService.getTaxReference).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taxReferenceService.update).toHaveBeenCalledWith(expect.objectContaining(taxReference));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaxReference>>();
      const taxReference = { id: 123 };
      jest.spyOn(taxReferenceFormService, 'getTaxReference').mockReturnValue({ id: null });
      jest.spyOn(taxReferenceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taxReference: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taxReference }));
      saveSubject.complete();

      // THEN
      expect(taxReferenceFormService.getTaxReference).toHaveBeenCalled();
      expect(taxReferenceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaxReference>>();
      const taxReference = { id: 123 };
      jest.spyOn(taxReferenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taxReference });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taxReferenceService.update).toHaveBeenCalled();
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
