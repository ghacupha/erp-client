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

import { ILeaseLiability } from '../../lease-liability/lease-liability.model';

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LeasePaymentService } from '../service/lease-payment.service';
import { ILeasePayment, LeasePayment } from '../lease-payment.model';

import { LeasePaymentUpdateComponent } from './lease-payment-update.component';
import { LeaseLiabilityService } from '../../lease-liability/service/lease-liability.service';

describe('LeasePayment Management Update Component', () => {
  let comp: LeasePaymentUpdateComponent;
  let fixture: ComponentFixture<LeasePaymentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let leasePaymentService: LeasePaymentService;
  let leaseLiabilityService: LeaseLiabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LeasePaymentUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(LeasePaymentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LeasePaymentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    leasePaymentService = TestBed.inject(LeasePaymentService);
    leaseLiabilityService = TestBed.inject(LeaseLiabilityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call LeaseLiability query and add missing value', () => {
      const leasePayment: ILeasePayment = { id: 456 };
      const leaseLiability: ILeaseLiability = { id: 44093 };
      leasePayment.leaseLiability = leaseLiability;

      const leaseLiabilityCollection: ILeaseLiability[] = [{ id: 74496 }];
      jest.spyOn(leaseLiabilityService, 'query').mockReturnValue(of(new HttpResponse({ body: leaseLiabilityCollection })));
      const additionalLeaseLiabilities = [leaseLiability];
      const expectedCollection: ILeaseLiability[] = [...additionalLeaseLiabilities, ...leaseLiabilityCollection];
      jest.spyOn(leaseLiabilityService, 'addLeaseLiabilityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ leasePayment });
      comp.ngOnInit();

      expect(leaseLiabilityService.query).toHaveBeenCalled();
      expect(leaseLiabilityService.addLeaseLiabilityToCollectionIfMissing).toHaveBeenCalledWith(
        leaseLiabilityCollection,
        ...additionalLeaseLiabilities
      );
      expect(comp.leaseLiabilitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const leasePayment: ILeasePayment = { id: 456 };
      const leaseLiability: ILeaseLiability = { id: 56735 };
      leasePayment.leaseLiability = leaseLiability;

      activatedRoute.data = of({ leasePayment });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(leasePayment));
      expect(comp.leaseLiabilitiesSharedCollection).toContain(leaseLiability);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LeasePayment>>();
      const leasePayment = { id: 123 };
      jest.spyOn(leasePaymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leasePayment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leasePayment }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(leasePaymentService.update).toHaveBeenCalledWith(leasePayment);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LeasePayment>>();
      const leasePayment = new LeasePayment();
      jest.spyOn(leasePaymentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leasePayment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leasePayment }));
      saveSubject.complete();

      // THEN
      expect(leasePaymentService.create).toHaveBeenCalledWith(leasePayment);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LeasePayment>>();
      const leasePayment = { id: 123 };
      jest.spyOn(leasePaymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leasePayment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(leasePaymentService.update).toHaveBeenCalledWith(leasePayment);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackLeaseLiabilityById', () => {
      it('Should return tracked LeaseLiability primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLeaseLiabilityById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
