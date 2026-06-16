import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { InternshipService } from '../../services/internship.service';
import { InternshipOffer } from '../../models/app-models';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-offres-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ThemeToggleComponent],
  templateUrl: './offres-list.html'
})
export class OffresListComponent implements OnInit {

  allOffers: InternshipOffer[] = [];
  filteredOffers: InternshipOffer[] = [];
  isLoading: boolean = true;

  currentRole: string = 'admin';

  // Variables de recherche
  searchTitle: string = '';
  searchCity: string = '';
  searchDomain: string = '';
  searchCompany: string = '';

  // Variables du Modal
  selectedOffer: InternshipOffer | null = null;
  showModal: boolean = false;
  motivationText: string = '';
  isSubmitting: boolean = false;

  constructor(
    private service: InternshipService,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.isLoading = true;
    this.service.getAllOffers().subscribe({
      next: (data) => {
        this.allOffers = data;

        this.filteredOffers = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erreur chargement:", err);
        this.isLoading = false;
      }
    });
  }

  onFilterChange() {
    const titleTerm = this.searchTitle.toLowerCase();
    const cityTerm = this.searchCity.toLowerCase();
    const domainTerm = this.searchDomain.toLowerCase();
    const companyTerm = this.searchCompany.toLowerCase();

    this.filteredOffers = this.allOffers.filter(offer => {
      const title = (offer.title || '').toLowerCase();
      const location = (offer.location || '').toLowerCase();
      const domain = (offer.domain || '').toLowerCase();

      const company = (offer.companyName || '').toLowerCase();

      return title.includes(titleTerm) &&
             location.includes(cityTerm) &&
             domain.includes(domainTerm) &&
             company.includes(companyTerm);
    });
  }

  // --- DELETE MODIFIÉ ---
  deleteOffer(id: number | undefined) {
    if (!id) return;
    if (confirm('Wach bssh baghi tms7 had l-offre?')) {
      this.service.deleteOffer(id).subscribe({
        next: () => {
          this.allOffers = this.allOffers.filter(o => o.id !== id);
          this.onFilterChange();
          alert('Offre supprimée !');
        },
        error: (err) => {
          console.error("Erreur suppression:", err);
          alert("Erreur technique lors de la suppression.");
        }
      });
    }
  }

  // --- MODAL ---
  openApplyModal(offer: InternshipOffer) {
    this.selectedOffer = offer;
    this.showModal = true;

    this.motivationText = '';
  }

  closeModal() {
    this.showModal = false;
    this.selectedOffer = null;
  }

  // --- SUBMIT MODIFIÉ ---
submitApplication() {
    if (!this.motivationText.trim()) {
      alert("Kteb chi 7aja f motivation!");
      return;
    }
    if (!this.selectedOffer?.id) return;

    this.isSubmitting = true;
    const offerId = this.selectedOffer.id;
    const candidature = {
      studentId: 1, // Will be linked to session ID later
      motivation: this.motivationText,
      status: 'PENDING'
    };

    this.service.postuler(offerId, candidature).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.closeModal();
        alert("Candidature envoyée avec succès! ✨");
      },
      error: (err) => {
        // If the backend returns a raw text string, HttpClient treats it as a parsing error
        if (err.status === 200 || err.error?.text) {
          this.isSubmitting = false;
          this.closeModal();
          alert("Candidature envoyée avec succès! ✨");
        } else {
          console.error("Erreur envoi:", err);
          alert("Erreur technique. Vérifie si tu n'as pas déjà postulé.");
          this.isSubmitting = false;
        }
      }
    });
  }

}
