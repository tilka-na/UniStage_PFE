import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../../services/internship.service';
import { Internship } from '../../models/app-models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-encadrant-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './encadrant-dashboard.html'
})
export class EncadrantDashboardComponent implements OnInit {
  myStudents: Internship[] = [];

  constructor(private internshipService: InternshipService) {}

  ngOnInit(): void {
    // Call your new service function from Step 1
    this.internshipService.getProfessorInternships().subscribe({
      next: (data) => {
        this.myStudents = data; // Saves the array of assigned students
      },
      error: (err) => console.error("Error loading roster:", err)
    });
  }
}
