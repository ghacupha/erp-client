import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LeaseModelMetadataFormService } from './lease-model-metadata-form.service';
import { LeaseModelMetadataService } from '../service/lease-model-metadata.service';
import { ILeaseModelMetadata } from '../lease-model-metadata.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { ILeaseContract } from 'app/entities/lease-contract/lease-contract.model';
import { LeaseContractService } from 'app/entities/lease-contract/service/lease-contract.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/security-clearance/service/security-clearance.service';
import { ITransactionAccount } from 'app/entities/transaction-account/transaction-account.model';
import { TransactionAccountService } from 'app/entities/transaction-account/service/transaction-account.service';

import { LeaseModelMetadataUpdateComponent } from './lease-model-metadata-update.component';

describe('LeaseModelMetadata Management Update Component', () => {
  let comp: LeaseModelMetadataUpdateComponent;
  let fixture: ComponentFixture<LeaseModelMetadataUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let leaseModelMetadataFormService: LeaseModelMetadataFormService;
  let leaseModelMetadataService: LeaseModelMetadataService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let leaseContractService: LeaseContractService;
  let settlementCurrencyService: SettlementCurrencyService;
  let businessDocumentService: BusinessDocumentService;
  let securityClearanceService: SecurityClearanceService;
  let transactionAccountService: TransactionAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LeaseModelMetadataUpdateComponent],
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
      .overrideTemplate(LeaseModelMetadataUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LeaseModelMetadataUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    leaseModelMetadataFormService = TestBed.inject(LeaseModelMetadataFormService);
    leaseModelMetadataService = TestBed.inject(LeaseModelMetadataService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    leaseContractService = TestBed.inject(LeaseContractService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    securityClearanceService = TestBed.inject(SecurityClearanceService);
    transactionAccountService = TestBed.inject(TransactionAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 7718 }];
      leaseModelMetadata.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 48170 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const leaseMappings: IUniversallyUniqueMapping[] = [{ id: 94935 }];
      leaseModelMetadata.leaseMappings = leaseMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 27733 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...leaseMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LeaseContract query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const leaseContract: ILeaseContract = { id: 95223 };
      leaseModelMetadata.leaseContract = leaseContract;

      const leaseContractCollection: ILeaseContract[] = [{ id: 37422 }];
      jest.spyOn(leaseContractService, 'query').mockReturnValue(of(new HttpResponse({ body: leaseContractCollection })));
      const additionalLeaseContracts = [leaseContract];
      const expectedCollection: ILeaseContract[] = [...additionalLeaseContracts, ...leaseContractCollection];
      jest.spyOn(leaseContractService, 'addLeaseContractToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(leaseContractService.query).toHaveBeenCalled();
      expect(leaseContractService.addLeaseContractToCollectionIfMissing).toHaveBeenCalledWith(
        leaseContractCollection,
        ...additionalLeaseContracts.map(expect.objectContaining)
      );
      expect(comp.leaseContractsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LeaseModelMetadata query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const predecessor: ILeaseModelMetadata = { id: 8236 };
      leaseModelMetadata.predecessor = predecessor;

      const leaseModelMetadataCollection: ILeaseModelMetadata[] = [{ id: 96347 }];
      jest.spyOn(leaseModelMetadataService, 'query').mockReturnValue(of(new HttpResponse({ body: leaseModelMetadataCollection })));
      const additionalLeaseModelMetadata = [predecessor];
      const expectedCollection: ILeaseModelMetadata[] = [...additionalLeaseModelMetadata, ...leaseModelMetadataCollection];
      jest.spyOn(leaseModelMetadataService, 'addLeaseModelMetadataToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(leaseModelMetadataService.query).toHaveBeenCalled();
      expect(leaseModelMetadataService.addLeaseModelMetadataToCollectionIfMissing).toHaveBeenCalledWith(
        leaseModelMetadataCollection,
        ...additionalLeaseModelMetadata.map(expect.objectContaining)
      );
      expect(comp.leaseModelMetadataSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const liabilityCurrency: ISettlementCurrency = { id: 81770 };
      leaseModelMetadata.liabilityCurrency = liabilityCurrency;
      const rouAssetCurrency: ISettlementCurrency = { id: 60581 };
      leaseModelMetadata.rouAssetCurrency = rouAssetCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 38837 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [liabilityCurrency, rouAssetCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const modelAttachments: IBusinessDocument = { id: 99346 };
      leaseModelMetadata.modelAttachments = modelAttachments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 79350 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [modelAttachments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecurityClearance query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const securityClearance: ISecurityClearance = { id: 6844 };
      leaseModelMetadata.securityClearance = securityClearance;

      const securityClearanceCollection: ISecurityClearance[] = [{ id: 54162 }];
      jest.spyOn(securityClearanceService, 'query').mockReturnValue(of(new HttpResponse({ body: securityClearanceCollection })));
      const additionalSecurityClearances = [securityClearance];
      const expectedCollection: ISecurityClearance[] = [...additionalSecurityClearances, ...securityClearanceCollection];
      jest.spyOn(securityClearanceService, 'addSecurityClearanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(securityClearanceService.query).toHaveBeenCalled();
      expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
        securityClearanceCollection,
        ...additionalSecurityClearances.map(expect.objectContaining)
      );
      expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionAccount query and add missing value', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const leaseLiabilityAccount: ITransactionAccount = { id: 86266 };
      leaseModelMetadata.leaseLiabilityAccount = leaseLiabilityAccount;
      const interestPayableAccount: ITransactionAccount = { id: 10419 };
      leaseModelMetadata.interestPayableAccount = interestPayableAccount;
      const interestExpenseAccount: ITransactionAccount = { id: 59442 };
      leaseModelMetadata.interestExpenseAccount = interestExpenseAccount;
      const rouAssetAccount: ITransactionAccount = { id: 36757 };
      leaseModelMetadata.rouAssetAccount = rouAssetAccount;
      const rouDepreciationAccount: ITransactionAccount = { id: 32893 };
      leaseModelMetadata.rouDepreciationAccount = rouDepreciationAccount;
      const accruedDepreciationAccount: ITransactionAccount = { id: 91478 };
      leaseModelMetadata.accruedDepreciationAccount = accruedDepreciationAccount;

      const transactionAccountCollection: ITransactionAccount[] = [{ id: 38893 }];
      jest.spyOn(transactionAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionAccountCollection })));
      const additionalTransactionAccounts = [
        leaseLiabilityAccount,
        interestPayableAccount,
        interestExpenseAccount,
        rouAssetAccount,
        rouDepreciationAccount,
        accruedDepreciationAccount,
      ];
      const expectedCollection: ITransactionAccount[] = [...additionalTransactionAccounts, ...transactionAccountCollection];
      jest.spyOn(transactionAccountService, 'addTransactionAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(transactionAccountService.query).toHaveBeenCalled();
      expect(transactionAccountService.addTransactionAccountToCollectionIfMissing).toHaveBeenCalledWith(
        transactionAccountCollection,
        ...additionalTransactionAccounts.map(expect.objectContaining)
      );
      expect(comp.transactionAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const leaseModelMetadata: ILeaseModelMetadata = { id: 456 };
      const placeholder: IPlaceholder = { id: 62706 };
      leaseModelMetadata.placeholders = [placeholder];
      const leaseMapping: IUniversallyUniqueMapping = { id: 52084 };
      leaseModelMetadata.leaseMappings = [leaseMapping];
      const leaseContract: ILeaseContract = { id: 44132 };
      leaseModelMetadata.leaseContract = leaseContract;
      const predecessor: ILeaseModelMetadata = { id: 75245 };
      leaseModelMetadata.predecessor = predecessor;
      const liabilityCurrency: ISettlementCurrency = { id: 53609 };
      leaseModelMetadata.liabilityCurrency = liabilityCurrency;
      const rouAssetCurrency: ISettlementCurrency = { id: 34519 };
      leaseModelMetadata.rouAssetCurrency = rouAssetCurrency;
      const modelAttachments: IBusinessDocument = { id: 7360 };
      leaseModelMetadata.modelAttachments = modelAttachments;
      const securityClearance: ISecurityClearance = { id: 95339 };
      leaseModelMetadata.securityClearance = securityClearance;
      const leaseLiabilityAccount: ITransactionAccount = { id: 38026 };
      leaseModelMetadata.leaseLiabilityAccount = leaseLiabilityAccount;
      const interestPayableAccount: ITransactionAccount = { id: 67813 };
      leaseModelMetadata.interestPayableAccount = interestPayableAccount;
      const interestExpenseAccount: ITransactionAccount = { id: 35990 };
      leaseModelMetadata.interestExpenseAccount = interestExpenseAccount;
      const rouAssetAccount: ITransactionAccount = { id: 54688 };
      leaseModelMetadata.rouAssetAccount = rouAssetAccount;
      const rouDepreciationAccount: ITransactionAccount = { id: 19365 };
      leaseModelMetadata.rouDepreciationAccount = rouDepreciationAccount;
      const accruedDepreciationAccount: ITransactionAccount = { id: 21954 };
      leaseModelMetadata.accruedDepreciationAccount = accruedDepreciationAccount;

      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(leaseMapping);
      expect(comp.leaseContractsSharedCollection).toContain(leaseContract);
      expect(comp.leaseModelMetadataSharedCollection).toContain(predecessor);
      expect(comp.settlementCurrenciesSharedCollection).toContain(liabilityCurrency);
      expect(comp.settlementCurrenciesSharedCollection).toContain(rouAssetCurrency);
      expect(comp.businessDocumentsSharedCollection).toContain(modelAttachments);
      expect(comp.securityClearancesSharedCollection).toContain(securityClearance);
      expect(comp.transactionAccountsSharedCollection).toContain(leaseLiabilityAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(interestPayableAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(interestExpenseAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(rouAssetAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(rouDepreciationAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(accruedDepreciationAccount);
      expect(comp.leaseModelMetadata).toEqual(leaseModelMetadata);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseModelMetadata>>();
      const leaseModelMetadata = { id: 123 };
      jest.spyOn(leaseModelMetadataFormService, 'getLeaseModelMetadata').mockReturnValue(leaseModelMetadata);
      jest.spyOn(leaseModelMetadataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaseModelMetadata }));
      saveSubject.complete();

      // THEN
      expect(leaseModelMetadataFormService.getLeaseModelMetadata).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(leaseModelMetadataService.update).toHaveBeenCalledWith(expect.objectContaining(leaseModelMetadata));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseModelMetadata>>();
      const leaseModelMetadata = { id: 123 };
      jest.spyOn(leaseModelMetadataFormService, 'getLeaseModelMetadata').mockReturnValue({ id: null });
      jest.spyOn(leaseModelMetadataService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseModelMetadata: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaseModelMetadata }));
      saveSubject.complete();

      // THEN
      expect(leaseModelMetadataFormService.getLeaseModelMetadata).toHaveBeenCalled();
      expect(leaseModelMetadataService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaseModelMetadata>>();
      const leaseModelMetadata = { id: 123 };
      jest.spyOn(leaseModelMetadataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaseModelMetadata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(leaseModelMetadataService.update).toHaveBeenCalled();
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

    describe('compareSettlementCurrency', () => {
      it('Should forward to settlementCurrencyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(settlementCurrencyService, 'compareSettlementCurrency');
        comp.compareSettlementCurrency(entity, entity2);
        expect(settlementCurrencyService.compareSettlementCurrency).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareSecurityClearance', () => {
      it('Should forward to securityClearanceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(securityClearanceService, 'compareSecurityClearance');
        comp.compareSecurityClearance(entity, entity2);
        expect(securityClearanceService.compareSecurityClearance).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTransactionAccount', () => {
      it('Should forward to transactionAccountService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transactionAccountService, 'compareTransactionAccount');
        comp.compareTransactionAccount(entity, entity2);
        expect(transactionAccountService.compareTransactionAccount).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
