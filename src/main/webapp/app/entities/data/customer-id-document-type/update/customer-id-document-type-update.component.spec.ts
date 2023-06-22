import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CustomerIDDocumentTypeFormService } from './customer-id-document-type-form.service';
import { CustomerIDDocumentTypeService } from '../service/customer-id-document-type.service';
import { ICustomerIDDocumentType } from '../customer-id-document-type.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { CustomerIDDocumentTypeUpdateComponent } from './customer-id-document-type-update.component';

describe('CustomerIDDocumentType Management Update Component', () => {
  let comp: CustomerIDDocumentTypeUpdateComponent;
  let fixture: ComponentFixture<CustomerIDDocumentTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customerIDDocumentTypeFormService: CustomerIDDocumentTypeFormService;
  let customerIDDocumentTypeService: CustomerIDDocumentTypeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CustomerIDDocumentTypeUpdateComponent],
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
      .overrideTemplate(CustomerIDDocumentTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerIDDocumentTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerIDDocumentTypeFormService = TestBed.inject(CustomerIDDocumentTypeFormService);
    customerIDDocumentTypeService = TestBed.inject(CustomerIDDocumentTypeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const customerIDDocumentType: ICustomerIDDocumentType = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 38323 }];
      customerIDDocumentType.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 65011 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ customerIDDocumentType });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const customerIDDocumentType: ICustomerIDDocumentType = { id: 456 };
      const placeholder: IPlaceholder = { id: 74709 };
      customerIDDocumentType.placeholders = [placeholder];

      activatedRoute.data = of({ customerIDDocumentType });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.customerIDDocumentType).toEqual(customerIDDocumentType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerIDDocumentType>>();
      const customerIDDocumentType = { id: 123 };
      jest.spyOn(customerIDDocumentTypeFormService, 'getCustomerIDDocumentType').mockReturnValue(customerIDDocumentType);
      jest.spyOn(customerIDDocumentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerIDDocumentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerIDDocumentType }));
      saveSubject.complete();

      // THEN
      expect(customerIDDocumentTypeFormService.getCustomerIDDocumentType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customerIDDocumentTypeService.update).toHaveBeenCalledWith(expect.objectContaining(customerIDDocumentType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerIDDocumentType>>();
      const customerIDDocumentType = { id: 123 };
      jest.spyOn(customerIDDocumentTypeFormService, 'getCustomerIDDocumentType').mockReturnValue({ id: null });
      jest.spyOn(customerIDDocumentTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerIDDocumentType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerIDDocumentType }));
      saveSubject.complete();

      // THEN
      expect(customerIDDocumentTypeFormService.getCustomerIDDocumentType).toHaveBeenCalled();
      expect(customerIDDocumentTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerIDDocumentType>>();
      const customerIDDocumentType = { id: 123 };
      jest.spyOn(customerIDDocumentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerIDDocumentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customerIDDocumentTypeService.update).toHaveBeenCalled();
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
