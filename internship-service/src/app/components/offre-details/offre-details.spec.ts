import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffreDetailsComponent } from './offre-details';
import { InternshipService } from '../../services/internship.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
// 👇 1. Zidi had l-import
import { RouterTestingModule } from '@angular/router/testing'; 

describe('OffreDetailsComponent', () => {
  let component: OffreDetailsComponent;
  let fixture: ComponentFixture<OffreDetailsComponent>;

  const serviceMock = {
    getOffreById: (id: any) => of({
      id: 1,
      titre: 'Stage Test',
      entreprise: 'Test Company',
      description: 'Description...',
      localisation: 'Casa',
      duree: '3 Mois',
      datePublication: new Date()
    })
  };

  const routeMock = {
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OffreDetailsComponent, 
        CommonModule,
        RouterTestingModule // 👈 2. Zidiha hna DAROURI
      ],
      providers: [
        { provide: InternshipService, useValue: serviceMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});