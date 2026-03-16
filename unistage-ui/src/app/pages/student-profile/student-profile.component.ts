import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { StudentProfile } from '../../models/app-models';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.component.html'
})
export class StudentProfileComponent implements OnInit {
  // Model initialization
  profile: StudentProfile = {
    firstName: '',
    lastName: '',
    phone: '',
    university: '',
    major: '',
    level: '',
    skills: '',
    experiences: []
  };

  // State Management
  isReadOnly = false;
  isSubmitting = false;
  error = '';
  success = '';
  cvFile: File | null = null;
  coverLetterFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    public router: Router
  ) {}

  ngOnInit() {
    // Detect if accessed via /offres/student-profile/:id
    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      this.isReadOnly = true;
      this.loadProfileForRecruiter(idFromUrl);
    } else {
      this.isReadOnly = false;
      this.fetchProfile();
    }
  }

  // Used by Recruiter: Triggers the backend viewCount increment
  loadProfileForRecruiter(id: string) {
    this.profileService.getProfileForEmployer(id).subscribe({
      next: (data) => {
        this.profile = data;
        if (!this.profile.experiences) this.profile.experiences = [];
      },
      error: () => this.error = "Impossible de charger le profil."
    });
  }

  // Used by Student: Loads personal profile
  fetchProfile() {
    this.profileService.getMyStudentProfile().subscribe({
      next: (data: StudentProfile) => {
        if (data) {
          this.profile = { ...this.profile, ...data };
          if (!this.profile.experiences) this.profile.experiences = [];
        }
      }
    });
  }

  // --- Form Logic ---
  addExperience() {
    if (this.isReadOnly) return;
    this.profile.experiences?.push({ title: '', organization: '', period: '', description: '' });
  }

  removeExperience(index: number) {
    if (this.isReadOnly) return;
    this.profile.experiences?.splice(index, 1);
  }

  onCvSelected(event: any) { this.cvFile = event.target.files[0]; }
  onCoverLetterSelected(event: any) { this.coverLetterFile = event.target.files[0]; }

  onSubmit() {
    if (this.isReadOnly) return;
    this.isSubmitting = true;
    this.profileService.updateMyStudentProfile(this.profile, this.cvFile || undefined, this.coverLetterFile || undefined)
      .subscribe({
        next: (res) => {
          this.success = "Profil mis à jour !";
          this.profile = res;
          this.isSubmitting = false;
        },
        error: () => { this.error = "Erreur de sauvegarde"; this.isSubmitting = false; }
      });
  }
}
