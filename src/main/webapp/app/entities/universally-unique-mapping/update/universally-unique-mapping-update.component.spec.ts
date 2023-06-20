import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UniversallyUniqueMappingFormService } from './universally-unique-mapping-form.service';
import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';
import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';

import { UniversallyUniqueMappingUpdateComponent } from './universally-unique-mapping-update.component';

describe('UniversallyUniqueMapping Management Update Component', () => {
  let comp: UniversallyUniqueMappingUpdateComponent;
  let fixture: ComponentFixture<UniversallyUniqueMappingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let universallyUniqueMappingFormService: UniversallyUniqueMappingFormService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UniversallyUniqueMappingUpdateComponent],
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
      .overrideTemplate(UniversallyUniqueMappingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UniversallyUniqueMappingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    universallyUniqueMappingFormService = TestBed.inject(UniversallyUniqueMappingFormService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 456 };

      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      expect(comp.universallyUniqueMapping).toEqual(universallyUniqueMapping);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniversallyUniqueMapping>>();
      const universallyUniqueMapping = { id: 123 };
      jest.spyOn(universallyUniqueMappingFormService, 'getUniversallyUniqueMapping').mockReturnValue(universallyUniqueMapping);
      jest.spyOn(universallyUniqueMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: universallyUniqueMapping }));
      saveSubject.complete();

      // THEN
      expect(universallyUniqueMappingFormService.getUniversallyUniqueMapping).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(universallyUniqueMappingService.update).toHaveBeenCalledWith(expect.objectContaining(universallyUniqueMapping));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniversallyUniqueMapping>>();
      const universallyUniqueMapping = { id: 123 };
      jest.spyOn(universallyUniqueMappingFormService, 'getUniversallyUniqueMapping').mockReturnValue({ id: null });
      jest.spyOn(universallyUniqueMappingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ universallyUniqueMapping: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: universallyUniqueMapping }));
      saveSubject.complete();

      // THEN
      expect(universallyUniqueMappingFormService.getUniversallyUniqueMapping).toHaveBeenCalled();
      expect(universallyUniqueMappingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniversallyUniqueMapping>>();
      const universallyUniqueMapping = { id: 123 };
      jest.spyOn(universallyUniqueMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(universallyUniqueMappingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
