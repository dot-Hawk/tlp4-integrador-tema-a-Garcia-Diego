export abstract class Vehiculo {
  readonly patente: string;
  constructor(patente: string) {
    this.patente = patente;
  }

  abstract calcularCosto(horas: number): number;
}

export class Auto extends Vehiculo {
  calcularCosto(horas: number): number {
    return 1200 * horas;
  }
}

export class Moto extends Vehiculo {
  calcularCosto(horas: number): number {
    return 600 * horas;
  }
}

export class Estacionamiento {
  private vehiculos: Vehiculo[] = [];
  static totalIngresos: number = 0;

  ingresar(item: Vehiculo): void {
    this.vehiculos.push(item);
    Estacionamiento.totalIngresos += 1;
  }

  get cantidad(): number {
    return this.vehiculos.length;
  }

  mostrarCostos(horas: number): void {
    for (const v of this.vehiculos) {
      console.log(`${v.patente}  paga $${v.calcularCosto(horas)}`);
    }
  }
}

const estacionamiento = new Estacionamiento();
estacionamiento.ingresar(new Auto("AB123CD"));
estacionamiento.ingresar(new Moto("A123BCD"));
estacionamiento.mostrarCostos(3);
console.log(`Vehículos estacionados: ${estacionamiento.cantidad}`);
console.log(`Total histórico de ingresos: ${Estacionamiento.totalIngresos}`);
