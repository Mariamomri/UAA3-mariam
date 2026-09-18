import { Component, computed, inject, OnInit, signal } from '@angular/core';
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

  role = signal('');
  connecte = computed(() => this.role() !== '');

  ngOnInit() {
    this.verifierConnexion();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verifierConnexion();
      }
    });
  }

  verifierConnexion() {
    this.role.set(localStorage.getItem('role') ?? '');
  }

  deconnexion() {
    this.authService.logout();
    this.role.set('');
    this.router.navigate(['/login']);
  }
}