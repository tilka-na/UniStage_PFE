import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InternshipService } from '../../services/internship.service';
import { NotificationService } from '../../services/notification.service';
import { Application, InternshipOffer, Notification } from '../../models/app-models';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ThemeToggleComponent],
  templateUrl: './recruiter-dashboard.html',
  styleUrls: ['./recruiter-dashboard.css']
})
export class RecruiterDashboardComponent implements OnInit {

  // --- DATA ---
  myOffers: InternshipOffer[] = [];
  candidatures: Application[] = []; // Re-named to match your HTML
  filteredOffers: InternshipOffer[] = [];
  filteredCandidatures: Application[] = []; // Re-named to match your HTML
  notifications: Notification[] = [];
  domaines: string[] = [];

  // --- STATE ---
  isLoadingOffers = true;
  showOfferModal = false;
  isSubmitting = false;
  isEditing = false;
  currentEditId: number | null = null;
  selectedDomain: string | null = null;
  showNotifications = false;

  // --- FORM MODEL ---
  newOffer: InternshipOffer = this.initNewOffer();

  constructor(
    private internshipService: InternshipService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyOffers();
    this.loadCandidatures();
    this.loadNotifications();
  }

  // --- INITIALIZERS ---
  initNewOffer(): InternshipOffer {
    return {
      title: '', description: '', companyName: '', location: '',
      domain: '', duration: 1, skills: '', status: 'OPEN',
      companyId: 1, recruiterId: 1
    };
  }

  // --- LOAD DATA ---
  loadMyOffers(): void {
    this.isLoadingOffers = true;
    this.internshipService.getAllOffers().subscribe({
      next: (data) => {
        this.myOffers = data;
        this.domaines = [...new Set(data.map(o => o.domain).filter(d => !!d))];
        if (this.selectedDomain) this.ouvrirDomaine(this.selectedDomain);
        this.isLoadingOffers = false;
        this.cdr.detectChanges();
      },
<<<<<<< HEAD
      error: (err:any) => { console.error(err); this.isLoadingOffers = false; }
=======
      error: (err) => { console.error(err); this.isLoadingOffers = false; }
>>>>>>> origin/feat-last-push
    });
  }

  loadCandidatures(): void {
    this.internshipService.getAllApplications().subscribe({
      next: (data) => {
        this.candidatures = data;
        if (this.selectedDomain) this.ouvrirDomaine(this.selectedDomain);
        this.cdr.detectChanges();
      },
<<<<<<< HEAD
      error: (err:any) => console.error(err)
=======
      error: (err) => console.error(err)
>>>>>>> origin/feat-last-push
    });
  }

  // --- NAVIGATION ---
  ouvrirDomaine(domaine: string): void {
    this.selectedDomain = domaine;
    this.filteredOffers = this.myOffers.filter(o => o.domain === domaine);
<<<<<<< HEAD

=======
    
>>>>>>> origin/feat-last-push
    // Logic dyal l-matching m3a l-offres dyal had domaine
    const offerIds = this.filteredOffers.map(o => o.id);
    this.filteredCandidatures = this.candidatures.filter(c => {
      const appData = c as any;
      const targetOfferId = Number(appData.internshipOffer?.id || appData.offer?.id || appData.internshipOfferId || appData.offerId);
      return offerIds.includes(targetOfferId);
    });
  }

  retourAuxDomaines(): void {
    this.selectedDomain = null;
    this.filteredOffers = [];
    this.filteredCandidatures = [];
  }

