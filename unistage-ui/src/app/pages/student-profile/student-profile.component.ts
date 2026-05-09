import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { StudentProfile } from '../../models/app-models'; // Ensure this path is correct

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

  // --- THE MISSING PROFILE OBJECT ---
  // This exactly matches what your HTML is looking for
  profile: any = {
    firstName: '',
    lastName: '',
    cne: '',
    phone: '',
    university: '',
    skills: '',
    experiences: [],
    cvUrl: '',
    coverLetterUrl: ''
  };

  cvFile: File | null = null;
  coverLetterFile: File | null = null;

  isSubmitting: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.getMyStudentProfile().subscribe({
      next: (apiProfile: any) => {
        if(apiProfile) {
          // 1. Core Data
          this.profile.firstName = apiProfile.firstName || '';
          this.profile.lastName = apiProfile.lastName || '';
          this.profile.cne = apiProfile.cne || '';
          this.profile.phone = apiProfile.phone || '';
          this.profile.university = apiProfile.university || '';
          this.profile.skills = apiProfile.skills || '';
          this.profile.cvUrl = apiProfile.cvUrl || '';
          this.profile.coverLetterUrl = apiProfile.coverLetterUrl || '';

          // 2. Experiences
          this.profile.experiences = apiProfile.experiences && apiProfile.experiences.length > 0
            ? apiProfile.experiences
            : [];

          // 3. Existing Files (for display)
          this.cvFile = apiProfile.cvFile;
          this.coverLetterFile = apiProfile.coverLetterFile;
        }
      },
      error: (err: any) => console.error('Erreur lors de la récupération du profil', err)
    });
  }

  // --- HELPER METHODS ---
  addExperience() {
    this.profile.experiences.push({ title: '', organization: '', period: '', description: '' });
  }

  removeExperience(index: number) {
    this.profile.experiences.splice(index, 1);
  }

  onCvSelected(event: any) {
    this.cvFile = event.target.files[0];
  }

  onCoverLetterSelected(event: any) {
    this.coverLetterFile = event.target.files[0];
  }

  // --- SUBMIT LOGIC ---
  onSubmit() {
    this.error = '';
    this.success = '';

    if (!this.profile.firstName || !this.profile.phone || !this.profile.university) {
      this.error = 'Veuillez remplir les champs obligatoires.';
      return;
    }

    this.isSubmitting = true;

    // Send the correctly formatted profile object to your service
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
