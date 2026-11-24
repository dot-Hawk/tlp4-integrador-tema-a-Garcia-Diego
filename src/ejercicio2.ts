export interface Ticket {
  calcularTotal(horas: number): number;
}

export class TarifarioEstacionamiento {
  private static instancia: TarifarioEstacionamiento;
  readonly recargoNocturno: number = 500;
  private constructor() {}

  static obtenerInstancia(): TarifarioEstacionamiento {
    if (!TarifarioEstacionamiento.instancia) {
      TarifarioEstacionamiento.instancia = new TarifarioEstacionamiento();
    }
    return TarifarioEstacionamiento.instancia;
  }
}

export class TicketDiurno implements Ticket {
  calcularTotal(horas: number): number {
    if (!Number.isFinite(horas) || horas < 1 || horas >= 25) {
      throw new RangeError("Cantidad de hora inválida");
    }
    return horas * 1000;
  }
}

export class TicketNocturno implements Ticket {
  calcularTotal(horas: number): number {
    if (!Number.isFinite(horas) || horas < 1 || horas >= 25) {
      throw new RangeError("Cantidad de hora inválida");
    }

    return horas * 1000 + TarifarioEstacionamiento.obtenerInstancia().recargoNocturno;
  }
}

export class FabricaTickets {
  static crear(tipo: string): Ticket {
    switch (tipo.toLocaleLowerCase()) {
      case "diurno":
        return new TicketDiurno();
      case "nocturno":
        return new TicketNocturno();
      default:
        throw new RangeError();
    }
  }
}

const config1 = TarifarioEstacionamiento.obtenerInstancia();
const config2 = TarifarioEstacionamiento.obtenerInstancia();
console.log(`Mismo tarifario: ${config1 === config2}`);

const primero = FabricaTickets.crear("diurno");
const segundo = FabricaTickets.crear("nocturno");
console.log(`Diurno 3 h: $${primero.calcularTotal(3)}`);
console.log(`Nocturno 3 h: $${segundo.calcularTotal(3)}`);
