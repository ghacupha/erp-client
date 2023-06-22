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

import { LeaseContractFormService } from './lease-contract-form.service';
import { LeaseContractService } from '../service/lease-contract.service';
import { ILeaseContract } from '../lease-contract.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';
import { IContractMetadata } from 'app/entities/contract/contract-metadata/contract-metadata.model';
import { ContractMetadataService } from 'app/entities/contract/contract-metadata/service/contract-metadata.service';

import { LeaseContractUpdateComponent } from './lease-contract-update.component';

describe('LeaseContract Management Update Component', () => {
  let comp: LeaseContractUpdateComponent;
  let fixture: ComponentFixture<LeaseContractUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let leaseContractFormService: LeaseContractFormService;
  let leaseContractService: LeaseContractService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let businessDocumentService: BusinessDocumentService;
  let contractMetadataService: ContractMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LeaseContractUpdateComponent],
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
      .overrideTemplate(LeaseContractUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LeaseContractUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    leaseContractFormService = TestBed.inject(LeaseContractFormService);
    leaseContractService = TestBed.inject(LeaseContractService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    contractMetadataService = TestBed.inject(ContractMetadataService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const leaseContract: ILeaseContract = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 21817 }];
      leaseContract.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 93480 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseContract });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const leaseContract: ILeaseContract = { id: 456 };
      const systemMappings: IUniversallyUniqueMapping[] = [{ id: 2255 }];
      leaseContract.systemMappings = systemMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 36580 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...systemMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseContract });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const leaseContract: ILeaseContract = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 86894 }];
      leaseContract.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 458 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseContract });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ContractMetadata query and add missing value', () => {
      const leaseContract: ILeaseContract = { id: 456 };
      const contractMetadata: IContractMetadata[] = [{ id: 39636 }];
      leaseContract.contractMetadata = contractMetadata;

      const contractMetadataCollection: IContractMetadata[] = [{ id: 54793 }];
      jest.spyOn(contractMetadataService, 'query').mockReturnValue(of(new HttpResponse({ body: contractMetadataCollection })));
      const additionalContractMetadata = [...contractMetadata];
      const expectedCollection: IContractMetadata[] = [...additionalContractMetadata, ...contractMetadataCollection];
      jest.spyOn(contractMetadataService, 'addContractMetadataToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseContract });
      comp.ngOnInit();

      expect(contractMetadataService.query).toHaveBeenCalled();
      expect(contractMetadataService.addContractMetadataToCollectionIfMissing).toHaveBeenCalledWith(
        contractMetadataCollection,
        ...additionalContractMetadata.map(expect.objectContaining)
      );
      expect(comp.contractMetadataSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const leaseContract: ILeaseContract = { id: 456 };
      const placeholder: IPlaceholder = { id: 15816 };
      leaseContract.placeholders = [placeholder];
      const systemMappings: IUniversallyUniqueMapping = { id: 67014 };
      leaseContract.systemMappings = [systemMappings];
      const businessDocument: IBusinessDocument = { id: 2113 };
      leaseContract.businessDocuments = [businessDocument];
      const contractMetadata: IContractMetadata = { id: 32904 };
      leaseContract.contractMetadata = [contractMetadata];

      activatedRoute.data = of({ leaseContract });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(systemMappings);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.contractMetadataSharedCollection).toContain(contractMetadata);
      expect(comp.leaseContract).toEqual(leaseContract);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseContract>>();
      const leaseContract = { id: 123 };
      jest.spyOn(leaseContractFormService, 'getLeaseContract').mockReturnValue(leaseContract);
      jest.spyOn(leaseContractService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseContract });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaseContract }));
      saveSubject.complete();

      // THEN
      expect(leaseContractFormService.getLeaseContract).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(leaseContractService.update).toHaveBeenCalledWith(expect.objectContaining(leaseContract));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseContract>>();
      const leaseContract = { id: 123 };
      jest.spyOn(leaseContractFormService, 'getLeaseContract').mockReturnValue({ id: null });
      jest.spyOn(leaseContractService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseContract: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaseContract }));
      saveSubject.complete();

      // THEN
      expect(leaseContractFormService.getLeaseContract).toHaveBeenCalled();
      expect(leaseContractService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseContract>>();
      const leaseContract = { id: 123 };
      jest.spyOn(leaseContractService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseContract });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(leaseContractService.update).toHaveBeenCalled();
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

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBusinessDocument', () => {
      it('Should forward to businessDocumentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(businessDocumentService, 'compareBusinessDocument');
        comp.compareBusinessDocument(entity, entity2);
        expect(businessDocumentService.compareBusinessDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareContractMetadata', () => {
      it('Should forward to contractMetadataService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(contractMetadataService, 'compareContractMetadata');
        comp.compareContractMetadata(entity, entity2);
        expect(contractMetadataService.compareContractMetadata).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
