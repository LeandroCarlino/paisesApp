import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { formatearNumero, nombreIdioma, nombreMoneda, nombreRegion, urlBandera } from '../../core/pais';
import { PaisesService } from '../../core/paises.service';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  /** Viene del parámetro `:id` de la ruta (component input binding). */
  readonly id = input.required<string>();

  protected readonly servicio = inject(PaisesService);
  protected readonly cargando = this.servicio.cargando;
  protected readonly pais = computed(() => this.servicio.porId(this.id()));

  protected readonly formatearNumero = formatearNumero;
  protected readonly nombreRegion = nombreRegion;
  protected readonly urlBandera = urlBandera;

  protected readonly capital = computed(() => this.pais()?.cap.join(', ') || '—');

  protected readonly densidad = computed(() => {
    const pais = this.pais();
    if (!pais || !pais.area || !pais.pop) return null;
    const valor = pais.pop / pais.area;
    return `${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(valor)} hab./km²`;
  });

  protected readonly monedas = computed(() => {
    const lista = this.pais()?.cur ?? [];
    return lista.length ? lista.map(nombreMoneda).join(' · ') : '—';
  });

  protected readonly idiomas = computed(() => {
    const lista = (this.pais()?.lang ?? []).map(nombreIdioma);
    return lista.length
      ? lista.sort((a, b) => a.localeCompare(b, 'es')).join(', ')
      : '—';
  });

  protected readonly mapa = computed(() => {
    const pais = this.pais();
    return pais
      ? `https://www.google.com/maps/search/${encodeURIComponent(pais.n)}`
      : '';
  });

  private readonly titulo = inject(Title);

  constructor() {
    effect(() => {
      const pais = this.pais();
      if (pais) this.titulo.setTitle(`${pais.n} — Países`);
    });
  }

  protected nombreLimite(id: string): string {
    return this.servicio.nombrePorId(id);
  }
}
