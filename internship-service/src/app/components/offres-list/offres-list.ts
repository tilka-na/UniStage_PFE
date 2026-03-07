import { Component, OnInit } from '@angular/core'; // Darori ykon hna
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 👈 1. Zidi had l-import
import { FormsModule } from '@angular/forms';
import { InternshipService } from '../../services/internship.service';

@Component({  // <--- HADI HIYA LI NAQSAK (Decorator)
  selector: 'app-offres-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // T-akdi t-zidi FormsModule hna
  templateUrl: './offres-list.html',
  styleUrl: './offres-list.css'
})
export class OffresListComponent implements OnInit { // Hna fin t-7eb l-erreur
  
  offres: any[] = [];
  motCle: string = '';
  showModal: boolean = false;
  selectedOffre: any = null;

  candidature = {
    etudiantId: 15,
    motivation: ''
  };

  constructor(private internshipService: InternshipService) {}

  ngOnInit(): void {
    this.chargerLesOffres();
  }

  chargerLesOffres() {
    this.internshipService.getOffres().subscribe({
      next: (data) => {
        this.offres = data;
      },
      error: (err) => console.error('Error 8083:', err)
    });
  }

  get offresFiltrees() {
    if (!this.motCle) return this.offres;
    return this.offres.filter(o => 
      o.titre?.toLowerCase().includes(this.motCle.toLowerCase())
    );
  }

  openModal(offre: any) {
    this.selectedOffre = offre;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitCandidature() {
    if (!this.selectedOffre) return;
    const payload = {
      etudiantId: this.candidature.etudiantId,
      offerId: this.selectedOffre.id,
      motivation: this.candidature.motivation
    };

    this.internshipService.postuler(payload).subscribe({
      next: (res) => {
        alert('Candidature envoyée!');
        this.closeModal();
      },
      error: (err) => alert('Erreur!')
    });
  }
}