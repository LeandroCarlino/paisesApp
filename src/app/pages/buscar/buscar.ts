import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Modo,
  Pais,
  REGIONES,
  filtrar,
  formatearNumero,
  nombreRegion,
  urlBandera,
} from '../../core/pais';
import { PaisesService } from '../../core/paises.service';

@Component({
  selector: 'app-buscar',
  imports: [RouterLink],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css',
})
export class Buscar {
  /** Viene del `data.modo` de la ruta (component input binding). */
  readonly modo = input<Modo>('nombre');

  private readonly servicio = inject(PaisesService);

  protected readonly paises = this.servicio.paises;
  protected readonly cargando = this.servicio.cargando;
  protected readonly error = this.servicio.error;

  protected readonly regiones = REGIONES;
  protected readonly termino = signal('');
  protected readonly region = signal<string | null>(null);

  protected readonly resultados = computed(() => {
    if (this.modo() === 'region') {
      const activa = this.region();
      return activa ? filtrar(this.paises(), 'region', activa) : [];
    }
    return filtrar(this.paises(), this.modo(), this.termino());
  });

  protected readonly hayConsulta = computed(() =>
    this.modo() === 'region'
      ? this.region() !== null
      : this.termino().trim().length > 0,
  );

  protected readonly texto = computed(() => {
    switch (this.modo()) {
      case 'capital':
        return {
          kicker: 'Por capital',
          titulo: '¿A dónde querés ir?',
          subtitulo: 'Buscá por capital: Madrid, Tokio, Ottawa…',
          marcador: 'Madrid, Tokio, Ottawa…',
        };
      case 'region':
        return {
          kicker: 'Por región',
          titulo: 'Explorá por región',
          subtitulo: 'Elegí un continente y mirá todos sus países.',
          marcador: '',
        };
      default:
        return {
          kicker: 'Por país',
          titulo: '¿Qué país querés conocer?',
          subtitulo: 'Buscá por nombre común u oficial entre 250 países y territorios.',
          marcador: 'Argentina, Japón, Nigeria…',
        };
    }
  });

  protected readonly formatearNumero = formatearNumero;
  protected readonly nombreRegion = nombreRegion;
  protected readonly urlBandera = urlBandera;

  protected limpiar(): void {
    this.termino.set('');
  }

  protected elegirRegion(id: string): void {
    this.region.set(this.region() === id ? null : id);
  }

  protected valorDe(evento: Event): string {
    return (evento.target as HTMLInputElement).value;
  }

  protected capital(pais: Pais): string {
    return pais.cap.length ? pais.cap.join(', ') : '—';
  }
}
