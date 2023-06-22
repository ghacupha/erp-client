import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MfbBranchCodeFormService } from './mfb-branch-code-form.service';
import { MfbBranchCodeService } from '../service/mfb-branch-code.service';
import { IMfbBranchCode } from '../mfb-branch-code.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { MfbBranchCodeUpdateComponent } from './mfb-branch-code-update.component';

describe('MfbBranchCode Management Update Component', () => {
  let comp: MfbBranchCodeUpdateComponent;
  let fixture: ComponentFixture<MfbBranchCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let mfbBranchCodeFormService: MfbBranchCodeFormService;
  let mfbBranchCodeService: MfbBranchCodeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MfbBranchCodeUpdateComponent],
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
      .overrideTemplate(MfbBranchCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MfbBranchCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mfbBranchCodeFormService = TestBed.inject(MfbBranchCodeFormService);
    mfbBranchCodeService = TestBed.inject(MfbBranchCodeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const mfbBranchCode: IMfbBranchCode = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 41129 }];
      mfbBranchCode.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 81807 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ mfbBranchCode });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const mfbBranchCode: IMfbBranchCode = { id: 456 };
      const placeholder: IPlaceholder = { id: 89462 };
      mfbBranchCode.placeholders = [placeholder];

      activatedRoute.data = of({ mfbBranchCode });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.mfbBranchCode).toEqual(mfbBranchCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMfbBranchCode>>();
      const mfbBranchCode = { id: 123 };
      jest.spyOn(mfbBranchCodeFormService, 'getMfbBranchCode').mockReturnValue(mfbBranchCode);
      jest.spyOn(mfbBranchCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mfbBranchCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mfbBranchCode }));
      saveSubject.complete();

      // THEN
      expect(mfbBranchCodeFormService.getMfbBranchCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(mfbBranchCodeService.update).toHaveBeenCalledWith(expect.objectContaining(mfbBranchCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMfbBranchCode>>();
      const mfbBranchCode = { id: 123 };
      jest.spyOn(mfbBranchCodeFormService, 'getMfbBranchCode').mockReturnValue({ id: null });
      jest.spyOn(mfbBranchCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mfbBranchCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mfbBranchCode }));
      saveSubject.complete();

      // THEN
      expect(mfbBranchCodeFormService.getMfbBranchCode).toHaveBeenCalled();
      expect(mfbBranchCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMfbBranchCode>>();
      const mfbBranchCode = { id: 123 };
      jest.spyOn(mfbBranchCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mfbBranchCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(mfbBranchCodeService.update).toHaveBeenCalled();
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
