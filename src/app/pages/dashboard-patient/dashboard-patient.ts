import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RendezvousService } from '../../services/rendezvous-service';
import { MedecinService } from '../../services/medecin-service';
import { RendezVous } from '../../models/rendezvous';

interface RendezVousAffichage extends RendezVous {
  medecinNom: string;
}

@Component({
  selector: 'app-dashboard-patient',
  imports: [DatePipe],
  templateUrl: './dashboard-patient.html',
  styleUrl: './dashboard-patient.css'
})
export class DashboardPatient implements OnInit {
  private rendezvousService = inject(RendezvousService);
  private medecinService = inject(MedecinService);
  // signal() au lieu d'une simple propriété : le projet n'utilise pas zone.js,
  // donc sans signal la vue ne se met pas à jour quand les données arrivent de manière asynchrone (subscribe).
  rendezvous = signal<RendezVousAffichage[]>([]);

  ngOnInit() {
    const patientId = localStorage.getItem('id');
    this.rendezvousService.getAll().subscribe((rendezvous) => {
      this.medecinService.getAll().subscribe((medecins) => {
        this.rendezvous.set(
          rendezvous
            .filter((rdv) => rdv.patientId === patientId)
            .map((rdv) => ({
              ...rdv,
              medecinNom: medecins.find((m) => m.id === rdv.medecinId)?.nom ?? 'Inconnu'
            }))
        );
      });
    });
  }
}
