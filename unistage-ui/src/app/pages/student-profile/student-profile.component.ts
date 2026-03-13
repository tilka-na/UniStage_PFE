import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { StudentProfile } from '../../models/app-models';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.component.html' 
})
export class StudentProfileComponent implements OnInit {
 
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
  get fullName(): string {
    return `${this.profile.firstName} ${this.profile.lastName}`.trim();
  }
  set fullName(value: string) {
    const parts = value.split(' ');
    this.profile.firstName = parts[0] || '';
    this.profile.lastName = parts.slice(1).join(' ') || '';
  }

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
          this.profile = data;
          if (!this.profile.experiences) this.profile.experiences = [];
        }
      },
      error: (err) => console.log('Profil non trouvé ou erreur.', err)
    });
  }

  addExperience() {
    if (!this.profile.experiences) { this.profile.experiences = []; }
    this.profile.experiences.push({ 
      title: '', 
      organization: '', 
      period: '', 
      description: '' 
    });
  }

  removeExperience(index: number) {
    this.profile.experiences?.splice(index, 1);
  }

  onCvSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.cvFile = file;
  }

  onCoverLetterSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.coverLetterFile = file;
  }

  onSubmit() {
    this.error = '';
    this.success = '';
    
    if (!this.profile.firstName || !this.profile.phone || !this.profile.university) {
      this.error = 'Veuillez remplir les champs obligatoires (Nom, Téléphone, Université).';
      return;
    }

    this.isSubmitting = true;

    this.profileService.updateMyStudentProfile(
      this.profile,
      this.cvFile || undefined,
      this.coverLetterFile || undefined
    ).subscribe({
      next: (res) => {
        this.success = "Profil mis à jour avec succès !";
        this.isSubmitting = false;
        this.profile = res;
      },
      error: (err) => {
        this.error = "Erreur lors de la sauvegarde.";
        this.isSubmitting = false;
        console.error(err);
      }
    });
  }
}