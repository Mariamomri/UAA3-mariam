import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RendezvousService } from '../../services/rendezvous-service';
import { PatientService } from '../../services/patient-service';
import { MedecinService } from '../../services/medecin-service';
import { RendezVous } from '../../models/rendezvous';
import { Patient } from '../../models/patient';
import { Medecin } from '../../models/medecin';

interface RendezVousAffichage extends RendezVous {
  patientNom: string;
  medecinNom: string;
}

@Component({
  selector: 'app-liste-rendezvous',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './liste-rendezvous.html',
  styleUrl: './liste-rendezvous.css'
})
export class ListeRendezvous implements OnInit {
  private rendezvousService = inject(RendezvousService);
  private patientService = inject(PatientService);
  private medecinService = inject(MedecinService);
  private fb = inject(FormBuilder);

  rendezvous = signal<RendezVousAffichage[]>([]);
  patients: Patient[] = [];
  medecins: Medecin[] = [];
  idEnModification: string | null = null;

  form: FormGroup = this.fb.group({
    date: ['', Validators.required],
    heure: ['', Validators.required],
    patientId: ['', Validators.required],
    medecinId: ['', Validators.required],
    etat: ['', Validators.required]
  });

  ngOnInit() {
    this.chargerDonnees();
  }

  chargerDonnees() {
    this.rendezvousService.getAll().subscribe((rendezvous) => {
      this.patientService.getAll().subscribe((patients) => {
        this.patients = patients;
        this.medecinService.getAll().subscribe((medecins) => {
          this.medecins = medecins;
          this.rendezvous.set(
            rendezvous.map((rdv) => ({
              ...rdv,
              patientNom: patients.find((p) => p.id === rdv.patientId)?.nom ?? 'Inconnu',
              medecinNom: medecins.find((m) => m.id === rdv.medecinId)?.nom ?? 'Inconnu'
            }))
          );
        });
      });
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const rendezvous = this.form.value;
    if (this.idEnModification) {
      this.rendezvousService.update(this.idEnModification, rendezvous).subscribe(() => {
        this.chargerDonnees();
        this.annuler();
      });
    } else {
      this.rendezvousService.create(rendezvous).subscribe(() => {
        this.chargerDonnees();
        this.annuler();
      });
    }
  }

  modifier(rdv: RendezVous) {
    this.idEnModification = rdv.id!;
    this.form.setValue({
      date: rdv.date,
      heure: rdv.heure,
      patientId: rdv.patientId,
      medecinId: rdv.medecinId,
      etat: rdv.etat
    });
  }

  supprimer(id: string) {
    this.rendezvousService.delete(id).subscribe(() => {
      this.chargerDonnees();
    });
  }

  annuler() {
    this.idEnModification = null;
    this.form.reset();
  }
}
