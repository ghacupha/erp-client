import { IMessageToken, NewMessageToken } from './message-token.model';

export const sampleWithRequiredData: IMessageToken = {
  id: 3715,
  timeSent: 45686,
  tokenValue: 'protocol Sleek Refined',
};

export const sampleWithPartialData: IMessageToken = {
  id: 72412,
  timeSent: 26837,
  tokenValue: 'Analyst',
  received: false,
  actioned: true,
};

export const sampleWithFullData: IMessageToken = {
  id: 7402,
  description: 'Savings',
  timeSent: 25197,
  tokenValue: 'Massachusetts',
  received: false,
  actioned: false,
  contentFullyEnqueued: false,
};

export const sampleWithNewData: NewMessageToken = {
  timeSent: 99714,
  tokenValue: 'salmon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
