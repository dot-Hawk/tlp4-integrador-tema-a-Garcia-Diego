import { describe, expect, it } from "vitest";
import { FabricaTickets, TarifarioEstacionamiento } from "../src/ejercicio2.ts";

describe("Ej. 2 - Tickets del estacionamiento", () => {
  it("un ticket diurno de 3 horas cuesta $3000", () => {
    expect(FabricaTickets.crear("diurno").calcularTotal(3)).toBe(3000);
  });

  it("funcion obtenerInstancia() devuelve siempre la misma instancia", () => {
    expect(TarifarioEstacionamiento.obtenerInstancia()).toBe(
      TarifarioEstacionamiento.obtenerInstancia(),
    );
  });
  it("La fábrica lanza error con un tipo desconocido", () => {
    expect(() => {
      FabricaTickets.crear("tarde");
    }).toThrow(RangeError());
  });

  it("Horas debe de ser un número entero entre 1 y 24", () => {
    expect(() => {
      FabricaTickets.crear("nocturno").calcularTotal(0);
    }).toThrow(RangeError("Cantidad de hora inválida"));
  });

  it("Horas debe de ser un número entero entre 1 y 24", () => {
    expect(() => {
      FabricaTickets.crear("nocturno").calcularTotal(26);
    }).toThrow(RangeError("Cantidad de hora inválida"));
  });

  it("Horas debe de ser un número entero entre 1 y 24", () => {
    expect(() => {
      FabricaTickets.crear("nocturno").calcularTotal(30.4);
    }).toThrow(RangeError("Cantidad de hora inválida"));
  });
});
