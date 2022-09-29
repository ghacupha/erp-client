import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormQuestionModule } from './dynamic-form-question.module';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

describe('DynamicFormQuestionComponent', () => {
  let component: DynamicFormQuestionComponent;
  let fixture: ComponentFixture<DynamicFormQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormQuestionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionComponent);
    component = fixture.componentInstance;

    // Mock form
    component.form = new FormGroup({
      firstName: new FormControl()
    });

    // Mock question
    component.question = {
      value: 'Bombasto',
      key: 'firstName',
      label: 'First name',
      required: true,
      order: 1,
      controlType: 'textbox',
      placeholder: '',
      iterable: false
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
