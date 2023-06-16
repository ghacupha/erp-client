import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../message-token.test-samples';

import { MessageTokenFormService } from './message-token-form.service';

describe('MessageToken Form Service', () => {
  let service: MessageTokenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageTokenFormService);
  });

  describe('Service methods', () => {
    describe('createMessageTokenFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMessageTokenFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            timeSent: expect.any(Object),
            tokenValue: expect.any(Object),
            received: expect.any(Object),
            actioned: expect.any(Object),
            contentFullyEnqueued: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IMessageToken should create a new form with FormGroup', () => {
        const formGroup = service.createMessageTokenFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            timeSent: expect.any(Object),
            tokenValue: expect.any(Object),
            received: expect.any(Object),
            actioned: expect.any(Object),
            contentFullyEnqueued: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getMessageToken', () => {
      it('should return NewMessageToken for default MessageToken initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMessageTokenFormGroup(sampleWithNewData);

        const messageToken = service.getMessageToken(formGroup) as any;

        expect(messageToken).toMatchObject(sampleWithNewData);
      });

      it('should return NewMessageToken for empty MessageToken initial value', () => {
        const formGroup = service.createMessageTokenFormGroup();

        const messageToken = service.getMessageToken(formGroup) as any;

        expect(messageToken).toMatchObject({});
      });

      it('should return IMessageToken', () => {
        const formGroup = service.createMessageTokenFormGroup(sampleWithRequiredData);

        const messageToken = service.getMessageToken(formGroup) as any;

        expect(messageToken).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMessageToken should not enable id FormControl', () => {
        const formGroup = service.createMessageTokenFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMessageToken should disable id FormControl', () => {
        const formGroup = service.createMessageTokenFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
