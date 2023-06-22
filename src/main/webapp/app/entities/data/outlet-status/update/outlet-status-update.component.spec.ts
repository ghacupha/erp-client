import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OutletStatusFormService } from './outlet-status-form.service';
import { OutletStatusService } from '../service/outlet-status.service';
import { IOutletStatus } from '../outlet-status.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { OutletStatusUpdateComponent } from './outlet-status-update.component';

describe('OutletStatus Management Update Component', () => {
  let comp: OutletStatusUpdateComponent;
  let fixture: ComponentFixture<OutletStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let outletStatusFormService: OutletStatusFormService;
  let outletStatusService: OutletStatusService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OutletStatusUpdateComponent],
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
      .overrideTemplate(OutletStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OutletStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    outletStatusFormService = TestBed.inject(OutletStatusFormService);
    outletStatusService = TestBed.inject(OutletStatusService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const outletStatus: IOutletStatus = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 55404 }];
      outletStatus.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 92627 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ outletStatus });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const outletStatus: IOutletStatus = { id: 456 };
      const placeholder: IPlaceholder = { id: 90519 };
      outletStatus.placeholders = [placeholder];

      activatedRoute.data = of({ outletStatus });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.outletStatus).toEqual(outletStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOutletStatus>>();
      const outletStatus = { id: 123 };
      jest.spyOn(outletStatusFormService, 'getOutletStatus').mockReturnValue(outletStatus);
      jest.spyOn(outletStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outletStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: outletStatus }));
      saveSubject.complete();

      // THEN
      expect(outletStatusFormService.getOutletStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(outletStatusService.update).toHaveBeenCalledWith(expect.objectContaining(outletStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOutletStatus>>();
      const outletStatus = { id: 123 };
      jest.spyOn(outletStatusFormService, 'getOutletStatus').mockReturnValue({ id: null });
      jest.spyOn(outletStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outletStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: outletStatus }));
      saveSubject.complete();

      // THEN
      expect(outletStatusFormService.getOutletStatus).toHaveBeenCalled();
      expect(outletStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOutletStatus>>();
      const outletStatus = { id: 123 };
      jest.spyOn(outletStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outletStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(outletStatusService.update).toHaveBeenCalled();
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
  });
});
