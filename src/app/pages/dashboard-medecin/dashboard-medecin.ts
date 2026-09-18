import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RendezvousService } from '../../services/rendezvous-service';
import { PatientService } from '../../services/patient-service';
import { RendezVous } from '../../models/rendezvous';

interface RendezVousAffichage extends RendezVous {
  patientNom: string;
}

@Component({
  selector: 'app-dashboard-medecin',
  imports: [DatePipe],
  templateUrl: './dashboard-medecin.html',
  styleUrl: './dashboard-medecin.css'
})
export class DashboardMedecin implements OnInit {
  private rendezvousService = inject(RendezvousService);
  private patientService = inject(PatientService);

  rendezvous = signal<RendezVousAffichage[]>([]);

  ngOnInit() {
    const medecinId = localStorage.getItem('id')!;
    this.rendezvousService.getByMedecinId(medecinId).subscribe((rendezvous) => {
      this.patientService.getAll().subscribe((patients) => {
        this.rendezvous.set(
          rendezvous.map((rdv) => ({
            ...rdv,
            patientNom: patients.find((p) => p.id === rdv.patientId)?.nom ?? 'Inconnu'
          }))
        );
      });
    });
  }
}