import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // 🛠️ Added ActivatedRoute
import { ProfileService } from '../../services/profile.service';
import { StudentProfile } from '../../models/app-models';

interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.component.html'
})
export class StudentProfileComponent implements OnInit {

  profile: any = {
    firstName: '', lastName: '', cne: '', phone: '',
    university: '', skills: '', experiences: [],
    cvUrl: '', coverLetterUrl: ''
  };

  cvFile: File | null = null;
  coverLetterFile: File | null = null;

  isSubmitting: boolean = false;
  isReadOnly: boolean = false; // 🛠️ Flag to hide edit buttons from recruiters
  error: string = '';
  success: string = '';

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute // 🛠️ Injected the route analyzer
  ) {}

  ngOnInit(): void {
    // 🛠️ Check the URL parameters when the page loads
    this.route.queryParams.subscribe(params => {
      const studentId = params['id'];

      if (studentId) {
        // A recruiter is looking at a specific student's profile
        this.isReadOnly = true;
        this.fetchProfileById(+studentId);
      } else {
        // A student is looking at/editing their own profile
        this.isReadOnly = false;
        this.fetchOwnProfile();
      }
    });
  }

  // 1. Fetching a specific profile (For Recruiters)
  fetchProfileById(id: number) {
    // Make sure 'getStudentProfileById' exists in your profileService!
    this.profileService.getStudentProfileById(id).subscribe({
      next: (apiProfile: any) => this.mapProfileData(apiProfile),
      error: (err: any) => {
        console.error('Erreur lors de la récupération du profil ciblé', err);
        this.error = "Impossible de charger le profil de cet étudiant.";
      }
    });
  }

  // 2. Fetching the current user's profile (For Students)
  fetchOwnProfile() {
    this.profileService.getMyStudentProfile().subscribe({
      next: (apiProfile: any) => this.mapProfileData(apiProfile),
      error: (err: any) => console.error('Erreur lors de la récupération de votre profil', err)
    });
  }

  // Helper to cleanly map backend data onto your form model
  private mapProfileData(apiProfile: any) {
    if (apiProfile) {
      this.profile.firstName = apiProfile.firstName || '';
      this.profile.lastName = apiProfile.lastName || '';
      this.profile.cne = apiProfile.cne || '';
      this.profile.phone = apiProfile.phone || '';
      this.profile.university = apiProfile.university || '';
      this.profile.skills = apiProfile.skills || '';
      this.profile.cvUrl = apiProfile.cvUrl || '';
      this.profile.coverLetterUrl = apiProfile.coverLetterUrl || '';
      this.profile.experiences = apiProfile.experiences || [];
      this.cvFile = apiProfile.cvFile;
      this.coverLetterFile = apiProfile.coverLetterFile;
    }
  }

  // --- HELPER METHODS ---
  addExperience() {
    if (this.isReadOnly) return;
    this.profile.experiences.push({ title: '', organization: '', period: '', description: '' });
  }

  removeExperience(index: number) {
    if (this.isReadOnly) return;
    this.profile.experiences.splice(index, 1);
  }

  onCvSelected(event: any) { this.cvFile = event.target.files[0]; }
  onCoverLetterSelected(event: any) { this.coverLetterFile = event.target.files[0]; }

  onSubmit() {
    if (this.isReadOnly) return; // Prevent recruiters from firing updates

    this.error = '';
    this.success = '';

    if (!this.profile.firstName || !this.profile.phone || !this.profile.university) {
      this.error = 'Veuillez remplir les champs obligatoires.';
      return;
    }

    this.isSubmitting = true;

    this.profileService.updateMyStudentProfile(this.profile, this.cvFile || undefined, this.coverLetterFile || undefined)
      .subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          this.success = 'Profil mis à jour avec succès !';
        },
        error: (err: any) => {
          this.isSubmitting = false;
          console.error('La mise à jour a échoué', err);
          this.error = 'Erreur: ' + (err.error?.message || 'Problème de connexion');
        }
      });
  }
}
