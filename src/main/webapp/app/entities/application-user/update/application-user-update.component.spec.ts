import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ApplicationUserFormService } from './application-user-form.service';
import { ApplicationUserService } from '../service/application-user.service';
import { IApplicationUser } from '../application-user.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/security-clearance/service/security-clearance.service';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';

import { ApplicationUserUpdateComponent } from './application-user-update.component';

describe('ApplicationUser Management Update Component', () => {
  let comp: ApplicationUserUpdateComponent;
  let fixture: ComponentFixture<ApplicationUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let applicationUserFormService: ApplicationUserFormService;
  let applicationUserService: ApplicationUserService;
  let dealerService: DealerService;
  let securityClearanceService: SecurityClearanceService;
  let userService: UserService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ApplicationUserUpdateComponent],
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
      .overrideTemplate(ApplicationUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApplicationUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    applicationUserFormService = TestBed.inject(ApplicationUserFormService);
    applicationUserService = TestBed.inject(ApplicationUserService);
    dealerService = TestBed.inject(DealerService);
    securityClearanceService = TestBed.inject(SecurityClearanceService);
    userService = TestBed.inject(UserService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dealer query and add missing value', () => {
      const applicationUser: IApplicationUser = { id: 456 };
      const organization: IDealer = { id: 62911 };
      applicationUser.organization = organization;
      const department: IDealer = { id: 35885 };
      applicationUser.department = department;
      const dealerIdentity: IDealer = { id: 31654 };
      applicationUser.dealerIdentity = dealerIdentity;

      const dealerCollection: IDealer[] = [{ id: 63512 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [organization, department, dealerIdentity];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ applicationUser });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecurityClearance query and add missing value', () => {
      const applicationUser: IApplicationUser = { id: 456 };
      const securityClearance: ISecurityClearance = { id: 41242 };
      applicationUser.securityClearance = securityClearance;

      const securityClearanceCollection: ISecurityClearance[] = [{ id: 71640 }];
      jest.spyOn(securityClearanceService, 'query').mockReturnValue(of(new HttpResponse({ body: securityClearanceCollection })));
      const additionalSecurityClearances = [securityClearance];
      const expectedCollection: ISecurityClearance[] = [...additionalSecurityClearances, ...securityClearanceCollection];
      jest.spyOn(securityClearanceService, 'addSecurityClearanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ applicationUser });
      comp.ngOnInit();

      expect(securityClearanceService.query).toHaveBeenCalled();
      expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
        securityClearanceCollection,
        ...additionalSecurityClearances.map(expect.objectContaining)
      );
      expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const applicationUser: IApplicationUser = { id: 456 };
      const systemIdentity: IUser = { id: 32396 };
      applicationUser.systemIdentity = systemIdentity;

      const userCollection: IUser[] = [{ id: 67663 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [systemIdentity];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ applicationUser });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const applicationUser: IApplicationUser = { id: 456 };
      const userProperties: IUniversallyUniqueMapping[] = [{ id: 74931 }];
      applicationUser.userProperties = userProperties;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 8474 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...userProperties];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ applicationUser });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const applicationUser: IApplicationUser = { id: 456 };
      const organization: IDealer = { id: 88934 };
      applicationUser.organization = organization;
      const department: IDealer = { id: 84852 };
      applicationUser.department = department;
      const dealerIdentity: IDealer = { id: 94839 };
      applicationUser.dealerIdentity = dealerIdentity;
      const securityClearance: ISecurityClearance = { id: 20873 };
      applicationUser.securityClearance = securityClearance;
      const systemIdentity: IUser = { id: 45793 };
      applicationUser.systemIdentity = systemIdentity;
      const userProperties: IUniversallyUniqueMapping = { id: 40371 };
      applicationUser.userProperties = [userProperties];

      activatedRoute.data = of({ applicationUser });
      comp.ngOnInit();

      expect(comp.dealersSharedCollection).toContain(organization);
      expect(comp.dealersSharedCollection).toContain(department);
      expect(comp.dealersSharedCollection).toContain(dealerIdentity);
      expect(comp.securityClearancesSharedCollection).toContain(securityClearance);
      expect(comp.usersSharedCollection).toContain(systemIdentity);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(userProperties);
      expect(comp.applicationUser).toEqual(applicationUser);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApplicationUser>>();
      const applicationUser = { id: 123 };
      jest.spyOn(applicationUserFormService, 'getApplicationUser').mockReturnValue(applicationUser);
      jest.spyOn(applicationUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ applicationUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: applicationUser }));
      saveSubject.complete();

      // THEN
      expect(applicationUserFormService.getApplicationUser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(applicationUserService.update).toHaveBeenCalledWith(expect.objectContaining(applicationUser));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApplicationUser>>();
      const applicationUser = { id: 123 };
      jest.spyOn(applicationUserFormService, 'getApplicationUser').mockReturnValue({ id: null });
      jest.spyOn(applicationUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ applicationUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: applicationUser }));
      saveSubject.complete();

      // THEN
      expect(applicationUserFormService.getApplicationUser).toHaveBeenCalled();
      expect(applicationUserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApplicationUser>>();
      const applicationUser = { id: 123 };
      jest.spyOn(applicationUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ applicationUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(applicationUserService.update).toHaveBeenCalled();
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

    describe('compareSecurityClearance', () => {
      it('Should forward to securityClearanceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(securityClearanceService, 'compareSecurityClearance');
        comp.compareSecurityClearance(entity, entity2);
        expect(securityClearanceService.compareSecurityClearance).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
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
