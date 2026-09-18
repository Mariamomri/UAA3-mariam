import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  connecte = false;
  role = '';

  ngOnInit() {
    this.verifierConnexion();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verifierConnexion();
      }
    });
  }

  verifierConnexion() {
    this.role = localStorage.getItem('role') ?? '';
    this.connecte = this.role !== '';
  }

  deconnexion() {
    this.authService.logout();
    this.connecte = false;
    this.role = '';
    this.router.navigate(['/login']);
  }
}
