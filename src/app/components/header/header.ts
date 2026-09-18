import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  estConnecte = false;

  ngOnInit() {
    this.verifierConnexion();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.verifierConnexion();
    });
  }

  verifierConnexion() {
    this.estConnecte = localStorage.getItem('role') !== null;
  }

  logout() {
    this.authService.logout();
    this.estConnecte = false;
    this.router.navigate(['/login']);
  }
}