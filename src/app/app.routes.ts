import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardMedecin } from './pages/dashboard-medecin/dashboard-medecin';
import { DashboardPatient } from './pages/dashboard-patient/dashboard-patient';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'admin/dashboard', component: DashboardAdmin },
  { path: 'medecin/dashboard', component: DashboardMedecin },
  { path: 'patient/dashboard', component: DashboardPatient },
];