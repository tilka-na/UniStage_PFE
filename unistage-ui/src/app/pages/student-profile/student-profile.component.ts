import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ProfileService } from '../../services/profile.service';
import { StudentProfile } from '../../models/app-models'; // Import your interface
=======
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../services/student.service'; // Ensure path is correct
>>>>>>> origin/feat-last-push

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
<<<<<<< HEAD
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
=======
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 transition-colors duration-300">
      <div class="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">

        <div class="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 px-8 py-8 text-white">
          <h1 class="text-3xl font-bold">Mon Profil Candidat</h1>
          <p class="text-slate-300 mt-2">Construisez votre dossier pour décrocher le stage idéal.</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="p-8 space-y-10">

          <section>
            <h3 class="flex items-center text-lg font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Informations Personnelles</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Nom Complet</label>
                <input type="text" [(ngModel)]="fullName" name="fullName" required class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-all">
              </div>
              <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Email (Université)</label>
                <input type="email" [(ngModel)]="email" name="email" readonly class="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-500 border border-transparent cursor-not-allowed dark:bg-slate-950 dark:text-slate-500">
              </div>
              <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Téléphone</label>
                <input type="text" [(ngModel)]="phone" name="phone" required class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-all">
              </div>
              <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Université / École</label>
                <input type="text" [(ngModel)]="university" name="university" required class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-all">
              </div>
            </div>
          </section>

          <section>
            <h3 class="flex items-center text-lg font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Compétences Techniques</h3>
            <textarea [(ngModel)]="skills" name="skills" rows="3" placeholder="Ex: Java, Spring Boot..." class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-all"></textarea>
          </section>

          <section>
            <div class="flex justify-between items-end mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
              <h3 class="flex items-center text-lg font-bold text-slate-800 dark:text-white">Expérience & Projets</h3>
              <button type="button" (click)="addExperience()" class="text-sm font-semibold text-green-600 hover:text-green-700 dark:text-green-400 hover:underline">+ Ajouter une expérience</button>
            </div>

            <div *ngFor="let exp of experiences; let i = index" class="mb-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
              <button type="button" (click)="removeExperience(i)" class="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                Remove
              </button>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input type="text" [(ngModel)]="exp.title" [name]="'expTitle'+i" placeholder="Titre" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-green-500 px-0 py-2 font-semibold text-slate-800 dark:text-white">
                <input type="text" [(ngModel)]="exp.organization" [name]="'expOrg'+i" placeholder="Entreprise" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-green-500 px-0 py-2 text-slate-700 dark:text-slate-300">
              </div>
              <input type="text" [(ngModel)]="exp.period" [name]="'expPeriod'+i" placeholder="Période" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-green-500 mb-3 px-0 py-2 text-sm text-slate-600 dark:text-slate-400">
              <textarea [(ngModel)]="exp.description" [name]="'expDesc'+i" rows="2" placeholder="Description..." class="w-full bg-white dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700 text-sm focus:ring-1 focus:ring-green-500 outline-none dark:text-slate-300"></textarea>
            </div>
          </section>

          <section>
            <h3 class="flex items-center text-lg font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Documents Joints</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer group relative">
                <input type="file" (change)="onCvSelected($event)" accept=".pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                <div class="pointer-events-none">
                  <h4 class="font-bold text-slate-700 dark:text-white">CV (PDF)</h4>
                  <p *ngIf="cvFile" class="mt-3 text-sm font-bold text-green-600">✓ {{ cvFile.name }}</p>
                  <p *ngIf="!cvFile" class="mt-3 text-sm text-blue-600 group-hover:underline">Sélectionner un fichier</p>
                </div>
              </div>
              <div class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer group relative">
                <input type="file" (change)="onCoverLetterSelected($event)" accept=".pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                <div class="pointer-events-none">
                  <h4 class="font-bold text-slate-700 dark:text-white">Lettre de Motivation</h4>
                  <p *ngIf="coverLetterFile" class="mt-3 text-sm font-bold text-green-600">✓ {{ coverLetterFile.name }}</p>
                  <p *ngIf="!coverLetterFile" class="mt-3 text-sm text-blue-600 group-hover:underline">Sélectionner un fichier</p>
                </div>
              </div>
            </div>
          </section>

          <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div *ngIf="error" class="mb-4 text-red-600 bg-red-50 p-4 rounded-lg">{{ error }}</div>
            <div *ngIf="success" class="mb-4 text-green-600 bg-green-50 p-4 rounded-lg">{{ success }}</div>
            <div class="flex justify-end gap-4">
              <button type="submit" [disabled]="isSubmitting" class="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all">
                <span *ngIf="isSubmitting">Envoi en cours...</span>
                <span *ngIf="!isSubmitting">Enregistrer le profil</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class StudentProfileComponent implements OnInit {

  // --- VARIABLES REQUIRED BY HTML ---
  fullName: string = '';
  email: string = 'student@example.com';
  phone: string = '';
  university: string = '';
  skills: string = '';

  experiences: Experience[] = [];

  cvFile: File | null = null;
  coverLetterFile: File | null = null;

>>>>>>> origin/feat-last-push
  isSubmitting: boolean = false;
  error: string = '';
  success: string = '';

<<<<<<< HEAD
  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
=======
  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Optional: Load existing profile data here
>>>>>>> origin/feat-last-push
    this.fetchProfile();
  }

  fetchProfile() {
<<<<<<< HEAD
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
=======
    this.studentService.getMyProfile().subscribe({
      next: (profile: any) => {
        if(profile) {
          this.fullName = (profile.firstName || '') + ' ' + (profile.lastName || '');
          this.phone = profile.phone || '';
          this.university = profile.university || '';
          this.skills = profile.skills || '';
          this.experiences = profile.experiences || [];
          // Cannot load files back into input[type=file] for security
        }
      },
      error: (err) => console.log('No profile found yet, fresh start.')
    });
  }

  // --- HELPER METHODS FOR HTML ---

  addExperience() {
    this.experiences.push({
      title: '',
      organization: '',
      period: '',
      description: ''
    });
  }

  removeExperience(index: number) {
    this.experiences.splice(index, 1);
  }

