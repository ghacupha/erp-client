import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BusinessDocumentFormService } from './business-document-form.service';
import { BusinessDocumentService } from '../service/business-document.service';
import { IBusinessDocument } from '../business-document.model';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IAlgorithm } from 'app/entities/system/algorithm/algorithm.model';
import { AlgorithmService } from 'app/entities/system/algorithm/service/algorithm.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';

import { BusinessDocumentUpdateComponent } from './business-document-update.component';

describe('BusinessDocument Management Update Component', () => {
  let comp: BusinessDocumentUpdateComponent;
  let fixture: ComponentFixture<BusinessDocumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let businessDocumentFormService: BusinessDocumentFormService;
  let businessDocumentService: BusinessDocumentService;
  let applicationUserService: ApplicationUserService;
  let dealerService: DealerService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let placeholderService: PlaceholderService;
  let algorithmService: AlgorithmService;
  let securityClearanceService: SecurityClearanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BusinessDocumentUpdateComponent],
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
      .overrideTemplate(BusinessDocumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BusinessDocumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    businessDocumentFormService = TestBed.inject(BusinessDocumentFormService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    applicationUserService = TestBed.inject(ApplicationUserService);
    dealerService = TestBed.inject(DealerService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    placeholderService = TestBed.inject(PlaceholderService);
    algorithmService = TestBed.inject(AlgorithmService);
    securityClearanceService = TestBed.inject(SecurityClearanceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ApplicationUser query and add missing value', () => {
      const businessDocument: IBusinessDocument = { id: 456 };
      const createdBy: IApplicationUser = { id: 6701 };
      businessDocument.createdBy = createdBy;
      const lastModifiedBy: IApplicationUser = { id: 67476 };
      businessDocument.lastModifiedBy = lastModifiedBy;

      const applicationUserCollection: IApplicationUser[] = [{ id: 394 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [createdBy, lastModifiedBy];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers.map(expect.objectContaining)
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const businessDocument: IBusinessDocument = { id: 456 };
      const originatingDepartment: IDealer = { id: 24808 };
      businessDocument.originatingDepartment = originatingDepartment;

      const dealerCollection: IDealer[] = [{ id: 74683 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [originatingDepartment];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const businessDocument: IBusinessDocument = { id: 456 };
      const applicationMappings: IUniversallyUniqueMapping[] = [{ id: 27789 }];
      businessDocument.applicationMappings = applicationMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 92595 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...applicationMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const businessDocument: IBusinessDocument = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 77768 }];
      businessDocument.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 54072 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Algorithm query and add missing value', () => {
      const businessDocument: IBusinessDocument = { id: 456 };
      const fileChecksumAlgorithm: IAlgorithm = { id: 84406 };
      businessDocument.fileChecksumAlgorithm = fileChecksumAlgorithm;

      const algorithmCollection: IAlgorithm[] = [{ id: 66206 }];
      jest.spyOn(algorithmService, 'query').mockReturnValue(of(new HttpResponse({ body: algorithmCollection })));
      const additionalAlgorithms = [fileChecksumAlgorithm];
      const expectedCollection: IAlgorithm[] = [...additionalAlgorithms, ...algorithmCollection];
      jest.spyOn(algorithmService, 'addAlgorithmToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      expect(algorithmService.query).toHaveBeenCalled();
      expect(algorithmService.addAlgorithmToCollectionIfMissing).toHaveBeenCalledWith(
        algorithmCollection,
        ...additionalAlgorithms.map(expect.objectContaining)
      );
      expect(comp.algorithmsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecurityClearance query and add missing value', () => {
      const businessDocument: IBusinessDocument = { id: 456 };
      const securityClearance: ISecurityClearance = { id: 58295 };
      businessDocument.securityClearance = securityClearance;

      const securityClearanceCollection: ISecurityClearance[] = [{ id: 20851 }];
      jest.spyOn(securityClearanceService, 'query').mockReturnValue(of(new HttpResponse({ body: securityClearanceCollection })));
      const additionalSecurityClearances = [securityClearance];
      const expectedCollection: ISecurityClearance[] = [...additionalSecurityClearances, ...securityClearanceCollection];
      jest.spyOn(securityClearanceService, 'addSecurityClearanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      expect(securityClearanceService.query).toHaveBeenCalled();
      expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
        securityClearanceCollection,
        ...additionalSecurityClearances.map(expect.objectContaining)
      );
      expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const businessDocument: IBusinessDocument = { id: 456 };
      const createdBy: IApplicationUser = { id: 13811 };
      businessDocument.createdBy = createdBy;
      const lastModifiedBy: IApplicationUser = { id: 41032 };
      businessDocument.lastModifiedBy = lastModifiedBy;
      const originatingDepartment: IDealer = { id: 4612 };
      businessDocument.originatingDepartment = originatingDepartment;
      const applicationMappings: IUniversallyUniqueMapping = { id: 93664 };
      businessDocument.applicationMappings = [applicationMappings];
      const placeholder: IPlaceholder = { id: 51999 };
      businessDocument.placeholders = [placeholder];
      const fileChecksumAlgorithm: IAlgorithm = { id: 65209 };
      businessDocument.fileChecksumAlgorithm = fileChecksumAlgorithm;
      const securityClearance: ISecurityClearance = { id: 95179 };
      businessDocument.securityClearance = securityClearance;

      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      expect(comp.applicationUsersSharedCollection).toContain(createdBy);
      expect(comp.applicationUsersSharedCollection).toContain(lastModifiedBy);
      expect(comp.dealersSharedCollection).toContain(originatingDepartment);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(applicationMappings);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.algorithmsSharedCollection).toContain(fileChecksumAlgorithm);
      expect(comp.securityClearancesSharedCollection).toContain(securityClearance);
      expect(comp.businessDocument).toEqual(businessDocument);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessDocument>>();
      const businessDocument = { id: 123 };
      jest.spyOn(businessDocumentFormService, 'getBusinessDocument').mockReturnValue(businessDocument);
      jest.spyOn(businessDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: businessDocument }));
      saveSubject.complete();

      // THEN
      expect(businessDocumentFormService.getBusinessDocument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(businessDocumentService.update).toHaveBeenCalledWith(expect.objectContaining(businessDocument));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessDocument>>();
      const businessDocument = { id: 123 };
      jest.spyOn(businessDocumentFormService, 'getBusinessDocument').mockReturnValue({ id: null });
      jest.spyOn(businessDocumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessDocument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: businessDocument }));
      saveSubject.complete();

      // THEN
      expect(businessDocumentFormService.getBusinessDocument).toHaveBeenCalled();
      expect(businessDocumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessDocument>>();
      const businessDocument = { id: 123 };
      jest.spyOn(businessDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(businessDocumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareApplicationUser', () => {
      it('Should forward to applicationUserService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(applicationUserService, 'compareApplicationUser');
        comp.compareApplicationUser(entity, entity2);
        expect(applicationUserService.compareApplicationUser).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareAlgorithm', () => {
      it('Should forward to algorithmService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(algorithmService, 'compareAlgorithm');
        comp.compareAlgorithm(entity, entity2);
        expect(algorithmService.compareAlgorithm).toHaveBeenCalledWith(entity, entity2);
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
  });
});
