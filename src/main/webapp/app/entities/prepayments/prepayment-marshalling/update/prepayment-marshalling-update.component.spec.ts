import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PrepaymentMarshallingFormService } from './prepayment-marshalling-form.service';
import { PrepaymentMarshallingService } from '../service/prepayment-marshalling.service';
import { IPrepaymentMarshalling } from '../prepayment-marshalling.model';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayments/prepayment-account/service/prepayment-account.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { PrepaymentMarshallingUpdateComponent } from './prepayment-marshalling-update.component';

describe('PrepaymentMarshalling Management Update Component', () => {
  let comp: PrepaymentMarshallingUpdateComponent;
  let fixture: ComponentFixture<PrepaymentMarshallingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let prepaymentMarshallingFormService: PrepaymentMarshallingFormService;
  let prepaymentMarshallingService: PrepaymentMarshallingService;
  let prepaymentAccountService: PrepaymentAccountService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PrepaymentMarshallingUpdateComponent],
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
      .overrideTemplate(PrepaymentMarshallingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrepaymentMarshallingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    prepaymentMarshallingFormService = TestBed.inject(PrepaymentMarshallingFormService);
    prepaymentMarshallingService = TestBed.inject(PrepaymentMarshallingService);
    prepaymentAccountService = TestBed.inject(PrepaymentAccountService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PrepaymentAccount query and add missing value', () => {
      const prepaymentMarshalling: IPrepaymentMarshalling = { id: 456 };
      const prepaymentAccount: IPrepaymentAccount = { id: 27557 };
      prepaymentMarshalling.prepaymentAccount = prepaymentAccount;

      const prepaymentAccountCollection: IPrepaymentAccount[] = [{ id: 67420 }];
      jest.spyOn(prepaymentAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: prepaymentAccountCollection })));
      const additionalPrepaymentAccounts = [prepaymentAccount];
      const expectedCollection: IPrepaymentAccount[] = [...additionalPrepaymentAccounts, ...prepaymentAccountCollection];
      jest.spyOn(prepaymentAccountService, 'addPrepaymentAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentMarshalling });
      comp.ngOnInit();

      expect(prepaymentAccountService.query).toHaveBeenCalled();
      expect(prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing).toHaveBeenCalledWith(
        prepaymentAccountCollection,
        ...additionalPrepaymentAccounts.map(expect.objectContaining)
      );
      expect(comp.prepaymentAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const prepaymentMarshalling: IPrepaymentMarshalling = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 39118 }];
      prepaymentMarshalling.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 64027 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentMarshalling });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const prepaymentMarshalling: IPrepaymentMarshalling = { id: 456 };
      const prepaymentAccount: IPrepaymentAccount = { id: 39745 };
      prepaymentMarshalling.prepaymentAccount = prepaymentAccount;
      const placeholder: IPlaceholder = { id: 72390 };
      prepaymentMarshalling.placeholders = [placeholder];

      activatedRoute.data = of({ prepaymentMarshalling });
      comp.ngOnInit();

      expect(comp.prepaymentAccountsSharedCollection).toContain(prepaymentAccount);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.prepaymentMarshalling).toEqual(prepaymentMarshalling);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentMarshalling>>();
      const prepaymentMarshalling = { id: 123 };
      jest.spyOn(prepaymentMarshallingFormService, 'getPrepaymentMarshalling').mockReturnValue(prepaymentMarshalling);
      jest.spyOn(prepaymentMarshallingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentMarshalling });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentMarshalling }));
      saveSubject.complete();

      // THEN
      expect(prepaymentMarshallingFormService.getPrepaymentMarshalling).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(prepaymentMarshallingService.update).toHaveBeenCalledWith(expect.objectContaining(prepaymentMarshalling));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentMarshalling>>();
      const prepaymentMarshalling = { id: 123 };
      jest.spyOn(prepaymentMarshallingFormService, 'getPrepaymentMarshalling').mockReturnValue({ id: null });
      jest.spyOn(prepaymentMarshallingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentMarshalling: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentMarshalling }));
      saveSubject.complete();

      // THEN
      expect(prepaymentMarshallingFormService.getPrepaymentMarshalling).toHaveBeenCalled();
      expect(prepaymentMarshallingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentMarshalling>>();
      const prepaymentMarshalling = { id: 123 };
      jest.spyOn(prepaymentMarshallingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentMarshalling });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(prepaymentMarshallingService.update).toHaveBeenCalled();
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
