import { Component } from '@angular/core';
import { Pais } from '../../interfaces/porPais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent {
  termino!: string;
  paises!: Pais[];
  hayError: boolean = false;
  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.paises = [];
    this.termino = termino;
    this.paisService.searchByCountry(this.termino).subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: () => {
        this.hayError = true;
      },
    });
  }
}
