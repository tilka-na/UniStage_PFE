import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternshipService } from '../../services/internship.service';

@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.html',
  styleUrls: ['./offre-details.css']
})
export class OffreDetailsComponent implements OnInit {

  offre: any = null; // Hna fin ghadi n-7tto data
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private internshipService: InternshipService
  ) {}

  ngOnInit(): void {
    // 1. Jib l-ID mn l-URL (matalan: /offres/5)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // 2. 3yet l-Backend
      this.internshipService.getOfferById(Number(id)).subscribe({
        next: (data) => {
          this.offre = data;
          this.loading = false;
        },
        error: (err) => {
          console.error("Erreur:", err);
          this.loading = false;
        }
      });
    }
  }
}