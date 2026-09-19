import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RendezvousService {
  private http = inject(HttpClient);
  private apiUrl = 'htpps://my-json-server.typicode.com/mariamomri/database-json-angular-CliniqueBru/rendezvous';

  getAll(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  getByPatientId(patientId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}?patientId=${patientId}`);
  }

  getByMedecinId(medecinId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}?medecinId=${medecinId}`);
  }

  create(rendezvous: Omit<RendezVous, 'id'>): Observable<RendezVous> {
    return this.http.post<RendezVous>(this.apiUrl, rendezvous);
  }

  update(id: string, rendezvous: Omit<RendezVous, 'id'>): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/${id}`, rendezvous);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
