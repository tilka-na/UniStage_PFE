import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { InternshipService } from '../../services/internship.service';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.css' 
})
export class RecruiterDashboardComponent implements OnInit {
  
  candidatures: any[] = [];

constructor(
    private internshipService: InternshipService,
    private cdr: ChangeDetectorRef 
  ) {}
  ngOnInit(): void {
    this.internshipService.getCandidatures().subscribe((data) => {
      this.candidatures = data;
      console.log('Data wslat:', data);
      
      this.cdr.detectChanges(); // Kan-goulo l Angular "Fiq! Rah kayna data"
    });
  }


  loadCandidatures() {
    // Hna kanjibo data mn Backend
    this.internshipService.getCandidatures().subscribe({
      next: (data) => this.candidatures = data,
      error: (err) => console.error('Erreur chargement:', err)
    });
  }

  traiterCandidature(id: number, decision: string) {
    this.internshipService.updateStatus(id, decision).subscribe({
      next: () => {
        alert(`Candidature ${decision}!`);
        this.loadCandidatures(); // Actualiser la liste
      },
      error: () => alert('Erreur modification statut')
    });
  }
}
