import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service'; // Create this or use AuthService

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-user-list.component.html'
})
export class AdminUserListComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(data => this.users = data);
  }

  toggleUserStatus(user: any) {
    // This calls your backend to enable/disable the account
    this.adminService.updateUserStatus(user.id, !user.enabled).subscribe(() => {
      user.enabled = !user.enabled;
    });
  }
}
