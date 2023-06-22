import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InstitutionCodeFormService } from './institution-code-form.service';
import { InstitutionCodeService } from '../service/institution-code.service';
import { IInstitutionCode } from '../institution-code.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { InstitutionCodeUpdateComponent } from './institution-code-update.component';

describe('InstitutionCode Management Update Component', () => {
  let comp: InstitutionCodeUpdateComponent;
  let fixture: ComponentFixture<InstitutionCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let institutionCodeFormService: InstitutionCodeFormService;
  let institutionCodeService: InstitutionCodeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InstitutionCodeUpdateComponent],
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
      .overrideTemplate(InstitutionCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    institutionCodeFormService = TestBed.inject(InstitutionCodeFormService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const institutionCode: IInstitutionCode = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 42985 }];
      institutionCode.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 88882 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ institutionCode });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const institutionCode: IInstitutionCode = { id: 456 };
      const placeholder: IPlaceholder = { id: 51507 };
      institutionCode.placeholders = [placeholder];

      activatedRoute.data = of({ institutionCode });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.institutionCode).toEqual(institutionCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionCode>>();
      const institutionCode = { id: 123 };
      jest.spyOn(institutionCodeFormService, 'getInstitutionCode').mockReturnValue(institutionCode);
      jest.spyOn(institutionCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institutionCode }));
      saveSubject.complete();

      // THEN
      expect(institutionCodeFormService.getInstitutionCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(institutionCodeService.update).toHaveBeenCalledWith(expect.objectContaining(institutionCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionCode>>();
      const institutionCode = { id: 123 };
      jest.spyOn(institutionCodeFormService, 'getInstitutionCode').mockReturnValue({ id: null });
      jest.spyOn(institutionCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institutionCode }));
      saveSubject.complete();

      // THEN
      expect(institutionCodeFormService.getInstitutionCode).toHaveBeenCalled();
      expect(institutionCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionCode>>();
      const institutionCode = { id: 123 };
      jest.spyOn(institutionCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(institutionCodeService.update).toHaveBeenCalled();
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
