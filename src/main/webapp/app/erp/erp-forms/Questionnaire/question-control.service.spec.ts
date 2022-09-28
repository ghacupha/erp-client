import { TestBed } from '@angular/core/testing';
import { QuestionControlService } from './question-control.service';

describe('QuestionControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [QuestionControlService]
  }));

  it('should be created', () => {
    const service: QuestionControlService = TestBed.inject(QuestionControlService);
    expect(service).toBeTruthy();
  });
});
