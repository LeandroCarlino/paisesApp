import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css'],
})
export class PaisInputComponent {
  termino: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  buscar() {
    this.onEnter.emit(this.termino)
  }
}
