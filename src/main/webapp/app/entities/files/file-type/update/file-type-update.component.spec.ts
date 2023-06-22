import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FileTypeFormService } from './file-type-form.service';
import { FileTypeService } from '../service/file-type.service';
import { IFileType } from '../file-type.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { FileTypeUpdateComponent } from './file-type-update.component';

describe('FileType Management Update Component', () => {
  let comp: FileTypeUpdateComponent;
  let fixture: ComponentFixture<FileTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fileTypeFormService: FileTypeFormService;
  let fileTypeService: FileTypeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FileTypeUpdateComponent],
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
      .overrideTemplate(FileTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FileTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fileTypeFormService = TestBed.inject(FileTypeFormService);
    fileTypeService = TestBed.inject(FileTypeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const fileType: IFileType = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 19683 }];
      fileType.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 88821 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fileType });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fileType: IFileType = { id: 456 };
      const placeholder: IPlaceholder = { id: 46083 };
      fileType.placeholders = [placeholder];

      activatedRoute.data = of({ fileType });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.fileType).toEqual(fileType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileType>>();
      const fileType = { id: 123 };
      jest.spyOn(fileTypeFormService, 'getFileType').mockReturnValue(fileType);
      jest.spyOn(fileTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileType }));
      saveSubject.complete();

      // THEN
      expect(fileTypeFormService.getFileType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fileTypeService.update).toHaveBeenCalledWith(expect.objectContaining(fileType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileType>>();
      const fileType = { id: 123 };
      jest.spyOn(fileTypeFormService, 'getFileType').mockReturnValue({ id: null });
      jest.spyOn(fileTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileType }));
      saveSubject.complete();

      // THEN
      expect(fileTypeFormService.getFileType).toHaveBeenCalled();
      expect(fileTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileType>>();
      const fileType = { id: 123 };
      jest.spyOn(fileTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fileTypeService.update).toHaveBeenCalled();
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
