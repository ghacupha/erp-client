import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FileUploadFormService } from './file-upload-form.service';
import { FileUploadService } from '../service/file-upload.service';
import { IFileUpload } from '../file-upload.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { FileUploadUpdateComponent } from './file-upload-update.component';

describe('FileUpload Management Update Component', () => {
  let comp: FileUploadUpdateComponent;
  let fixture: ComponentFixture<FileUploadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fileUploadFormService: FileUploadFormService;
  let fileUploadService: FileUploadService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FileUploadUpdateComponent],
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
      .overrideTemplate(FileUploadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FileUploadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fileUploadFormService = TestBed.inject(FileUploadFormService);
    fileUploadService = TestBed.inject(FileUploadService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const fileUpload: IFileUpload = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 18660 }];
      fileUpload.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 54308 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fileUpload });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fileUpload: IFileUpload = { id: 456 };
      const placeholder: IPlaceholder = { id: 40350 };
      fileUpload.placeholders = [placeholder];

      activatedRoute.data = of({ fileUpload });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.fileUpload).toEqual(fileUpload);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileUpload>>();
      const fileUpload = { id: 123 };
      jest.spyOn(fileUploadFormService, 'getFileUpload').mockReturnValue(fileUpload);
      jest.spyOn(fileUploadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileUpload });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileUpload }));
      saveSubject.complete();

      // THEN
      expect(fileUploadFormService.getFileUpload).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fileUploadService.update).toHaveBeenCalledWith(expect.objectContaining(fileUpload));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileUpload>>();
      const fileUpload = { id: 123 };
      jest.spyOn(fileUploadFormService, 'getFileUpload').mockReturnValue({ id: null });
      jest.spyOn(fileUploadService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileUpload: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileUpload }));
      saveSubject.complete();

      // THEN
      expect(fileUploadFormService.getFileUpload).toHaveBeenCalled();
      expect(fileUploadService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileUpload>>();
      const fileUpload = { id: 123 };
      jest.spyOn(fileUploadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileUpload });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fileUploadService.update).toHaveBeenCalled();
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
