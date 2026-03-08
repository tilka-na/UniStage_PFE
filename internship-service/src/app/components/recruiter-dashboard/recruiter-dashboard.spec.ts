import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecruiterDashboardComponent } from './recruiter-dashboard';
import { InternshipService } from '../../services/internship.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('RecruiterDashboardComponent', () => {
  let component: RecruiterDashboardComponent;
  let fixture: ComponentFixture<RecruiterDashboardComponent>;

  // ✅ L-7ell: Mock bla 'jest' w bla 'jasmine' (Fonction 3adiya)
  const serviceMock = {
    getOffres: () => of([]),
    updateStatut: () => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterDashboardComponent, CommonModule],
      providers: [
        { provide: InternshipService, useValue: serviceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});