import { httpResource } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { Pais } from './pais';

/**
 * Carga el dataset una sola vez y lo expone como señal.
 * No hay API externa: los datos viven en `public/data/paises.json`.
 */
@Injectable({ providedIn: 'root' })
export class PaisesService {
  private readonly recurso = httpResource<Pais[]>(() => 'data/paises.json');

  readonly paises = computed(() => this.recurso.value() ?? []);
  readonly cargando = this.recurso.isLoading;
  readonly error = this.recurso.error;

  porId(id: string | undefined): Pais | undefined {
    if (!id) return undefined;
    const buscado = id.toLowerCase();
    return this.paises().find((p) => p.c3.toLowerCase() === buscado);
  }

  nombrePorId(id: string): string {
    return this.porId(id)?.n ?? id;
  }
}
