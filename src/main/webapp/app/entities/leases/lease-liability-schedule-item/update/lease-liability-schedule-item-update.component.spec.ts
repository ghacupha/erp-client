///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LeaseLiabilityScheduleItemService } from '../service/lease-liability-schedule-item.service';
import { ILeaseLiabilityScheduleItem, LeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ILeaseContract } from 'app/entities/leases/lease-contract/lease-contract.model';
import { LeaseContractService } from 'app/entities/leases/lease-contract/service/lease-contract.service';
import { ILeaseModelMetadata } from 'app/entities/leases/lease-model-metadata/lease-model-metadata.model';
import { LeaseModelMetadataService } from 'app/entities/leases/lease-model-metadata/service/lease-model-metadata.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { ILeasePeriod } from 'app/entities/leases/lease-period/lease-period.model';
import { LeasePeriodService } from 'app/entities/leases/lease-period/service/lease-period.service';
import { ILeaseAmortizationSchedule } from 'app/entities/leases/lease-amortization-schedule/lease-amortization-schedule.model';
import { LeaseAmortizationScheduleService } from 'app/entities/leases/lease-amortization-schedule/service/lease-amortization-schedule.service';

import { LeaseLiabilityScheduleItemUpdateComponent } from './lease-liability-schedule-item-update.component';

