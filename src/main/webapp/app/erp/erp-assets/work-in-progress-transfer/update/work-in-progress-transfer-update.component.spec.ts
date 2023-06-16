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

import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';
import { IWorkInProgressTransfer, WorkInProgressTransfer } from '../work-in-progress-transfer.model';
import { IWorkInProgressRegistration } from 'app/erp/erp-assets/work-in-progress-registration/work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from 'app/erp/erp-assets/work-in-progress-registration/service/work-in-progress-registration.service';

import { WorkInProgressTransferUpdateComponent } from './work-in-progress-transfer-update.component';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';

describe('WorkInProgressTransfer Management Update Component', () => {
  let comp: WorkInProgressTransferUpdateComponent;
  let fixture: ComponentFixture<WorkInProgressTransferUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workInProgressTransferService: WorkInProgressTransferService;
  let workInProgressRegistrationService: WorkInProgressRegistrationService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WorkInProgressTransferUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(WorkInProgressTransferUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkInProgressTransferUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workInProgressTransferService = TestBed.inject(WorkInProgressTransferService);
    workInProgressRegistrationService = TestBed.inject(WorkInProgressRegistrationService);
    placeholderService = TestBed.inject(PlaceholderService);

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
        ...additionalWorkInProgressRegistrations
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
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const workInProgressTransfer: IWorkInProgressTransfer = { id: 456 };
      const workInProgressRegistrations: IWorkInProgressRegistration = { id: 88361 };
      workInProgressTransfer.workInProgressRegistrations = [workInProgressRegistrations];
      const placeholders: IPlaceholder = { id: 49392 };
      workInProgressTransfer.placeholders = [placeholders];

      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(workInProgressTransfer));
      expect(comp.workInProgressRegistrationsSharedCollection).toContain(workInProgressRegistrations);
      expect(comp.placeholdersSharedCollection).toContain(placeholders);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkInProgressTransfer>>();
      const workInProgressTransfer = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(workInProgressTransferService.update).toHaveBeenCalledWith(workInProgressTransfer);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkInProgressTransfer>>();
      const workInProgressTransfer = new WorkInProgressTransfer();
      jest.spyOn(workInProgressTransferService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressTransfer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workInProgressTransfer }));
      saveSubject.complete();

      // THEN
      expect(workInProgressTransferService.create).toHaveBeenCalledWith(workInProgressTransfer);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkInProgressTransfer>>();
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
      expect(workInProgressTransferService.update).toHaveBeenCalledWith(workInProgressTransfer);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackWorkInProgressRegistrationById', () => {
      it('Should return tracked WorkInProgressRegistration primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackWorkInProgressRegistrationById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPlaceholderById', () => {
      it('Should return tracked Placeholder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlaceholderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedWorkInProgressRegistration', () => {
      it('Should return option if no WorkInProgressRegistration is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedWorkInProgressRegistration(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected WorkInProgressRegistration for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedWorkInProgressRegistration(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this WorkInProgressRegistration is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedWorkInProgressRegistration(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

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
  });
});
