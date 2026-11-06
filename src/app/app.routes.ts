import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Buscar países por nombre',
    data: { modo: 'nombre' },
    loadComponent: () => import('./pages/buscar/buscar').then((m) => m.Buscar),
  },
  {
    path: 'por-capital',
    title: 'Buscar países por capital',
    data: { modo: 'capital' },
    loadComponent: () => import('./pages/buscar/buscar').then((m) => m.Buscar),
  },
  {
    path: 'por-region',
    title: 'Buscar países por región',
    data: { modo: 'region' },
    loadComponent: () => import('./pages/buscar/buscar').then((m) => m.Buscar),
  },
  {
    path: 'pais/:id',
    title: 'Detalle del país',
    loadComponent: () => import('./pages/detalle/detalle').then((m) => m.Detalle),
  },
  { path: '**', redirectTo: '' },
];
