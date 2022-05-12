import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForDeleteComponent } from './dialog-for-delete.component';

describe('DialogForDeleteComponent', () => {
  let component: DialogForDeleteComponent;
  let fixture: ComponentFixture<DialogForDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogForDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
