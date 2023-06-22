import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SecurityClearanceFormService } from './security-clearance-form.service';
import { SecurityClearanceService } from '../service/security-clearance.service';
import { ISecurityClearance } from '../security-clearance.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { SecurityClearanceUpdateComponent } from './security-clearance-update.component';

describe('SecurityClearance Management Update Component', () => {
  let comp: SecurityClearanceUpdateComponent;
  let fixture: ComponentFixture<SecurityClearanceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let securityClearanceFormService: SecurityClearanceFormService;
  let securityClearanceService: SecurityClearanceService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SecurityClearanceUpdateComponent],
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
      .overrideTemplate(SecurityClearanceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecurityClearanceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    securityClearanceFormService = TestBed.inject(SecurityClearanceFormService);
    securityClearanceService = TestBed.inject(SecurityClearanceService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SecurityClearance query and add missing value', () => {
      const securityClearance: ISecurityClearance = { id: 456 };
      const grantedClearances: ISecurityClearance[] = [{ id: 75806 }];
      securityClearance.grantedClearances = grantedClearances;

      const securityClearanceCollection: ISecurityClearance[] = [{ id: 96792 }];
      jest.spyOn(securityClearanceService, 'query').mockReturnValue(of(new HttpResponse({ body: securityClearanceCollection })));
      const additionalSecurityClearances = [...grantedClearances];
      const expectedCollection: ISecurityClearance[] = [...additionalSecurityClearances, ...securityClearanceCollection];
      jest.spyOn(securityClearanceService, 'addSecurityClearanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ securityClearance });
      comp.ngOnInit();

      expect(securityClearanceService.query).toHaveBeenCalled();
      expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
        securityClearanceCollection,
        ...additionalSecurityClearances.map(expect.objectContaining)
      );
      expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const securityClearance: ISecurityClearance = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 2991 }];
      securityClearance.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 74802 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ securityClearance });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const securityClearance: ISecurityClearance = { id: 456 };
      const grantedClearances: ISecurityClearance = { id: 37051 };
      securityClearance.grantedClearances = [grantedClearances];
      const placeholder: IPlaceholder = { id: 16415 };
      securityClearance.placeholders = [placeholder];

      activatedRoute.data = of({ securityClearance });
      comp.ngOnInit();

      expect(comp.securityClearancesSharedCollection).toContain(grantedClearances);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.securityClearance).toEqual(securityClearance);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityClearance>>();
      const securityClearance = { id: 123 };
      jest.spyOn(securityClearanceFormService, 'getSecurityClearance').mockReturnValue(securityClearance);
      jest.spyOn(securityClearanceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityClearance });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityClearance }));
      saveSubject.complete();

      // THEN
      expect(securityClearanceFormService.getSecurityClearance).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(securityClearanceService.update).toHaveBeenCalledWith(expect.objectContaining(securityClearance));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityClearance>>();
      const securityClearance = { id: 123 };
      jest.spyOn(securityClearanceFormService, 'getSecurityClearance').mockReturnValue({ id: null });
      jest.spyOn(securityClearanceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityClearance: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityClearance }));
      saveSubject.complete();

      // THEN
      expect(securityClearanceFormService.getSecurityClearance).toHaveBeenCalled();
      expect(securityClearanceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityClearance>>();
      const securityClearance = { id: 123 };
      jest.spyOn(securityClearanceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityClearance });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(securityClearanceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSecurityClearance', () => {
      it('Should forward to securityClearanceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(securityClearanceService, 'compareSecurityClearance');
        comp.compareSecurityClearance(entity, entity2);
        expect(securityClearanceService.compareSecurityClearance).toHaveBeenCalledWith(entity, entity2);
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
