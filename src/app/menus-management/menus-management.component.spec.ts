import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusManagementComponent } from './menus-management.component';

describe('MenusManagementComponent', () => {
  let component: MenusManagementComponent;
  let fixture: ComponentFixture<MenusManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
