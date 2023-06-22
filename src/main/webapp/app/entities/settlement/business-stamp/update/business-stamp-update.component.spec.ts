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

import { BusinessStampFormService } from './business-stamp-form.service';
import { BusinessStampService } from '../service/business-stamp.service';
import { IBusinessStamp } from '../business-stamp.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { BusinessStampUpdateComponent } from './business-stamp-update.component';

describe('BusinessStamp Management Update Component', () => {
  let comp: BusinessStampUpdateComponent;
  let fixture: ComponentFixture<BusinessStampUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let businessStampFormService: BusinessStampFormService;
  let businessStampService: BusinessStampService;
  let dealerService: DealerService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BusinessStampUpdateComponent],
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
      .overrideTemplate(BusinessStampUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BusinessStampUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    businessStampFormService = TestBed.inject(BusinessStampFormService);
    businessStampService = TestBed.inject(BusinessStampService);
    dealerService = TestBed.inject(DealerService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dealer query and add missing value', () => {
      const businessStamp: IBusinessStamp = { id: 456 };
      const stampHolder: IDealer = { id: 58917 };
      businessStamp.stampHolder = stampHolder;

      const dealerCollection: IDealer[] = [{ id: 78982 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [stampHolder];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessStamp });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const businessStamp: IBusinessStamp = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 38787 }];
      businessStamp.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 73707 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessStamp });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const businessStamp: IBusinessStamp = { id: 456 };
      const stampHolder: IDealer = { id: 12161 };
      businessStamp.stampHolder = stampHolder;
      const placeholder: IPlaceholder = { id: 20439 };
      businessStamp.placeholders = [placeholder];

      activatedRoute.data = of({ businessStamp });
      comp.ngOnInit();

      expect(comp.dealersSharedCollection).toContain(stampHolder);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.businessStamp).toEqual(businessStamp);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessStamp>>();
      const businessStamp = { id: 123 };
      jest.spyOn(businessStampFormService, 'getBusinessStamp').mockReturnValue(businessStamp);
      jest.spyOn(businessStampService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessStamp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: businessStamp }));
      saveSubject.complete();

      // THEN
      expect(businessStampFormService.getBusinessStamp).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(businessStampService.update).toHaveBeenCalledWith(expect.objectContaining(businessStamp));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessStamp>>();
      const businessStamp = { id: 123 };
      jest.spyOn(businessStampFormService, 'getBusinessStamp').mockReturnValue({ id: null });
      jest.spyOn(businessStampService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessStamp: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: businessStamp }));
      saveSubject.complete();

      // THEN
      expect(businessStampFormService.getBusinessStamp).toHaveBeenCalled();
      expect(businessStampService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessStamp>>();
      const businessStamp = { id: 123 };
      jest.spyOn(businessStampService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessStamp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(businessStampService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
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
