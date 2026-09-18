import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedecinService } from '../../services/medecin-service';
import { Medecin } from '../../models/medecin';
import { TelephonePipe } from '../../pipes/telephone-pipe';

@Component({
  selector: 'app-gestion-medecins',
  imports: [ReactiveFormsModule, TelephonePipe],
  templateUrl: './gestion-medecins.html',
  styleUrl: './gestion-medecins.css'
})
export class GestionMedecins implements OnInit {
  private medecinService = inject(MedecinService);
  private fb = inject(FormBuilder);

  medecins = signal<Medecin[]>([]);
  idEnModification: string | null = null;

  form: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    telephone: ['', Validators.required],
    specialite: ['', Validators.required]
  });

  ngOnInit() {
    this.chargerMedecins();
  }

  chargerMedecins() {
    this.medecinService.getAll().subscribe((medecins) => {
      this.medecins.set(medecins);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const medecin = this.form.value;
    if (this.idEnModification) {
      this.medecinService.update(this.idEnModification, medecin).subscribe(() => {
        this.chargerMedecins();
        this.annuler();
      });
    } else {
      this.medecinService.create(medecin).subscribe(() => {
        this.chargerMedecins();
        this.annuler();
      });
    }
  }

  modifier(medecin: Medecin) {
    this.idEnModification = medecin.id!;
    this.form.setValue({
      nom: medecin.nom,
      email: medecin.email,
      password: medecin.password,
      telephone: medecin.telephone,
      specialite: medecin.specialite
    });
  }

  supprimer(id: string) {
    this.medecinService.delete(id).subscribe(() => {
      this.chargerMedecins();
    });
  }

  annuler() {
    this.idEnModification = null;
    this.form.reset();
  }
}
