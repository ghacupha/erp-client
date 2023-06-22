import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IsoCountryCodeFormService } from './iso-country-code-form.service';
import { IsoCountryCodeService } from '../service/iso-country-code.service';
import { IIsoCountryCode } from '../iso-country-code.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { IsoCountryCodeUpdateComponent } from './iso-country-code-update.component';

describe('IsoCountryCode Management Update Component', () => {
  let comp: IsoCountryCodeUpdateComponent;
  let fixture: ComponentFixture<IsoCountryCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let isoCountryCodeFormService: IsoCountryCodeFormService;
  let isoCountryCodeService: IsoCountryCodeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IsoCountryCodeUpdateComponent],
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
      .overrideTemplate(IsoCountryCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IsoCountryCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    isoCountryCodeFormService = TestBed.inject(IsoCountryCodeFormService);
    isoCountryCodeService = TestBed.inject(IsoCountryCodeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const isoCountryCode: IIsoCountryCode = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 93808 }];
      isoCountryCode.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 3802 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const isoCountryCode: IIsoCountryCode = { id: 456 };
      const placeholder: IPlaceholder = { id: 7392 };
      isoCountryCode.placeholders = [placeholder];

      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.isoCountryCode).toEqual(isoCountryCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeFormService, 'getIsoCountryCode').mockReturnValue(isoCountryCode);
      jest.spyOn(isoCountryCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCountryCode }));
      saveSubject.complete();

      // THEN
      expect(isoCountryCodeFormService.getIsoCountryCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(isoCountryCodeService.update).toHaveBeenCalledWith(expect.objectContaining(isoCountryCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeFormService, 'getIsoCountryCode').mockReturnValue({ id: null });
      jest.spyOn(isoCountryCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCountryCode }));
      saveSubject.complete();

      // THEN
      expect(isoCountryCodeFormService.getIsoCountryCode).toHaveBeenCalled();
      expect(isoCountryCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(isoCountryCodeService.update).toHaveBeenCalled();
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
