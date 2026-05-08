import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { StudentProfile } from '../../models/app-models'; // Import your interface

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
  templateUrl: './student-profile.component.html' // Assuming you keep the HTML template here or in a file
})
export class StudentProfileComponent implements OnInit {

  // --- VARIABLES ---
  fullName: string = '';
  email: string = '';
  phone: string = '';
  university: string = '';
  skills: string = '';
  experiences: Experience[] = [];

  cvFile: File | null = null;
  coverLetterFile: File | null = null;

  isSubmitting: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private profileService: ProfileService, // Corrected Service Name
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProfile();
  }
fetchProfile() {
  this.profileService.getMyStudentProfile().subscribe({
    next: (profile: any) => {
      if(profile) {
        // 1. Core Data (Matches your console log)
        this.fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
        this.phone = profile.phone || '';
        this.university = profile.university || '';
        this.skills = profile.skills || '';

        // 2. Experiences
        // If the DB has experiences, use them; otherwise, keep an empty list.
        this.experiences = profile.experiences && profile.experiences.length > 0
          ? profile.experiences
          : [];

        // 3. Existing Files (for display)
        // We don't set cvFile (the File object) here because that's for NEW uploads.
        // But we can store the URLs to show the recruiter what's already there.
        this.cvFile = profile.cvFile;
        this.coverLetterFile = profile.coverLetterFile;
      }
    },
    error: (err: any) => console.error('Error fetching profile', err)
  });
}

  // --- HELPER METHODS ---
  addExperience() {
    this.experiences.push({ title: '', organization: '', period: '', description: '' });
  }

  removeExperience(index: number) {
    this.experiences.splice(index, 1);
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

    if (!this.fullName || !this.phone || !this.university) {
      this.error = 'Veuillez remplir les champs obligatoires.';
      return;
    }

    this.isSubmitting = true;

    // Map the local variables back to the StudentProfile structure
    const profileData: any = {
      firstName: this.fullName.split(' ')[0],
      lastName: this.fullName.split(' ').slice(1).join(' ') || '',
      phone: this.phone,
      university: this.university,
      skills: this.skills,
      experiences: this.experiences
    };

    // Use updateMyStudentProfile() (matching your ProfileService)
    this.profileService.updateMyStudentProfile(profileData, this.cvFile || undefined, this.coverLetterFile || undefined)
      .subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          this.success = 'Profil mis à jour avec succès !';
        },
        error: (err: any) => {
          this.isSubmitting = false;
          console.error('Update failed', err);
          this.error = 'Erreur: ' + (err.error?.message || 'Problème de connexion');
        }
      });
  }
}
