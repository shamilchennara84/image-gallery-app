import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellRendererComponent } from './custom-cell-renderer.component';

describe('CustomCellRendererComponent', () => {
  let component: CustomCellRendererComponent;
  let fixture: ComponentFixture<CustomCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomCellRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
