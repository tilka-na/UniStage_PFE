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
  // Single merged object initialized with empty strings to avoid 'undefined' in HTML
  profile: StudentProfile = {
    firstName: '',
    lastName: '',
    phone: '',
    university: '',
    cne: '',
    major: '',
    level: '',
    skills: '',
    experiences: []
  };

  cvFile: File | null = null;
  coverLetterFile: File | null = null;
  isSubmitting: boolean = false;
  error: string = '';
  success: string = '';

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.getMyStudentProfile().subscribe({
      next: (data: StudentProfile) => {
        if (data) {
          // Merges all incoming database fields into our local profile object
          this.profile = data;
        }
      },
      error: (err) => console.log('Profil non trouvé ou erreur.', err)
    });
  }
  onSubmit() {
    this.isSubmitting = true;

    // Use 'as File' or ensure the service accepts null to clear the red error
    this.profileService.updateMyStudentProfile(
      this.profile,
      this.cvFile || undefined,
      this.coverLetterFile || undefined
    )
      .subscribe({
        next: (res) => {
          this.success = "Profil mis à jour avec succès !";
          this.isSubmitting = false;
          this.profile = res;
        },
        error: (err) => {
          this.error = "Erreur lors de la sauvegarde.";
          this.isSubmitting = false;
        }
      });
  }
  onCvSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cvFile = file;
      console.log('CV selected:', file.name);
    }
  }

  onCoverLetterSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverLetterFile = file;
      console.log('Cover letter selected:', file.name);
    }
  }
  addExperience() {
    if (!this.profile.experiences) { this.profile.experiences = []; }
    this.profile.experiences.push({ title: '', organization: '', period: '', description: '' });
  }

  removeExperience(index: number) {
    this.profile.experiences?.splice(index, 1);
  }
}
