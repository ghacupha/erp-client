import {LoggerTestingModule} from "ngx-logger/testing";

jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentDeleteDialogComponent } from './payment-delete-dialog.component';
import { PaymentService } from '../../../../erp-common/services/payment.service';
import { ErpCommonModule } from '../../../../erp-common/erp-common.module';

describe('Component Tests', () => {
  describe('Payment Management Delete Component', () => {
    let comp: PaymentDeleteDialogComponent;
    let fixture: ComponentFixture<PaymentDeleteDialogComponent>;
    let service: PaymentService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ErpCommonModule, HttpClientTestingModule, LoggerTestingModule],
        declarations: [PaymentDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(PaymentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaymentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PaymentService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