describe('LeaseLiabilityScheduleItem Management Update Component', () => {
  let comp: LeaseLiabilityScheduleItemUpdateComponent;
  let fixture: ComponentFixture<LeaseLiabilityScheduleItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let leaseLiabilityScheduleItemService: LeaseLiabilityScheduleItemService;
  let placeholderService: PlaceholderService;
  let leaseContractService: LeaseContractService;
  let leaseModelMetadataService: LeaseModelMetadataService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let leasePeriodService: LeasePeriodService;
  let leaseAmortizationScheduleService: LeaseAmortizationScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LeaseLiabilityScheduleItemUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(LeaseLiabilityScheduleItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LeaseLiabilityScheduleItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    leaseLiabilityScheduleItemService = TestBed.inject(LeaseLiabilityScheduleItemService);
    placeholderService = TestBed.inject(PlaceholderService);
    leaseContractService = TestBed.inject(LeaseContractService);
    leaseModelMetadataService = TestBed.inject(LeaseModelMetadataService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    leasePeriodService = TestBed.inject(LeasePeriodService);
    leaseAmortizationScheduleService = TestBed.inject(LeaseAmortizationScheduleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 70734 }];
      leaseLiabilityScheduleItem.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 78261 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LeaseContract query and add missing value', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const leaseContract: ILeaseContract = { id: 28976 };
      leaseLiabilityScheduleItem.leaseContract = leaseContract;

      const leaseContractCollection: ILeaseContract[] = [{ id: 20381 }];
      jest.spyOn(leaseContractService, 'query').mockReturnValue(of(new HttpResponse({ body: leaseContractCollection })));
      const additionalLeaseContracts = [leaseContract];
      const expectedCollection: ILeaseContract[] = [...additionalLeaseContracts, ...leaseContractCollection];
      jest.spyOn(leaseContractService, 'addLeaseContractToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(leaseContractService.query).toHaveBeenCalled();
      expect(leaseContractService.addLeaseContractToCollectionIfMissing).toHaveBeenCalledWith(
        leaseContractCollection,
        ...additionalLeaseContracts
      );
      expect(comp.leaseContractsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LeaseModelMetadata query and add missing value', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const leaseModelMetadata: ILeaseModelMetadata = { id: 34843 };
      leaseLiabilityScheduleItem.leaseModelMetadata = leaseModelMetadata;

      const leaseModelMetadataCollection: ILeaseModelMetadata[] = [{ id: 74198 }];
      jest.spyOn(leaseModelMetadataService, 'query').mockReturnValue(of(new HttpResponse({ body: leaseModelMetadataCollection })));
      const additionalLeaseModelMetadata = [leaseModelMetadata];
      const expectedCollection: ILeaseModelMetadata[] = [...additionalLeaseModelMetadata, ...leaseModelMetadataCollection];
      jest.spyOn(leaseModelMetadataService, 'addLeaseModelMetadataToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(leaseModelMetadataService.query).toHaveBeenCalled();
      expect(leaseModelMetadataService.addLeaseModelMetadataToCollectionIfMissing).toHaveBeenCalledWith(
        leaseModelMetadataCollection,
        ...additionalLeaseModelMetadata
      );
      expect(comp.leaseModelMetadataSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const universallyUniqueMappings: IUniversallyUniqueMapping[] = [{ id: 66061 }];
      leaseLiabilityScheduleItem.universallyUniqueMappings = universallyUniqueMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 25704 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...universallyUniqueMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LeasePeriod query and add missing value', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const leasePeriod: ILeasePeriod = { id: 19833 };
      leaseLiabilityScheduleItem.leasePeriod = leasePeriod;

      const leasePeriodCollection: ILeasePeriod[] = [{ id: 3256 }];
      jest.spyOn(leasePeriodService, 'query').mockReturnValue(of(new HttpResponse({ body: leasePeriodCollection })));
      const additionalLeasePeriods = [leasePeriod];
      const expectedCollection: ILeasePeriod[] = [...additionalLeasePeriods, ...leasePeriodCollection];
      jest.spyOn(leasePeriodService, 'addLeasePeriodToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(leasePeriodService.query).toHaveBeenCalled();
      expect(leasePeriodService.addLeasePeriodToCollectionIfMissing).toHaveBeenCalledWith(leasePeriodCollection, ...additionalLeasePeriods);
      expect(comp.leasePeriodsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LeaseAmortizationSchedule query and add missing value', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const leaseAmortizationSchedule: ILeaseAmortizationSchedule = { id: 95924 };
      leaseLiabilityScheduleItem.leaseAmortizationSchedule = leaseAmortizationSchedule;

      const leaseAmortizationScheduleCollection: ILeaseAmortizationSchedule[] = [{ id: 59618 }];
      jest
        .spyOn(leaseAmortizationScheduleService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: leaseAmortizationScheduleCollection })));
      const additionalLeaseAmortizationSchedules = [leaseAmortizationSchedule];
      const expectedCollection: ILeaseAmortizationSchedule[] = [
        ...additionalLeaseAmortizationSchedules,
        ...leaseAmortizationScheduleCollection,
      ];
      jest.spyOn(leaseAmortizationScheduleService, 'addLeaseAmortizationScheduleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(leaseAmortizationScheduleService.query).toHaveBeenCalled();
      expect(leaseAmortizationScheduleService.addLeaseAmortizationScheduleToCollectionIfMissing).toHaveBeenCalledWith(
        leaseAmortizationScheduleCollection,
        ...additionalLeaseAmortizationSchedules
      );
      expect(comp.leaseAmortizationSchedulesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const placeholders: IPlaceholder = { id: 79718 };
      leaseLiabilityScheduleItem.placeholders = [placeholders];
      const leaseContract: ILeaseContract = { id: 75340 };
      leaseLiabilityScheduleItem.leaseContract = leaseContract;
      const leaseModelMetadata: ILeaseModelMetadata = { id: 85040 };
      leaseLiabilityScheduleItem.leaseModelMetadata = leaseModelMetadata;
      const universallyUniqueMappings: IUniversallyUniqueMapping = { id: 69682 };
      leaseLiabilityScheduleItem.universallyUniqueMappings = [universallyUniqueMappings];
      const leasePeriod: ILeasePeriod = { id: 97304 };
      leaseLiabilityScheduleItem.leasePeriod = leasePeriod;
      const leaseAmortizationSchedule: ILeaseAmortizationSchedule = { id: 74255 };
      leaseLiabilityScheduleItem.leaseAmortizationSchedule = leaseAmortizationSchedule;

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(leaseLiabilityScheduleItem));
      expect(comp.placeholdersSharedCollection).toContain(placeholders);
      expect(comp.leaseContractsSharedCollection).toContain(leaseContract);
      expect(comp.leaseModelMetadataSharedCollection).toContain(leaseModelMetadata);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMappings);
      expect(comp.leasePeriodsSharedCollection).toContain(leasePeriod);
      expect(comp.leaseAmortizationSchedulesSharedCollection).toContain(leaseAmortizationSchedule);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LeaseLiabilityScheduleItem>>();
      const leaseLiabilityScheduleItem = { id: 123 };
      jest.spyOn(leaseLiabilityScheduleItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaseLiabilityScheduleItem }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(leaseLiabilityScheduleItemService.update).toHaveBeenCalledWith(leaseLiabilityScheduleItem);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LeaseLiabilityScheduleItem>>();
      const leaseLiabilityScheduleItem = new LeaseLiabilityScheduleItem();
      jest.spyOn(leaseLiabilityScheduleItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaseLiabilityScheduleItem }));
      saveSubject.complete();

      // THEN
      expect(leaseLiabilityScheduleItemService.create).toHaveBeenCalledWith(leaseLiabilityScheduleItem);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LeaseLiabilityScheduleItem>>();
      const leaseLiabilityScheduleItem = { id: 123 };
      jest.spyOn(leaseLiabilityScheduleItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(leaseLiabilityScheduleItemService.update).toHaveBeenCalledWith(leaseLiabilityScheduleItem);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPlaceholderById', () => {
      it('Should return tracked Placeholder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlaceholderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackLeaseContractById', () => {
      it('Should return tracked LeaseContract primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLeaseContractById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackLeaseModelMetadataById', () => {
      it('Should return tracked LeaseModelMetadata primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLeaseModelMetadataById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUniversallyUniqueMappingById', () => {
      it('Should return tracked UniversallyUniqueMapping primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUniversallyUniqueMappingById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackLeasePeriodById', () => {
      it('Should return tracked LeasePeriod primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLeasePeriodById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackLeaseAmortizationScheduleById', () => {
      it('Should return tracked LeaseAmortizationSchedule primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLeaseAmortizationScheduleById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedPlaceholder', () => {
      it('Should return option if no Placeholder is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPlaceholder(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Placeholder for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Placeholder is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedUniversallyUniqueMapping', () => {
      it('Should return option if no UniversallyUniqueMapping is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedUniversallyUniqueMapping(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected UniversallyUniqueMapping for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedUniversallyUniqueMapping(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this UniversallyUniqueMapping is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedUniversallyUniqueMapping(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
