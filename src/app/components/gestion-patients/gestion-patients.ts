import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient-service';
import { Patient } from '../../models/patient';
import { TelephonePipe } from '../../pipes/telephone-pipe';

@Component({
  selector: 'app-gestion-patients',
  imports: [ReactiveFormsModule, TelephonePipe],
  templateUrl: './gestion-patients.html',
  styleUrl: './gestion-patients.css'
})
export class GestionPatients implements OnInit {
  private patientService = inject(PatientService);
  private fb = inject(FormBuilder);

  patients = signal<Patient[]>([]);
  idEnModification: string | null = null;

  form: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    telephone: ['', Validators.required]
  });

  ngOnInit() {
    this.chargerPatients();
  }

  chargerPatients() {
    this.patientService.getAll().subscribe((patients) => {
      this.patients.set(patients);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const patient = this.form.value;
    if (this.idEnModification) {
      this.patientService.update(this.idEnModification, patient).subscribe(() => {
        this.chargerPatients();
        this.annuler();
      });
    } else {
      this.patientService.create(patient).subscribe(() => {
        this.chargerPatients();
        this.annuler();
      });
    }
  }

  modifier(patient: Patient) {
    this.idEnModification = patient.id!;
    this.form.setValue({
      nom: patient.nom,
      email: patient.email,
      password: patient.password,
      telephone: patient.telephone
    });
  }

  supprimer(id: string) {
    this.patientService.delete(id).subscribe(() => {
      this.chargerPatients();
    });
  }

  annuler() {
    this.idEnModification = null;
    this.form.reset();
  }
}
