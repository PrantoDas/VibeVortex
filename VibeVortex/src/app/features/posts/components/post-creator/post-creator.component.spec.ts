import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreatorComponent } from './post-creator.component';

describe('PostCreatorComponent', () => {
  let component: PostCreatorComponent;
  let fixture: ComponentFixture<PostCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostCreatorComponent]
    });
    fixture = TestBed.createComponent(PostCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
