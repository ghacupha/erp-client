import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContractMetadataFormService } from './contract-metadata-form.service';
import { ContractMetadataService } from '../service/contract-metadata.service';
import { IContractMetadata } from '../contract-metadata.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

import { ContractMetadataUpdateComponent } from './contract-metadata-update.component';

describe('ContractMetadata Management Update Component', () => {
  let comp: ContractMetadataUpdateComponent;
  let fixture: ComponentFixture<ContractMetadataUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contractMetadataFormService: ContractMetadataFormService;
  let contractMetadataService: ContractMetadataService;
  let dealerService: DealerService;
  let applicationUserService: ApplicationUserService;
  let securityClearanceService: SecurityClearanceService;
  let placeholderService: PlaceholderService;
  let businessDocumentService: BusinessDocumentService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContractMetadataUpdateComponent],
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
      .overrideTemplate(ContractMetadataUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContractMetadataUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contractMetadataFormService = TestBed.inject(ContractMetadataFormService);
    contractMetadataService = TestBed.inject(ContractMetadataService);
    dealerService = TestBed.inject(DealerService);
    applicationUserService = TestBed.inject(ApplicationUserService);
    securityClearanceService = TestBed.inject(SecurityClearanceService);
    placeholderService = TestBed.inject(PlaceholderService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ContractMetadata query and add missing value', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const relatedContracts: IContractMetadata[] = [{ id: 72260 }];
      contractMetadata.relatedContracts = relatedContracts;

      const contractMetadataCollection: IContractMetadata[] = [{ id: 78111 }];
      jest.spyOn(contractMetadataService, 'query').mockReturnValue(of(new HttpResponse({ body: contractMetadataCollection })));
      const additionalContractMetadata = [...relatedContracts];
      const expectedCollection: IContractMetadata[] = [...additionalContractMetadata, ...contractMetadataCollection];
      jest.spyOn(contractMetadataService, 'addContractMetadataToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(contractMetadataService.query).toHaveBeenCalled();
      expect(contractMetadataService.addContractMetadataToCollectionIfMissing).toHaveBeenCalledWith(
        contractMetadataCollection,
        ...additionalContractMetadata.map(expect.objectContaining)
      );
      expect(comp.contractMetadataSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const department: IDealer = { id: 69263 };
      contractMetadata.department = department;
      const contractPartner: IDealer = { id: 43356 };
      contractMetadata.contractPartner = contractPartner;

      const dealerCollection: IDealer[] = [{ id: 5737 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [department, contractPartner];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const responsiblePerson: IApplicationUser = { id: 78737 };
      contractMetadata.responsiblePerson = responsiblePerson;
      const signatories: IApplicationUser[] = [{ id: 73651 }];
      contractMetadata.signatories = signatories;

      const applicationUserCollection: IApplicationUser[] = [{ id: 80062 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [responsiblePerson, ...signatories];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers.map(expect.objectContaining)
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecurityClearance query and add missing value', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const securityClearance: ISecurityClearance = { id: 96472 };
      contractMetadata.securityClearance = securityClearance;

      const securityClearanceCollection: ISecurityClearance[] = [{ id: 43995 }];
      jest.spyOn(securityClearanceService, 'query').mockReturnValue(of(new HttpResponse({ body: securityClearanceCollection })));
      const additionalSecurityClearances = [securityClearance];
      const expectedCollection: ISecurityClearance[] = [...additionalSecurityClearances, ...securityClearanceCollection];
      jest.spyOn(securityClearanceService, 'addSecurityClearanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(securityClearanceService.query).toHaveBeenCalled();
      expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
        securityClearanceCollection,
        ...additionalSecurityClearances.map(expect.objectContaining)
      );
      expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 56582 }];
      contractMetadata.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 72743 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const contractDocumentFiles: IBusinessDocument[] = [{ id: 8473 }];
      contractMetadata.contractDocumentFiles = contractDocumentFiles;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 1239 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...contractDocumentFiles];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const contractMappings: IUniversallyUniqueMapping[] = [{ id: 52979 }];
      contractMetadata.contractMappings = contractMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 54091 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...contractMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const contractMetadata: IContractMetadata = { id: 456 };
      const relatedContracts: IContractMetadata = { id: 36190 };
      contractMetadata.relatedContracts = [relatedContracts];
      const department: IDealer = { id: 30586 };
      contractMetadata.department = department;
      const contractPartner: IDealer = { id: 14250 };
      contractMetadata.contractPartner = contractPartner;
      const responsiblePerson: IApplicationUser = { id: 23138 };
      contractMetadata.responsiblePerson = responsiblePerson;
      const signatory: IApplicationUser = { id: 93456 };
      contractMetadata.signatories = [signatory];
      const securityClearance: ISecurityClearance = { id: 77196 };
      contractMetadata.securityClearance = securityClearance;
      const placeholder: IPlaceholder = { id: 57236 };
      contractMetadata.placeholders = [placeholder];
      const contractDocumentFile: IBusinessDocument = { id: 80794 };
      contractMetadata.contractDocumentFiles = [contractDocumentFile];
      const contractMappings: IUniversallyUniqueMapping = { id: 3275 };
      contractMetadata.contractMappings = [contractMappings];

      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      expect(comp.contractMetadataSharedCollection).toContain(relatedContracts);
      expect(comp.dealersSharedCollection).toContain(department);
      expect(comp.dealersSharedCollection).toContain(contractPartner);
      expect(comp.applicationUsersSharedCollection).toContain(responsiblePerson);
      expect(comp.applicationUsersSharedCollection).toContain(signatory);
      expect(comp.securityClearancesSharedCollection).toContain(securityClearance);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.businessDocumentsSharedCollection).toContain(contractDocumentFile);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(contractMappings);
      expect(comp.contractMetadata).toEqual(contractMetadata);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContractMetadata>>();
      const contractMetadata = { id: 123 };
      jest.spyOn(contractMetadataFormService, 'getContractMetadata').mockReturnValue(contractMetadata);
      jest.spyOn(contractMetadataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contractMetadata }));
      saveSubject.complete();

      // THEN
      expect(contractMetadataFormService.getContractMetadata).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contractMetadataService.update).toHaveBeenCalledWith(expect.objectContaining(contractMetadata));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContractMetadata>>();
      const contractMetadata = { id: 123 };
      jest.spyOn(contractMetadataFormService, 'getContractMetadata').mockReturnValue({ id: null });
      jest.spyOn(contractMetadataService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contractMetadata: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contractMetadata }));
      saveSubject.complete();

      // THEN
      expect(contractMetadataFormService.getContractMetadata).toHaveBeenCalled();
      expect(contractMetadataService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContractMetadata>>();
      const contractMetadata = { id: 123 };
      jest.spyOn(contractMetadataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contractMetadata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contractMetadataService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareContractMetadata', () => {
      it('Should forward to contractMetadataService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(contractMetadataService, 'compareContractMetadata');
        comp.compareContractMetadata(entity, entity2);
        expect(contractMetadataService.compareContractMetadata).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareApplicationUser', () => {
      it('Should forward to applicationUserService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(applicationUserService, 'compareApplicationUser');
        comp.compareApplicationUser(entity, entity2);
        expect(applicationUserService.compareApplicationUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

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

    describe('compareBusinessDocument', () => {
      it('Should forward to businessDocumentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(businessDocumentService, 'compareBusinessDocument');
        comp.compareBusinessDocument(entity, entity2);
        expect(businessDocumentService.compareBusinessDocument).toHaveBeenCalledWith(entity, entity2);
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
