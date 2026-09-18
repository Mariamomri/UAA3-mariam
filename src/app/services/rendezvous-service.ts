import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous';

@Injectable({
  providedIn: 'root',
})
export class RendezvousService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/rendezvous';

  getAll(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  getByPatientId(patientId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}?patientId=${patientId}`);
  }

  getByMedecinId(medecinId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}?medecinId=${medecinId}`);
  }
}