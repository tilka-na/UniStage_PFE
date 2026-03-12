import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecruiterList } from './admin-recruiter-list';

describe('AdminRecruiterList', () => {
  let component: AdminRecruiterList;
  let fixture: ComponentFixture<AdminRecruiterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecruiterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecruiterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
