export interface RendezVous {
  id?: string;
  date: string;
  heure: string;
  patientId: string;
  medecinId: string;
  etat: 'en attente' | 'confirmé' | 'annulé';
}