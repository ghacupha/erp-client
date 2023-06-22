import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MessageTokenFormService } from './message-token-form.service';
import { MessageTokenService } from '../service/message-token.service';
import { IMessageToken } from '../message-token.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { MessageTokenUpdateComponent } from './message-token-update.component';

describe('MessageToken Management Update Component', () => {
  let comp: MessageTokenUpdateComponent;
  let fixture: ComponentFixture<MessageTokenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let messageTokenFormService: MessageTokenFormService;
  let messageTokenService: MessageTokenService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MessageTokenUpdateComponent],
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
      .overrideTemplate(MessageTokenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MessageTokenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    messageTokenFormService = TestBed.inject(MessageTokenFormService);
    messageTokenService = TestBed.inject(MessageTokenService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const messageToken: IMessageToken = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 73695 }];
      messageToken.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 54564 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ messageToken });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const messageToken: IMessageToken = { id: 456 };
      const placeholder: IPlaceholder = { id: 79481 };
      messageToken.placeholders = [placeholder];

      activatedRoute.data = of({ messageToken });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.messageToken).toEqual(messageToken);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageToken>>();
      const messageToken = { id: 123 };
      jest.spyOn(messageTokenFormService, 'getMessageToken').mockReturnValue(messageToken);
      jest.spyOn(messageTokenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageToken });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: messageToken }));
      saveSubject.complete();

      // THEN
      expect(messageTokenFormService.getMessageToken).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(messageTokenService.update).toHaveBeenCalledWith(expect.objectContaining(messageToken));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageToken>>();
      const messageToken = { id: 123 };
      jest.spyOn(messageTokenFormService, 'getMessageToken').mockReturnValue({ id: null });
      jest.spyOn(messageTokenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageToken: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: messageToken }));
      saveSubject.complete();

      // THEN
      expect(messageTokenFormService.getMessageToken).toHaveBeenCalled();
      expect(messageTokenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageToken>>();
      const messageToken = { id: 123 };
      jest.spyOn(messageTokenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageToken });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(messageTokenService.update).toHaveBeenCalled();
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
