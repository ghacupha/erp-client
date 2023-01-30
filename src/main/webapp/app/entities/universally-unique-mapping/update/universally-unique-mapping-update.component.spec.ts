jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';
import { IUniversallyUniqueMapping, UniversallyUniqueMapping } from '../universally-unique-mapping.model';

import { UniversallyUniqueMappingUpdateComponent } from './universally-unique-mapping-update.component';

describe('UniversallyUniqueMapping Management Update Component', () => {
  let comp: UniversallyUniqueMappingUpdateComponent;
  let fixture: ComponentFixture<UniversallyUniqueMappingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UniversallyUniqueMappingUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(UniversallyUniqueMappingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UniversallyUniqueMappingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 456 };

      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(universallyUniqueMapping));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<UniversallyUniqueMapping>>();
      const universallyUniqueMapping = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(universallyUniqueMappingService.update).toHaveBeenCalledWith(universallyUniqueMapping);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<UniversallyUniqueMapping>>();
      const universallyUniqueMapping = new UniversallyUniqueMapping();
      jest.spyOn(universallyUniqueMappingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: universallyUniqueMapping }));
      saveSubject.complete();

      // THEN
      expect(universallyUniqueMappingService.create).toHaveBeenCalledWith(universallyUniqueMapping);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<UniversallyUniqueMapping>>();
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
      expect(universallyUniqueMappingService.update).toHaveBeenCalledWith(universallyUniqueMapping);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
