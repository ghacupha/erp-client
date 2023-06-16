import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMessageToken, NewMessageToken } from '../message-token.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMessageToken for edit and NewMessageTokenFormGroupInput for create.
 */
type MessageTokenFormGroupInput = IMessageToken | PartialWithRequiredKeyOf<NewMessageToken>;

type MessageTokenFormDefaults = Pick<NewMessageToken, 'id' | 'received' | 'actioned' | 'contentFullyEnqueued' | 'placeholders'>;

type MessageTokenFormGroupContent = {
  id: FormControl<IMessageToken['id'] | NewMessageToken['id']>;
  description: FormControl<IMessageToken['description']>;
  timeSent: FormControl<IMessageToken['timeSent']>;
  tokenValue: FormControl<IMessageToken['tokenValue']>;
  received: FormControl<IMessageToken['received']>;
  actioned: FormControl<IMessageToken['actioned']>;
  contentFullyEnqueued: FormControl<IMessageToken['contentFullyEnqueued']>;
  placeholders: FormControl<IMessageToken['placeholders']>;
};

export type MessageTokenFormGroup = FormGroup<MessageTokenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MessageTokenFormService {
  createMessageTokenFormGroup(messageToken: MessageTokenFormGroupInput = { id: null }): MessageTokenFormGroup {
    const messageTokenRawValue = {
      ...this.getFormDefaults(),
      ...messageToken,
    };
    return new FormGroup<MessageTokenFormGroupContent>({
      id: new FormControl(
        { value: messageTokenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(messageTokenRawValue.description),
      timeSent: new FormControl(messageTokenRawValue.timeSent, {
        validators: [Validators.required],
      }),
      tokenValue: new FormControl(messageTokenRawValue.tokenValue, {
        validators: [Validators.required],
      }),
      received: new FormControl(messageTokenRawValue.received),
      actioned: new FormControl(messageTokenRawValue.actioned),
      contentFullyEnqueued: new FormControl(messageTokenRawValue.contentFullyEnqueued),
      placeholders: new FormControl(messageTokenRawValue.placeholders ?? []),
    });
  }

  getMessageToken(form: MessageTokenFormGroup): IMessageToken | NewMessageToken {
    return form.getRawValue() as IMessageToken | NewMessageToken;
  }

  resetForm(form: MessageTokenFormGroup, messageToken: MessageTokenFormGroupInput): void {
    const messageTokenRawValue = { ...this.getFormDefaults(), ...messageToken };
    form.reset(
      {
        ...messageTokenRawValue,
        id: { value: messageTokenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MessageTokenFormDefaults {
    return {
      id: null,
      received: false,
      actioned: false,
      contentFullyEnqueued: false,
      placeholders: [],
    };
  }
}