  // --- ACTIONS ---
  submitOffer(): void {
    this.isSubmitting = true;
    const request = (this.isEditing && this.currentEditId)
      ? this.internshipService.updateOffer(this.currentEditId, this.newOffer)
      : this.internshipService.createOffer(this.newOffer);

    request.subscribe({
      next: (res) => {
        if (this.isEditing) {
          const index = this.myOffers.findIndex(o => o.id === this.currentEditId);
          if (index > -1) this.myOffers[index] = res;
        } else {
          this.myOffers.push(res);
          if (!this.domaines.includes(res.domain)) this.domaines.push(res.domain);
        }
        if (this.selectedDomain) this.ouvrirDomaine(this.selectedDomain);
        alert(this.isEditing ? 'Offre modifiée !' : 'Offre publiée !');
        this.closeOfferModal();
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
<<<<<<< HEAD
      error: (err:any) => {
=======
      error: (err) => {
>>>>>>> origin/feat-last-push
        this.isSubmitting = false;
        alert("Erreur : " + err.message);
      }
    });
  }

  deleteOffer(id: number | undefined): void {
    if (id && confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.internshipService.deleteOffer(id).subscribe({
        next: () => {
          this.myOffers = this.myOffers.filter(o => o.id !== id);
          if (this.selectedDomain) this.ouvrirDomaine(this.selectedDomain);
          alert('Supprimé avec succès.');
        },
<<<<<<< HEAD
        error: (err:any) => alert("Erreur: L'offre est liée à des candidatures !")
=======
        error: (err) => alert("Erreur: L'offre est liée à des candidatures !")
>>>>>>> origin/feat-last-push
      });
    }
  }

 changerStatut(candidat: any, nouveauStatut: string): void {
  // 1. Ser3a: Beddel l-statut f l-interface f hadik l-tanya (Instantané)
  const oldStatus = candidat.status; // Kan-khebbiw l-9dim ghi ila wqe3 mouchkil
  candidat.status = nouveauStatut;

  // 2. Notification sghira (Facultatif): Ghir bach l-user yfhem beli khedama
  console.log(`Changement vers ${nouveauStatut} en cours...`);

  // 3. Force l-affichage: Kant-ekdou beli Angular shaf l-bedala
  this.filteredCandidatures = [...this.filteredCandidatures];
  this.cdr.detectChanges();

  // 4. L-API katsift f l-khfa bla ma t-bloqui l-user
  this.internshipService.updateCandidatureStatus(candidat.id, nouveauStatut).subscribe({
<<<<<<< HEAD
    next: (res: any) => {
      // Hna l-API jawbet b s-seha, kolchi mezyan
      console.log("C'est fait !");
    },
    error: (err:any) => {
=======
    next: (res) => {
      // Hna l-API jawbet b s-seha, kolchi mezyan
      console.log("C'est fait !");
    },
    error: (err) => {
>>>>>>> origin/feat-last-push
      // Ila tra mouchkil s-3ib (Server t-ta7), kan-rej3o l-statut l-9dim
      candidat.status = oldStatus;
      this.filteredCandidatures = [...this.filteredCandidatures];
      this.cdr.detectChanges();
      alert("Erreur technique : Le statut n'a pas pu être enregistré.");
    }
  });
}

  // --- UI HELPERS ---
  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'ACCEPTED': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400';
    }
  }

  // --- MODAL CONTROL ---
  editOffer(id: number | undefined): void {
    if (!id) return;
    const offerToEdit = this.myOffers.find(o => o.id === id);
    if (offerToEdit) {
      this.isEditing = true;
      this.currentEditId = id;
      this.newOffer = { ...offerToEdit };
      this.showOfferModal = true;
    }
  }

<<<<<<< HEAD
  openOfferModal(): void {
    this.isEditing = false;
    this.currentEditId = null;
    this.newOffer = this.initNewOffer();
    this.showOfferModal = true;
=======
  openOfferModal(): void { 
    this.isEditing = false;
    this.currentEditId = null;
    this.newOffer = this.initNewOffer();
    this.showOfferModal = true; 
>>>>>>> origin/feat-last-push
  }

  closeOfferModal(): void { this.showOfferModal = false; }
  loadNotifications(): void { this.notificationService.getNotifications().subscribe(data => this.notifications = data); }
  voirCV(studentId: number): void { alert("Visualisation du CV de l'étudiant #" + studentId); }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/feat-last-push
