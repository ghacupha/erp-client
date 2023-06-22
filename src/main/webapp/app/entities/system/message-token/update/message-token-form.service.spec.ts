///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
