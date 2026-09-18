import { Component, signal } from '@angular/core';
import { GestionPatients } from '../../components/gestion-patients/gestion-patients';
import { GestionMedecins } from '../../components/gestion-medecins/gestion-medecins';
import { ListeRendezvous } from '../../components/liste-rendezvous/liste-rendezvous';

type Onglet = 'patients' | 'medecins' | 'rendezvous';

@Component({
  selector: 'app-dashboard-admin',
  imports: [GestionPatients, GestionMedecins, ListeRendezvous],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {
  onglet = signal<Onglet>('patients');

  changerOnglet(onglet: Onglet) {
    this.onglet.set(onglet);
  }
}
