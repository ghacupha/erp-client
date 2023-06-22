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

import { ServiceOutletFormService } from './service-outlet-form.service';
import { ServiceOutletService } from '../service/service-outlet.service';
import { IServiceOutlet } from '../service-outlet.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBankBranchCode } from 'app/entities/data/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/data/bank-branch-code/service/bank-branch-code.service';
import { IOutletType } from 'app/entities/data/outlet-type/outlet-type.model';
import { OutletTypeService } from 'app/entities/data/outlet-type/service/outlet-type.service';
import { IOutletStatus } from 'app/entities/data/outlet-status/outlet-status.model';
import { OutletStatusService } from 'app/entities/data/outlet-status/service/outlet-status.service';
import { ICountyCode } from 'app/entities/data/county-code/county-code.model';
import { CountyCodeService } from 'app/entities/data/county-code/service/county-code.service';

import { ServiceOutletUpdateComponent } from './service-outlet-update.component';

describe('ServiceOutlet Management Update Component', () => {
  let comp: ServiceOutletUpdateComponent;
  let fixture: ComponentFixture<ServiceOutletUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let serviceOutletFormService: ServiceOutletFormService;
  let serviceOutletService: ServiceOutletService;
  let placeholderService: PlaceholderService;
  let bankBranchCodeService: BankBranchCodeService;
  let outletTypeService: OutletTypeService;
  let outletStatusService: OutletStatusService;
  let countyCodeService: CountyCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ServiceOutletUpdateComponent],
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
      .overrideTemplate(ServiceOutletUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ServiceOutletUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    serviceOutletFormService = TestBed.inject(ServiceOutletFormService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    placeholderService = TestBed.inject(PlaceholderService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);
    outletTypeService = TestBed.inject(OutletTypeService);
    outletStatusService = TestBed.inject(OutletStatusService);
    countyCodeService = TestBed.inject(CountyCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const serviceOutlet: IServiceOutlet = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 89142 }];
      serviceOutlet.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 81803 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankBranchCode query and add missing value', () => {
      const serviceOutlet: IServiceOutlet = { id: 456 };
      const bankCode: IBankBranchCode = { id: 54950 };
      serviceOutlet.bankCode = bankCode;

      const bankBranchCodeCollection: IBankBranchCode[] = [{ id: 64159 }];
      jest.spyOn(bankBranchCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankBranchCodeCollection })));
      const additionalBankBranchCodes = [bankCode];
      const expectedCollection: IBankBranchCode[] = [...additionalBankBranchCodes, ...bankBranchCodeCollection];
      jest.spyOn(bankBranchCodeService, 'addBankBranchCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      expect(bankBranchCodeService.query).toHaveBeenCalled();
      expect(bankBranchCodeService.addBankBranchCodeToCollectionIfMissing).toHaveBeenCalledWith(
        bankBranchCodeCollection,
        ...additionalBankBranchCodes.map(expect.objectContaining)
      );
      expect(comp.bankBranchCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call OutletType query and add missing value', () => {
      const serviceOutlet: IServiceOutlet = { id: 456 };
      const outletType: IOutletType = { id: 37040 };
      serviceOutlet.outletType = outletType;

      const outletTypeCollection: IOutletType[] = [{ id: 37080 }];
      jest.spyOn(outletTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: outletTypeCollection })));
      const additionalOutletTypes = [outletType];
      const expectedCollection: IOutletType[] = [...additionalOutletTypes, ...outletTypeCollection];
      jest.spyOn(outletTypeService, 'addOutletTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      expect(outletTypeService.query).toHaveBeenCalled();
      expect(outletTypeService.addOutletTypeToCollectionIfMissing).toHaveBeenCalledWith(
        outletTypeCollection,
        ...additionalOutletTypes.map(expect.objectContaining)
      );
      expect(comp.outletTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call OutletStatus query and add missing value', () => {
      const serviceOutlet: IServiceOutlet = { id: 456 };
      const outletStatus: IOutletStatus = { id: 70154 };
      serviceOutlet.outletStatus = outletStatus;

      const outletStatusCollection: IOutletStatus[] = [{ id: 24966 }];
      jest.spyOn(outletStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: outletStatusCollection })));
      const additionalOutletStatuses = [outletStatus];
      const expectedCollection: IOutletStatus[] = [...additionalOutletStatuses, ...outletStatusCollection];
      jest.spyOn(outletStatusService, 'addOutletStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      expect(outletStatusService.query).toHaveBeenCalled();
      expect(outletStatusService.addOutletStatusToCollectionIfMissing).toHaveBeenCalledWith(
        outletStatusCollection,
        ...additionalOutletStatuses.map(expect.objectContaining)
      );
      expect(comp.outletStatusesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CountyCode query and add missing value', () => {
      const serviceOutlet: IServiceOutlet = { id: 456 };
      const countyName: ICountyCode = { id: 84099 };
      serviceOutlet.countyName = countyName;
      const subCountyName: ICountyCode = { id: 48030 };
      serviceOutlet.subCountyName = subCountyName;

      const countyCodeCollection: ICountyCode[] = [{ id: 4997 }];
      jest.spyOn(countyCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: countyCodeCollection })));
      const additionalCountyCodes = [countyName, subCountyName];
      const expectedCollection: ICountyCode[] = [...additionalCountyCodes, ...countyCodeCollection];
      jest.spyOn(countyCodeService, 'addCountyCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      expect(countyCodeService.query).toHaveBeenCalled();
      expect(countyCodeService.addCountyCodeToCollectionIfMissing).toHaveBeenCalledWith(
        countyCodeCollection,
        ...additionalCountyCodes.map(expect.objectContaining)
      );
      expect(comp.countyCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const serviceOutlet: IServiceOutlet = { id: 456 };
      const placeholder: IPlaceholder = { id: 52019 };
      serviceOutlet.placeholders = [placeholder];
      const bankCode: IBankBranchCode = { id: 35169 };
      serviceOutlet.bankCode = bankCode;
      const outletType: IOutletType = { id: 93566 };
      serviceOutlet.outletType = outletType;
      const outletStatus: IOutletStatus = { id: 84573 };
      serviceOutlet.outletStatus = outletStatus;
      const countyName: ICountyCode = { id: 14785 };
      serviceOutlet.countyName = countyName;
      const subCountyName: ICountyCode = { id: 17876 };
      serviceOutlet.subCountyName = subCountyName;

      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.bankBranchCodesSharedCollection).toContain(bankCode);
      expect(comp.outletTypesSharedCollection).toContain(outletType);
      expect(comp.outletStatusesSharedCollection).toContain(outletStatus);
      expect(comp.countyCodesSharedCollection).toContain(countyName);
      expect(comp.countyCodesSharedCollection).toContain(subCountyName);
      expect(comp.serviceOutlet).toEqual(serviceOutlet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServiceOutlet>>();
      const serviceOutlet = { id: 123 };
      jest.spyOn(serviceOutletFormService, 'getServiceOutlet').mockReturnValue(serviceOutlet);
      jest.spyOn(serviceOutletService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: serviceOutlet }));
      saveSubject.complete();

      // THEN
      expect(serviceOutletFormService.getServiceOutlet).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(serviceOutletService.update).toHaveBeenCalledWith(expect.objectContaining(serviceOutlet));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServiceOutlet>>();
      const serviceOutlet = { id: 123 };
      jest.spyOn(serviceOutletFormService, 'getServiceOutlet').mockReturnValue({ id: null });
      jest.spyOn(serviceOutletService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ serviceOutlet: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: serviceOutlet }));
      saveSubject.complete();

      // THEN
      expect(serviceOutletFormService.getServiceOutlet).toHaveBeenCalled();
      expect(serviceOutletService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServiceOutlet>>();
      const serviceOutlet = { id: 123 };
      jest.spyOn(serviceOutletService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ serviceOutlet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(serviceOutletService.update).toHaveBeenCalled();
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

    describe('compareBankBranchCode', () => {
      it('Should forward to bankBranchCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(bankBranchCodeService, 'compareBankBranchCode');
        comp.compareBankBranchCode(entity, entity2);
        expect(bankBranchCodeService.compareBankBranchCode).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOutletType', () => {
      it('Should forward to outletTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(outletTypeService, 'compareOutletType');
        comp.compareOutletType(entity, entity2);
        expect(outletTypeService.compareOutletType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOutletStatus', () => {
      it('Should forward to outletStatusService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(outletStatusService, 'compareOutletStatus');
        comp.compareOutletStatus(entity, entity2);
        expect(outletStatusService.compareOutletStatus).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCountyCode', () => {
      it('Should forward to countyCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(countyCodeService, 'compareCountyCode');
        comp.compareCountyCode(entity, entity2);
        expect(countyCodeService.compareCountyCode).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
