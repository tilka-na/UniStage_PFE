import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { InternshipService } from '../../services/internship.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-offres-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './offres-list.html',
  styleUrls: ['./offres-list.css']
})
export class OffresListComponent implements OnInit {
  offres: any[] = [];
  offresFiltrees: any[] = [];

  constructor(private internshipService: InternshipService) {}

  ngOnInit(): void {
    this.internshipService.getOffres().subscribe((data) => {
      this.offres = data;
      this.offresFiltrees = data;
    });
  }

  filterOffres(keyword: string): void {
    this.offresFiltrees = this.offres.filter(o => 
      o.titre.toLowerCase().includes(keyword.toLowerCase()) ||
      o.entreprise.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}