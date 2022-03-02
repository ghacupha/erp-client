import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DepreciationMethodDetailComponent } from './depreciation-method-detail.component';

describe('DepreciationMethod Management Detail Component', () => {
  let comp: DepreciationMethodDetailComponent;
  let fixture: ComponentFixture<DepreciationMethodDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepreciationMethodDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ depreciationMethod: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DepreciationMethodDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DepreciationMethodDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load depreciationMethod on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.depreciationMethod).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
