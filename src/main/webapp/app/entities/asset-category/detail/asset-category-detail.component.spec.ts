import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AssetCategoryDetailComponent } from './asset-category-detail.component';

describe('AssetCategory Management Detail Component', () => {
  let comp: AssetCategoryDetailComponent;
  let fixture: ComponentFixture<AssetCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ assetCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AssetCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AssetCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load assetCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.assetCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
