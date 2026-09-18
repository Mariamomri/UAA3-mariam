import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  erreur = '';

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.erreur = 'Veuillez remplir correctement le formulaire.';
      return;
    }
    const { email, password } = this.form.value;
    this.erreur = '';
    this.authService.loginAdmin(email, password).subscribe((admins) => {
      if (admins.length > 0) {
        this.connecter(admins[0].id!, 'admin');
        return;
      }
      this.authService.loginMedecin(email, password).subscribe((medecins) => {
        if (medecins.length > 0) {
          this.connecter(medecins[0].id!, 'medecin');
          return;
        }
        this.authService.loginPatient(email, password).subscribe((patients) => {
          if (patients.length > 0) {
            this.connecter(patients[0].id!, 'patient');
            return;
          }
          this.erreur = 'Email ou mot de passe incorrect.';
        });
      });
    });
  }

  private connecter(id: string, role: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
    this.router.navigate([`/${role}/dashboard`]);
  }
}
