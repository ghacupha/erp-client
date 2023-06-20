jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ExcelReportExportService } from '../service/excel-report-export.service';

import { ExcelReportExportDeleteDialogComponent } from './excel-report-export-delete-dialog.component';

describe('ExcelReportExport Management Delete Component', () => {
  let comp: ExcelReportExportDeleteDialogComponent;
  let fixture: ComponentFixture<ExcelReportExportDeleteDialogComponent>;
  let service: ExcelReportExportService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ExcelReportExportDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(ExcelReportExportDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ExcelReportExportDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ExcelReportExportService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

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
