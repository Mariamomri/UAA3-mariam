import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from '../models/medecin';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedecinService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/medecins`;

  getAll(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(this.apiUrl);
  }

  create(medecin: Omit<Medecin, 'id'>): Observable<Medecin> {
    return this.http.post<Medecin>(this.apiUrl, medecin);
  }

  update(id: string, medecin: Omit<Medecin, 'id'>): Observable<Medecin> {
    return this.http.put<Medecin>(`${this.apiUrl}/${id}`, medecin);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}