import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNewWindowComponent } from './movie-new-window.component';

describe('MovieNewWindowComponent', () => {
  let component: MovieNewWindowComponent;
  let fixture: ComponentFixture<MovieNewWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieNewWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieNewWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
