import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AmortizationSequenceFormService } from './amortization-sequence-form.service';
import { AmortizationSequenceService } from '../service/amortization-sequence.service';
import { IAmortizationSequence } from '../amortization-sequence.model';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayments/prepayment-account/service/prepayment-account.service';
import { IAmortizationRecurrence } from 'app/entities/prepayments/amortization-recurrence/amortization-recurrence.model';
import { AmortizationRecurrenceService } from 'app/entities/prepayments/amortization-recurrence/service/amortization-recurrence.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { PrepaymentMappingService } from 'app/entities/prepayments/prepayment-mapping/service/prepayment-mapping.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

import { AmortizationSequenceUpdateComponent } from './amortization-sequence-update.component';

describe('AmortizationSequence Management Update Component', () => {
  let comp: AmortizationSequenceUpdateComponent;
  let fixture: ComponentFixture<AmortizationSequenceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let amortizationSequenceFormService: AmortizationSequenceFormService;
  let amortizationSequenceService: AmortizationSequenceService;
  let prepaymentAccountService: PrepaymentAccountService;
  let amortizationRecurrenceService: AmortizationRecurrenceService;
  let placeholderService: PlaceholderService;
  let prepaymentMappingService: PrepaymentMappingService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AmortizationSequenceUpdateComponent],
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
      .overrideTemplate(AmortizationSequenceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AmortizationSequenceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    amortizationSequenceFormService = TestBed.inject(AmortizationSequenceFormService);
    amortizationSequenceService = TestBed.inject(AmortizationSequenceService);
    prepaymentAccountService = TestBed.inject(PrepaymentAccountService);
    amortizationRecurrenceService = TestBed.inject(AmortizationRecurrenceService);
    placeholderService = TestBed.inject(PlaceholderService);
    prepaymentMappingService = TestBed.inject(PrepaymentMappingService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PrepaymentAccount query and add missing value', () => {
      const amortizationSequence: IAmortizationSequence = { id: 456 };
      const prepaymentAccount: IPrepaymentAccount = { id: 76107 };
      amortizationSequence.prepaymentAccount = prepaymentAccount;

      const prepaymentAccountCollection: IPrepaymentAccount[] = [{ id: 44742 }];
      jest.spyOn(prepaymentAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: prepaymentAccountCollection })));
      const additionalPrepaymentAccounts = [prepaymentAccount];
      const expectedCollection: IPrepaymentAccount[] = [...additionalPrepaymentAccounts, ...prepaymentAccountCollection];
      jest.spyOn(prepaymentAccountService, 'addPrepaymentAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      expect(prepaymentAccountService.query).toHaveBeenCalled();
      expect(prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing).toHaveBeenCalledWith(
        prepaymentAccountCollection,
        ...additionalPrepaymentAccounts.map(expect.objectContaining)
      );
      expect(comp.prepaymentAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AmortizationRecurrence query and add missing value', () => {
      const amortizationSequence: IAmortizationSequence = { id: 456 };
      const amortizationRecurrence: IAmortizationRecurrence = { id: 9151 };
      amortizationSequence.amortizationRecurrence = amortizationRecurrence;

      const amortizationRecurrenceCollection: IAmortizationRecurrence[] = [{ id: 33652 }];
      jest.spyOn(amortizationRecurrenceService, 'query').mockReturnValue(of(new HttpResponse({ body: amortizationRecurrenceCollection })));
      const additionalAmortizationRecurrences = [amortizationRecurrence];
      const expectedCollection: IAmortizationRecurrence[] = [...additionalAmortizationRecurrences, ...amortizationRecurrenceCollection];
      jest.spyOn(amortizationRecurrenceService, 'addAmortizationRecurrenceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      expect(amortizationRecurrenceService.query).toHaveBeenCalled();
      expect(amortizationRecurrenceService.addAmortizationRecurrenceToCollectionIfMissing).toHaveBeenCalledWith(
        amortizationRecurrenceCollection,
        ...additionalAmortizationRecurrences.map(expect.objectContaining)
      );
      expect(comp.amortizationRecurrencesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const amortizationSequence: IAmortizationSequence = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 64564 }];
      amortizationSequence.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 12372 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PrepaymentMapping query and add missing value', () => {
      const amortizationSequence: IAmortizationSequence = { id: 456 };
      const prepaymentMappings: IPrepaymentMapping[] = [{ id: 37255 }];
      amortizationSequence.prepaymentMappings = prepaymentMappings;

      const prepaymentMappingCollection: IPrepaymentMapping[] = [{ id: 64405 }];
      jest.spyOn(prepaymentMappingService, 'query').mockReturnValue(of(new HttpResponse({ body: prepaymentMappingCollection })));
      const additionalPrepaymentMappings = [...prepaymentMappings];
      const expectedCollection: IPrepaymentMapping[] = [...additionalPrepaymentMappings, ...prepaymentMappingCollection];
      jest.spyOn(prepaymentMappingService, 'addPrepaymentMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      expect(prepaymentMappingService.query).toHaveBeenCalled();
      expect(prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing).toHaveBeenCalledWith(
        prepaymentMappingCollection,
        ...additionalPrepaymentMappings.map(expect.objectContaining)
      );
      expect(comp.prepaymentMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const amortizationSequence: IAmortizationSequence = { id: 456 };
      const applicationParameters: IUniversallyUniqueMapping[] = [{ id: 79767 }];
      amortizationSequence.applicationParameters = applicationParameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 41560 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...applicationParameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const amortizationSequence: IAmortizationSequence = { id: 456 };
      const prepaymentAccount: IPrepaymentAccount = { id: 14544 };
      amortizationSequence.prepaymentAccount = prepaymentAccount;
      const amortizationRecurrence: IAmortizationRecurrence = { id: 5922 };
      amortizationSequence.amortizationRecurrence = amortizationRecurrence;
      const placeholder: IPlaceholder = { id: 33594 };
      amortizationSequence.placeholders = [placeholder];
      const prepaymentMapping: IPrepaymentMapping = { id: 71269 };
      amortizationSequence.prepaymentMappings = [prepaymentMapping];
      const applicationParameters: IUniversallyUniqueMapping = { id: 50876 };
      amortizationSequence.applicationParameters = [applicationParameters];

      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      expect(comp.prepaymentAccountsSharedCollection).toContain(prepaymentAccount);
      expect(comp.amortizationRecurrencesSharedCollection).toContain(amortizationRecurrence);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.prepaymentMappingsSharedCollection).toContain(prepaymentMapping);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(applicationParameters);
      expect(comp.amortizationSequence).toEqual(amortizationSequence);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAmortizationSequence>>();
      const amortizationSequence = { id: 123 };
      jest.spyOn(amortizationSequenceFormService, 'getAmortizationSequence').mockReturnValue(amortizationSequence);
      jest.spyOn(amortizationSequenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: amortizationSequence }));
      saveSubject.complete();

      // THEN
      expect(amortizationSequenceFormService.getAmortizationSequence).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(amortizationSequenceService.update).toHaveBeenCalledWith(expect.objectContaining(amortizationSequence));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAmortizationSequence>>();
      const amortizationSequence = { id: 123 };
      jest.spyOn(amortizationSequenceFormService, 'getAmortizationSequence').mockReturnValue({ id: null });
      jest.spyOn(amortizationSequenceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ amortizationSequence: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: amortizationSequence }));
      saveSubject.complete();

      // THEN
      expect(amortizationSequenceFormService.getAmortizationSequence).toHaveBeenCalled();
      expect(amortizationSequenceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAmortizationSequence>>();
      const amortizationSequence = { id: 123 };
      jest.spyOn(amortizationSequenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ amortizationSequence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(amortizationSequenceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePrepaymentAccount', () => {
      it('Should forward to prepaymentAccountService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(prepaymentAccountService, 'comparePrepaymentAccount');
        comp.comparePrepaymentAccount(entity, entity2);
        expect(prepaymentAccountService.comparePrepaymentAccount).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAmortizationRecurrence', () => {
      it('Should forward to amortizationRecurrenceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(amortizationRecurrenceService, 'compareAmortizationRecurrence');
        comp.compareAmortizationRecurrence(entity, entity2);
        expect(amortizationRecurrenceService.compareAmortizationRecurrence).toHaveBeenCalledWith(entity, entity2);
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
  });
});
