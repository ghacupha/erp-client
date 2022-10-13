import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SampleDynamicFormComponent } from './sample-dynamic-form.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';


describe('SampleDynamicFormComponent', () => {
  let component: SampleDynamicFormComponent;
  let fixture: ComponentFixture<SampleDynamicFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ DynamicFormModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

