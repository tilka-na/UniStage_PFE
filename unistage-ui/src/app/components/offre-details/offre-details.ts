import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { InternshipService } from '../../services/internship.service';
import { InternshipOffer } from '../../models/app-models';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-offre-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ThemeToggleComponent],
  providers: [DatePipe], 
  templateUrl: './offre-details.html', 
  styleUrls: ['./offre-details.css']
})
export class OffreDetailsComponent implements OnInit {

  offer: InternshipOffer | null = null;
  isLoading: boolean = true;
  
  showModal: boolean = false;
  motivationText: string = '';
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private service: InternshipService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = Number(idStr);
      if (id) {
        this.loadOffer(id); 
      }
    });
  }

  loadOffer(id: number) {
    this.isLoading = true; 
    // Jib l-offre b l-URL: /api/internships/offers/{id}
    this.service.getOfferById(id).subscribe({
      next: (data: InternshipOffer) => {
        this.ngZone.run(() => {
          this.offer = data;
          this.isLoading = false;
          this.cdr.detectChanges(); 
        });
      },
      error: (err: any) => {
        this.ngZone.run(() => {
          console.error("Erreur chargement offre:", err);
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  getSkillsArray(skills: string | undefined): string[] {
    if (!skills) return [];
    // Convertir string "Java, Angular, SQL" -> ["Java", "Angular", "SQL"]
    return skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }

  openApplyModal() { 
    this.showModal = true; 
    this.motivationText = ''; 
  }
  
  closeModal() { 
    this.showModal = false; 
  }

  // --- SUBMIT MODIFIÉ POUR LE BACKEND ---
  submitApplication() {
    if (!this.motivationText.trim()) {
        alert("Motivation khawia!");
        return;
    }
    
    if (!this.offer?.id) {
        alert("Erreur: Offre introuvable.");
        return;
    }

    this.isSubmitting = true;

    // 1. Prepare data (bla offerId hit ghadi y-douz f URL)
    const candidature = {
      studentId: 1, // Student ID par défaut (à dynamiser plus tard)
      motivation: this.motivationText,
      status: 'PENDING'
    };

    // 2. Appel au service: postuler(offerId, data)
    // L-URL ghada t-koun: /api/applications/postuler/5
    this.service.postuler(this.offer.id, candidature).subscribe({
      next: () => {
        this.ngZone.run(() => {
            alert("Candidature envoyée avec succès ! ✨");
            this.isSubmitting = false;
            this.closeModal();
            this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
            console.error("Erreur technique:", err);
            alert("Erreur technique lors de l'envoi.");
            this.isSubmitting = false;
            this.cdr.detectChanges();
        });
      }
    });
  }
}