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

import { LeaseLiabilityScheduleItemFormService } from './lease-liability-schedule-item-form.service';
import { LeaseLiabilityScheduleItemService } from '../service/lease-liability-schedule-item.service';
import { ILeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ILeaseContract } from 'app/entities/leases/lease-contract/lease-contract.model';
import { LeaseContractService } from 'app/entities/leases/lease-contract/service/lease-contract.service';
import { ILeaseModelMetadata } from 'app/entities/leases/lease-model-metadata/lease-model-metadata.model';
import { LeaseModelMetadataService } from 'app/entities/leases/lease-model-metadata/service/lease-model-metadata.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

import { LeaseLiabilityScheduleItemUpdateComponent } from './lease-liability-schedule-item-update.component';

describe('LeaseLiabilityScheduleItem Management Update Component', () => {
  let comp: LeaseLiabilityScheduleItemUpdateComponent;
  let fixture: ComponentFixture<LeaseLiabilityScheduleItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let leaseLiabilityScheduleItemFormService: LeaseLiabilityScheduleItemFormService;
  let leaseLiabilityScheduleItemService: LeaseLiabilityScheduleItemService;
  let placeholderService: PlaceholderService;
  let leaseContractService: LeaseContractService;
  let leaseModelMetadataService: LeaseModelMetadataService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LeaseLiabilityScheduleItemUpdateComponent],
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
      .overrideTemplate(LeaseLiabilityScheduleItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LeaseLiabilityScheduleItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    leaseLiabilityScheduleItemFormService = TestBed.inject(LeaseLiabilityScheduleItemFormService);
    leaseLiabilityScheduleItemService = TestBed.inject(LeaseLiabilityScheduleItemService);
    placeholderService = TestBed.inject(PlaceholderService);
    leaseContractService = TestBed.inject(LeaseContractService);
    leaseModelMetadataService = TestBed.inject(LeaseModelMetadataService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

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
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
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
        ...additionalLeaseContracts.map(expect.objectContaining)
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
        ...additionalLeaseModelMetadata.map(expect.objectContaining)
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
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem = { id: 456 };
      const placeholder: IPlaceholder = { id: 79718 };
      leaseLiabilityScheduleItem.placeholders = [placeholder];
      const leaseContract: ILeaseContract = { id: 75340 };
      leaseLiabilityScheduleItem.leaseContract = leaseContract;
      const leaseModelMetadata: ILeaseModelMetadata = { id: 85040 };
      leaseLiabilityScheduleItem.leaseModelMetadata = leaseModelMetadata;
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 69682 };
      leaseLiabilityScheduleItem.universallyUniqueMappings = [universallyUniqueMapping];

      activatedRoute.data = of({ leaseLiabilityScheduleItem });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.leaseContractsSharedCollection).toContain(leaseContract);
      expect(comp.leaseModelMetadataSharedCollection).toContain(leaseModelMetadata);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMapping);
      expect(comp.leaseLiabilityScheduleItem).toEqual(leaseLiabilityScheduleItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseLiabilityScheduleItem>>();
      const leaseLiabilityScheduleItem = { id: 123 };
      jest.spyOn(leaseLiabilityScheduleItemFormService, 'getLeaseLiabilityScheduleItem').mockReturnValue(leaseLiabilityScheduleItem);
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
      expect(leaseLiabilityScheduleItemFormService.getLeaseLiabilityScheduleItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(leaseLiabilityScheduleItemService.update).toHaveBeenCalledWith(expect.objectContaining(leaseLiabilityScheduleItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseLiabilityScheduleItem>>();
      const leaseLiabilityScheduleItem = { id: 123 };
      jest.spyOn(leaseLiabilityScheduleItemFormService, 'getLeaseLiabilityScheduleItem').mockReturnValue({ id: null });
      jest.spyOn(leaseLiabilityScheduleItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseLiabilityScheduleItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaseLiabilityScheduleItem }));
      saveSubject.complete();

      // THEN
      expect(leaseLiabilityScheduleItemFormService.getLeaseLiabilityScheduleItem).toHaveBeenCalled();
      expect(leaseLiabilityScheduleItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseLiabilityScheduleItem>>();
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
      expect(leaseLiabilityScheduleItemService.update).toHaveBeenCalled();
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

    describe('compareLeaseContract', () => {
      it('Should forward to leaseContractService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(leaseContractService, 'compareLeaseContract');
        comp.compareLeaseContract(entity, entity2);
        expect(leaseContractService.compareLeaseContract).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLeaseModelMetadata', () => {
      it('Should forward to leaseModelMetadataService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(leaseModelMetadataService, 'compareLeaseModelMetadata');
        comp.compareLeaseModelMetadata(entity, entity2);
        expect(leaseModelMetadataService.compareLeaseModelMetadata).toHaveBeenCalledWith(entity, entity2);
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
