///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AmortizationRecurrenceFormService } from './amortization-recurrence-form.service';
import { AmortizationRecurrenceService } from '../service/amortization-recurrence.service';
import { IAmortizationRecurrence } from '../amortization-recurrence.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { PrepaymentMappingService } from 'app/entities/prepayments/prepayment-mapping/service/prepayment-mapping.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IDepreciationMethod } from 'app/entities/assets/depreciation-method/depreciation-method.model';
import { DepreciationMethodService } from 'app/entities/assets/depreciation-method/service/depreciation-method.service';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayments/prepayment-account/service/prepayment-account.service';

import { AmortizationRecurrenceUpdateComponent } from './amortization-recurrence-update.component';

describe('AmortizationRecurrence Management Update Component', () => {
  let comp: AmortizationRecurrenceUpdateComponent;
  let fixture: ComponentFixture<AmortizationRecurrenceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let amortizationRecurrenceFormService: AmortizationRecurrenceFormService;
  let amortizationRecurrenceService: AmortizationRecurrenceService;
  let placeholderService: PlaceholderService;
  let prepaymentMappingService: PrepaymentMappingService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let depreciationMethodService: DepreciationMethodService;
  let prepaymentAccountService: PrepaymentAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AmortizationRecurrenceUpdateComponent],
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
      .overrideTemplate(AmortizationRecurrenceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AmortizationRecurrenceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    amortizationRecurrenceFormService = TestBed.inject(AmortizationRecurrenceFormService);
    amortizationRecurrenceService = TestBed.inject(AmortizationRecurrenceService);
    placeholderService = TestBed.inject(PlaceholderService);
    prepaymentMappingService = TestBed.inject(PrepaymentMappingService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    depreciationMethodService = TestBed.inject(DepreciationMethodService);
    prepaymentAccountService = TestBed.inject(PrepaymentAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const amortizationRecurrence: IAmortizationRecurrence = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 74567 }];
      amortizationRecurrence.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 41997 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PrepaymentMapping query and add missing value', () => {
      const amortizationRecurrence: IAmortizationRecurrence = { id: 456 };
      const parameters: IPrepaymentMapping[] = [{ id: 2360 }];
      amortizationRecurrence.parameters = parameters;

      const prepaymentMappingCollection: IPrepaymentMapping[] = [{ id: 84779 }];
      jest.spyOn(prepaymentMappingService, 'query').mockReturnValue(of(new HttpResponse({ body: prepaymentMappingCollection })));
      const additionalPrepaymentMappings = [...parameters];
      const expectedCollection: IPrepaymentMapping[] = [...additionalPrepaymentMappings, ...prepaymentMappingCollection];
      jest.spyOn(prepaymentMappingService, 'addPrepaymentMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      expect(prepaymentMappingService.query).toHaveBeenCalled();
      expect(prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing).toHaveBeenCalledWith(
        prepaymentMappingCollection,
        ...additionalPrepaymentMappings.map(expect.objectContaining)
      );
      expect(comp.prepaymentMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const amortizationRecurrence: IAmortizationRecurrence = { id: 456 };
      const applicationParameters: IUniversallyUniqueMapping[] = [{ id: 41774 }];
      amortizationRecurrence.applicationParameters = applicationParameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 65020 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...applicationParameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DepreciationMethod query and add missing value', () => {
      const amortizationRecurrence: IAmortizationRecurrence = { id: 456 };
      const depreciationMethod: IDepreciationMethod = { id: 23241 };
      amortizationRecurrence.depreciationMethod = depreciationMethod;

      const depreciationMethodCollection: IDepreciationMethod[] = [{ id: 6981 }];
      jest.spyOn(depreciationMethodService, 'query').mockReturnValue(of(new HttpResponse({ body: depreciationMethodCollection })));
      const additionalDepreciationMethods = [depreciationMethod];
      const expectedCollection: IDepreciationMethod[] = [...additionalDepreciationMethods, ...depreciationMethodCollection];
      jest.spyOn(depreciationMethodService, 'addDepreciationMethodToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      expect(depreciationMethodService.query).toHaveBeenCalled();
      expect(depreciationMethodService.addDepreciationMethodToCollectionIfMissing).toHaveBeenCalledWith(
        depreciationMethodCollection,
        ...additionalDepreciationMethods.map(expect.objectContaining)
      );
      expect(comp.depreciationMethodsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PrepaymentAccount query and add missing value', () => {
      const amortizationRecurrence: IAmortizationRecurrence = { id: 456 };
      const prepaymentAccount: IPrepaymentAccount = { id: 73479 };
      amortizationRecurrence.prepaymentAccount = prepaymentAccount;

      const prepaymentAccountCollection: IPrepaymentAccount[] = [{ id: 11038 }];
      jest.spyOn(prepaymentAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: prepaymentAccountCollection })));
      const additionalPrepaymentAccounts = [prepaymentAccount];
      const expectedCollection: IPrepaymentAccount[] = [...additionalPrepaymentAccounts, ...prepaymentAccountCollection];
      jest.spyOn(prepaymentAccountService, 'addPrepaymentAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      expect(prepaymentAccountService.query).toHaveBeenCalled();
      expect(prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing).toHaveBeenCalledWith(
        prepaymentAccountCollection,
        ...additionalPrepaymentAccounts.map(expect.objectContaining)
      );
      expect(comp.prepaymentAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const amortizationRecurrence: IAmortizationRecurrence = { id: 456 };
      const placeholder: IPlaceholder = { id: 30107 };
      amortizationRecurrence.placeholders = [placeholder];
      const parameters: IPrepaymentMapping = { id: 65218 };
      amortizationRecurrence.parameters = [parameters];
      const applicationParameters: IUniversallyUniqueMapping = { id: 6202 };
      amortizationRecurrence.applicationParameters = [applicationParameters];
      const depreciationMethod: IDepreciationMethod = { id: 6325 };
      amortizationRecurrence.depreciationMethod = depreciationMethod;
      const prepaymentAccount: IPrepaymentAccount = { id: 26896 };
      amortizationRecurrence.prepaymentAccount = prepaymentAccount;

      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.prepaymentMappingsSharedCollection).toContain(parameters);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(applicationParameters);
      expect(comp.depreciationMethodsSharedCollection).toContain(depreciationMethod);
      expect(comp.prepaymentAccountsSharedCollection).toContain(prepaymentAccount);
      expect(comp.amortizationRecurrence).toEqual(amortizationRecurrence);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAmortizationRecurrence>>();
      const amortizationRecurrence = { id: 123 };
      jest.spyOn(amortizationRecurrenceFormService, 'getAmortizationRecurrence').mockReturnValue(amortizationRecurrence);
      jest.spyOn(amortizationRecurrenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: amortizationRecurrence }));
      saveSubject.complete();

      // THEN
      expect(amortizationRecurrenceFormService.getAmortizationRecurrence).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(amortizationRecurrenceService.update).toHaveBeenCalledWith(expect.objectContaining(amortizationRecurrence));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAmortizationRecurrence>>();
      const amortizationRecurrence = { id: 123 };
      jest.spyOn(amortizationRecurrenceFormService, 'getAmortizationRecurrence').mockReturnValue({ id: null });
      jest.spyOn(amortizationRecurrenceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ amortizationRecurrence: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: amortizationRecurrence }));
      saveSubject.complete();

      // THEN
      expect(amortizationRecurrenceFormService.getAmortizationRecurrence).toHaveBeenCalled();
      expect(amortizationRecurrenceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAmortizationRecurrence>>();
      const amortizationRecurrence = { id: 123 };
      jest.spyOn(amortizationRecurrenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ amortizationRecurrence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(amortizationRecurrenceService.update).toHaveBeenCalled();
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

    describe('comparePrepaymentMapping', () => {
      it('Should forward to prepaymentMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(prepaymentMappingService, 'comparePrepaymentMapping');
        comp.comparePrepaymentMapping(entity, entity2);
        expect(prepaymentMappingService.comparePrepaymentMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDepreciationMethod', () => {
      it('Should forward to depreciationMethodService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(depreciationMethodService, 'compareDepreciationMethod');
        comp.compareDepreciationMethod(entity, entity2);
        expect(depreciationMethodService.compareDepreciationMethod).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePrepaymentAccount', () => {
      it('Should forward to prepaymentAccountService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(prepaymentAccountService, 'comparePrepaymentAccount');
        comp.comparePrepaymentAccount(entity, entity2);
        expect(prepaymentAccountService.comparePrepaymentAccount).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
