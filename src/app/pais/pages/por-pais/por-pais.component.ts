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
  data!: Pais[];
  hayError: boolean = false;
  constructor(private paisService: PaisService) {}

  buscar() {
    this.hayError = false;
    this.data = [];
    this.paisService.buscar(this.termino).subscribe({
      next: (data) => {
        this.data = data;
        console.log(this.data);
      },
      error: () => {
        this.hayError = true;
      },
    });
  }
}
