import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InternshipService } from '../../services/internship.service';
import { Internship, Evaluation, Milestone } from '../../models/app-models';

@Component({
  selector: 'app-internship-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './internship-details.html',
  styleUrls: ['./internship-details.css']
})
export class InternshipDetailsComponent implements OnInit {
  internship: Internship | null = null;
  isLoading = true;
  errorMessage = '';
  isSubmittingEval = false;

  // 💡 Update 1: Extend type to support ENCADRANT
  userRole: 'STUDENT' | 'RECRUITER' | 'ENCADRANT' = 'ENCADRANT';

  newEvaluation: Evaluation = { grade: 0, comments: '', type: 'MID-TERM' };

  constructor(
    private internshipService: InternshipService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 💡 Update 2: Automatically extract the role from the route's custom data profile
    this.route.data.subscribe(data => {
      if (data['role']) {
        this.userRole = data['role'];
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (id) {
        this.loadData(id);
      } else {
        this.errorMessage = "Aucun identifiant de dossier n'a été fourni.";
        this.isLoading = false;
      }
    });
  }

  loadData(id: number): void {
    this.isLoading = true;
    this.internshipService.getInternshipDetails(id).subscribe({
      next: (data) => {
        console.log("Data jaya mn l-Backend:", data);
        this.internship = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur API:", err);
        this.errorMessage = "Impossible de contacter le serveur.";
        this.isLoading = false;
      }
    });
  }

  onValidateMilestone(milestone: Milestone): void {
    if (!milestone.id) return;

    const oldStatus = milestone.status;
    milestone.status = 'COMPLETED';

    this.internshipService.validateMilestone(milestone.id).subscribe({
      next: () => console.log('Milestone validé'),
      error: () => {
        milestone.status = oldStatus;
        alert("Erreur lors de la validation.");
      }
    });
  }

  onSubmitEvaluation(): void {
    if (!this.internship?.id) return;

    this.isSubmittingEval = true;
    this.internshipService.addEvaluation(this.internship.id, this.newEvaluation).subscribe({
      next: (res) => {
        if (this.internship) {
          if (!this.internship.evaluations) this.internship.evaluations = [];
          this.internship.evaluations.unshift({ ...this.newEvaluation });
        }
        this.newEvaluation = { grade: 0, comments: '', type: 'MID-TERM' };
        this.isSubmittingEval = false;
      },
      error: () => {
        this.isSubmittingEval = false;
        alert("Erreur lors de l'ajout de l'évaluation.");
      }
    });
  }

  get progress(): number {
    if (!this.internship?.milestones?.length) return 0;
    const completed = this.internship.milestones.filter(m => m.status === 'COMPLETED').length;
    return Math.round((completed / this.internship.milestones.length) * 100);
  }
}
