import { Component, inject, OnInit, signal } from '@angular/core';
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
  // signal() au lieu d'une simple propriété : le projet n'utilise pas zone.js,
  // donc sans signal le header ne se met pas forcément à jour quand la
  // navigation (router.events, asynchrone) change l'état de connexion.
  connecte = signal(false);
  role = signal('');

  ngOnInit() {
    this.verifierConnexion();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verifierConnexion();
      }
    });
  }

  verifierConnexion() {
    const role = localStorage.getItem('role') ?? '';
    this.role.set(role);
    this.connecte.set(role !== '');
  }

  deconnexion() {
    this.authService.logout();
    this.connecte.set(false);
    this.role.set('');
    this.router.navigate(['/login']);
  }
}
