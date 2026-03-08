import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternshipService } from '../../services/internship.service';
import { CommonModule } from '@angular/common'; // Ila knti f Standalone component

@Component({
  selector: 'app-offre-details',
  standalone: true, // Ila knti dayra standalone (sinon 7yydiha)
  imports: [CommonModule], // Ila knti dayra standalone
  templateUrl: './offre-details.html',
  styleUrls: ['./offre-details.css']
})
export class OffreDetailsComponent implements OnInit {

  offre: any = null; // Hna fin ghadi n-khbbiw data
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: InternshipService
  ) {}

  ngOnInit(): void {
    // 1. Jib l-ID mn l-URL
    const id = this.route.snapshot.paramMap.get('id');

    // 2. Ila l-ID kayn, jib data mn Backend
    if (id) {
      this.service.getOffreById(Number(id)).subscribe({
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