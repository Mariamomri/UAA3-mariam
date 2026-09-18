import { Component, inject, OnInit } from '@angular/core';
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
  rendezvous: RendezVousAffichage[] = [];

  ngOnInit() {
    const patientId = localStorage.getItem('id');
    this.rendezvousService.getAll().subscribe((rendezvous) => {
      this.medecinService.getAll().subscribe((medecins) => {
        this.rendezvous = rendezvous
          .filter((rdv) => rdv.patientId === patientId)
          .map((rdv) => ({
            ...rdv,
            medecinNom: medecins.find((m) => m.id === rdv.medecinId)?.nom ?? 'Inconnu'
          }));
      });
    });
  }
}
