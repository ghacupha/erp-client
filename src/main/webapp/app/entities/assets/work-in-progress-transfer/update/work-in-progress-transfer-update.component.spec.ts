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

import { WorkInProgressTransferFormService } from './work-in-progress-transfer-form.service';
import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';
import { IWorkInProgressTransfer } from '../work-in-progress-transfer.model';
import { IWorkInProgressRegistration } from 'app/entities/assets/work-in-progress-registration/work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from 'app/entities/assets/work-in-progress-registration/service/work-in-progress-registration.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

import { WorkInProgressTransferUpdateComponent } from './work-in-progress-transfer-update.component';

describe('WorkInProgressTransfer Management Update Component', () => {
  let comp: WorkInProgressTransferUpdateComponent;
  let fixture: ComponentFixture<WorkInProgressTransferUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workInProgressTransferFormService: WorkInProgressTransferFormService;
  let workInProgressTransferService: WorkInProgressTransferService;
  let workInProgressRegistrationService: WorkInProgressRegistrationService;
  let placeholderService: PlaceholderService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WorkInProgressTransferUpdateComponent],
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
      .overrideTemplate(WorkInProgressTransferUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkInProgressTransferUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workInProgressTransferFormService = TestBed.inject(WorkInProgressTransferFormService);
    workInProgressTransferService = TestBed.inject(WorkInProgressTransferService);
    workInProgressRegistrationService = TestBed.inject(WorkInProgressRegistrationService);
    placeholderService = TestBed.inject(PlaceholderService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call WorkInProgressRegistration query and add missing value', () => {
      const workInProgressTransfer: IWorkInProgressTransfer = { id: 456 };
      const workInProgressRegistrations: IWorkInProgressRegistration[] = [{ id: 39483 }];
      workInProgressTransfer.workInProgressRegistrations = workInProgressRegistrations;

      const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [{ id: 62496 }];
      jest
        .spyOn(workInProgressRegistrationService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: workInProgressRegistrationCollection })));
      const additionalWorkInProgressRegistrations = [...workInProgressRegistrations];
      const expectedCollection: IWorkInProgressRegistration[] = [
        ...additionalWorkInProgressRegistrations,
        ...workInProgressRegistrationCollection,
      ];
      jest
        .spyOn(workInProgressRegistrationService, 'addWorkInProgressRegistrationToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      expect(workInProgressRegistrationService.query).toHaveBeenCalled();
      expect(workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing).toHaveBeenCalledWith(
        workInProgressRegistrationCollection,
        ...additionalWorkInProgressRegistrations.map(expect.objectContaining)
      );
      expect(comp.workInProgressRegistrationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const workInProgressTransfer: IWorkInProgressTransfer = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 31211 }];
      workInProgressTransfer.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 13607 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const workInProgressTransfer: IWorkInProgressTransfer = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 60992 }];
      workInProgressTransfer.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 76661 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const workInProgressTransfer: IWorkInProgressTransfer = { id: 456 };
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 88361 };
      workInProgressTransfer.workInProgressRegistrations = [workInProgressRegistration];
      const placeholder: IPlaceholder = { id: 49392 };
      workInProgressTransfer.placeholders = [placeholder];
      const businessDocument: IBusinessDocument = { id: 93819 };
      workInProgressTransfer.businessDocuments = [businessDocument];

      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      expect(comp.workInProgressRegistrationsSharedCollection).toContain(workInProgressRegistration);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.workInProgressTransfer).toEqual(workInProgressTransfer);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkInProgressTransfer>>();
      const workInProgressTransfer = { id: 123 };
      jest.spyOn(workInProgressTransferFormService, 'getWorkInProgressTransfer').mockReturnValue(workInProgressTransfer);
      jest.spyOn(workInProgressTransferService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workInProgressTransfer }));
      saveSubject.complete();

      // THEN
      expect(workInProgressTransferFormService.getWorkInProgressTransfer).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workInProgressTransferService.update).toHaveBeenCalledWith(expect.objectContaining(workInProgressTransfer));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkInProgressTransfer>>();
      const workInProgressTransfer = { id: 123 };
      jest.spyOn(workInProgressTransferFormService, 'getWorkInProgressTransfer').mockReturnValue({ id: null });
      jest.spyOn(workInProgressTransferService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressTransfer: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workInProgressTransfer }));
      saveSubject.complete();

      // THEN
      expect(workInProgressTransferFormService.getWorkInProgressTransfer).toHaveBeenCalled();
      expect(workInProgressTransferService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkInProgressTransfer>>();
      const workInProgressTransfer = { id: 123 };
      jest.spyOn(workInProgressTransferService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workInProgressTransferService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareWorkInProgressRegistration', () => {
      it('Should forward to workInProgressRegistrationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(workInProgressRegistrationService, 'compareWorkInProgressRegistration');
        comp.compareWorkInProgressRegistration(entity, entity2);
        expect(workInProgressRegistrationService.compareWorkInProgressRegistration).toHaveBeenCalledWith(entity, entity2);
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
  });
});
