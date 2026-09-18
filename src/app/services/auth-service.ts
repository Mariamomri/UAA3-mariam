import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { Medecin } from '../models/medecin';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  loginAdmin(email: string, password: string) {
    return this.http.get<Admin[]>(
      `${this.apiUrl}/admins?email=${email}&password=${password}`
    );
  }

  loginMedecin(email: string, password: string) {
    return this.http.get<Medecin[]>(
      `${this.apiUrl}/medecins?email=${email}&password=${password}`
    );
  }

  loginPatient(email: string, password: string) {
    return this.http.get<Patient[]>(
      `${this.apiUrl}/patients?email=${email}&password=${password}`
    );
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }
}