>>>>>>> origin/feat-last-push
  onCvSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cvFile = file;
<<<<<<< HEAD
      console.log('CV selected:', file.name);
=======
>>>>>>> origin/feat-last-push
    }
  }

  onCoverLetterSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverLetterFile = file;
<<<<<<< HEAD
      console.log('Cover letter selected:', file.name);
    }
  }
  addExperience() {
    if (!this.profile.experiences) { this.profile.experiences = []; }
    this.profile.experiences.push({ title: '', organization: '', period: '', description: '' });
  }

  removeExperience(index: number) {
    this.profile.experiences?.splice(index, 1);
=======
    }
  }

  // --- SUBMIT LOGIC ---
  onSubmit() {
    this.error = '';
    this.success = '';

    // Validation
    if (!this.fullName || !this.phone || !this.university) {
      this.error = 'Veuillez remplir les champs obligatoires (Nom, Téléphone, Université).';
      return;
    }

    this.isSubmitting = true;

    // Prepare JSON
    const profileData = {
      firstName: this.fullName.split(' ')[0],
      lastName: this.fullName.split(' ').slice(1).join(' ') || '',
      phone: this.phone,
      university: this.university,
      skills: this.skills,
      experiences: this.experiences
    };

    // Call Service
    this.studentService.updateProfile(profileData, this.cvFile, this.coverLetterFile)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.success = 'Profil mis à jour avec succès !';
          console.log('Success:', response);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update failed', err);
          this.error = 'Erreur: ' + (err.error?.message || 'Problème de connexion');
        }
      });
>>>>>>> origin/feat-last-push
  }
}
