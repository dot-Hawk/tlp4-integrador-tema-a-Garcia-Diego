/*
consoleass ImpresoraTickets {
  imprimir(texto: string): void {
    console.log(`[Impreso] ${texto}`);
  }
}

class Cobrador {
  cobrar(medio: string, monto: number): void {
    if (monto <= 0) {
      throw new RangeError("El monto debe ser mayor a 0");
    }
    let total = monto;
    if (medio === "Tarjeta") {
      total = monto + 300;
    }
    const impresora = new ImpresoraTickets();
    impresora.imprimir(`${medio}: $${total}`);
  }
}


const cobrador = new Cobrador();
cobrador.cobrar("Efectivo", 3000);
cobrador.cobrar("Tarjeta", 3000);

*/

//OCP
export interface MedioPago {
  nombre: string;

  calcularTotal(monto: number): number;
}

export class Efectivo implements MedioPago {
  nombre: string = "Efectivo";

  calcularTotal(monto: number): number {
    return monto;
  }
}

export class Tarjeta implements MedioPago {
  nombre: string = "Tarjeta";

  calcularTotal(monto: number): number {
    return monto + 300;
  }
}

// DIP
export interface Comprobante {
  emitir(texto: string): void;
}

export class ComprobanteImpreso implements Comprobante {
  emitir(texto: string): void {
    console.log(`[Impreso] ${texto}`);
  }
}

export class ComprobanteDigital implements Comprobante {
  emitir(texto: string): void {
    console.log(`[Digital] ${texto}`);
  }
}

export class Cobrador {
  comprobante: Comprobante;

  constructor(comprobante: Comprobante) {
    this.comprobante = comprobante;
  }

  cobrar(medio: MedioPago, monto: number): void {}
}

const enCaja = new Cobrador(new ComprobanteImpreso());
enCaja.cobrar(new Efectivo(), 3000);
enCaja.cobrar(new Tarjeta(), 3000);

const online = new Cobrador(new ComprobanteDigital());
online.cobrar(new Tarjeta(), 1000);
