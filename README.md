# TLP IV · Examen integrador · Parte práctica · **TEMA A**

Proyecto de TypeScript con Vitest **ya configurado**: no tenés que crear `package.json`, `tsconfig.json` ni `.gitignore`.
Escribí el código en `src/ejercicio1.ts`, `src/ejercicio2.ts` y `src/ejercicio3.ts`, y los tests en `tests/ej2.test.ts` y `tests/ej3.test.ts`.

> **No está permitido usar asistentes de IA.**
> Antes de empezar, completá tus datos en `ENTREGA.md`.

**Tiempo: 2 horas.** Para aprobar la parte práctica hay que resolver correctamente **al menos 2 de los 3 ejercicios**. La parte práctica solo se corrige si la parte teórica está aprobada.

---

## 1. Puesta en marcha

Requisito: Node.js 20 o superior.

```bash
npm install          # instala TypeScript, tsx y Vitest
npm run ej1          # ejecuta src/ejercicio1.ts
npm run ej2          # ejecuta src/ejercicio2.ts
npm run ej3          # ejecuta src/ejercicio3.ts
npm test             # corre los tests de la carpeta tests/
npm run typecheck    # verifica los tipos con tsc
```

Al principio `npm run typecheck` muestra errores y `npm test` falla en `tests/ej2.test.ts`, porque faltan las clases que tenés que escribir. Es parte del examen.

## 2. Reglas del código

- `npm run typecheck` no tiene que mostrar errores **en los archivos del ejercicio** (su `src/ejercicioN.ts` y, si tiene, su archivo de tests). Los ejercicios que no resuelvas pueden seguir con errores.
- Cada ejercicio se tiene que ejecutar con su `npm run ejN` y mostrar **exactamente** la salida esperada.
- `npm test`: los tests que escribas tienen que pasar.
- No se permite usar `enum`, _parameter properties_ (`constructor(private x: string)`) ni `any`.
- Cada clase e interfaz que escribas lleva `export` delante.
- Cada archivo de `src/` trae al final un **bloque de prueba**: escribí tu código arriba y **no lo modifiques** (en el ejercicio 3 lo reemplazás como se indica).
- Respetá exactamente los nombres de clases, interfaces, métodos y atributos de la consigna.

Un ejercicio está **resuelto correctamente** cuando sus archivos no tienen errores de `tsc`, corre sin errores, muestra la salida esperada, sus tests pasan y cumple todos los requisitos de la consigna.

---

## Ejercicio 1 — Estacionamiento

**Archivo:** `src/ejercicio1.ts` · **Temas:** clase abstracta, herencia, polimorfismo, `readonly`, `private`, `static`, getter.

Un estacionamiento cobra por hora según el tipo de vehículo.

1. Clase abstracta `Vehiculo` con `patente: string` como `readonly` (se recibe en el constructor) y un método abstracto `calcularCosto(horas: number): number`.
2. Dos subclases que extienden `Vehiculo`: `Auto` ($1200 por hora) y `Moto` ($600 por hora).
3. Clase `Estacionamiento` con:
   - un arreglo **privado** de `Vehiculo`;
   - `ingresar(item: Vehiculo): void`: lo agrega al arreglo;
   - un atributo `static totalIngresos` que cuente cuántos se agregaron en total, entre todas las instancias;
   - un getter `cantidad` que devuelva cuántos hay en el arreglo;
   - `mostrarCostos(horas)`: recorre el arreglo y muestra cuánto paga cada uno, llamando al método de cada objeto (**sin `if` por tipo**).

**Salida esperada** (`npm run ej1`):

```
AB123CD paga $3600
A123BCD paga $1800
Vehículos estacionados: 2
Total histórico de ingresos: 2
```

---

## Ejercicio 2 — Tickets del estacionamiento

**Archivos:** `src/ejercicio2.ts` y `tests/ej2.test.ts` · **Temas:** interfaces, Singleton, Factory Method, casos límite e inválidos.

El estacionamiento emite tickets diurnos y nocturnos.

**Parte A · Código** (`src/ejercicio2.ts`)

1. **Singleton** `TarifarioEstacionamiento`: constructor privado, método estático `obtenerInstancia()` y un atributo `readonly recargoNocturno = 500`.
2. Interfaz `Ticket` con el método `calcularTotal(horas: number): number`.
3. Dos clases que implementan `Ticket`:
   - `TicketDiurno`: devuelve `horas × 1000`.
   - `TicketNocturno`: devuelve `horas × 1000` más el `recargoNocturno` **leído del Singleton**.
4. **Regla R1:** `horas` tiene que ser un número **entero entre 1 y 24** (inclusive). Si no se cumple, `calcularTotal` lanza `RangeError` (en las dos clases).
5. **Factory** `FabricaTickets` con un método estático `crear(tipo: string): Ticket`: `"diurno"` crea un `TicketDiurno`, `"nocturno"` crea un `TicketNocturno` y cualquier otro tipo lanza `Error`. Fuera de la fábrica nadie usa `new TicketDiurno` ni `new TicketNocturno`.

**Salida esperada** (`npm run ej2`):

```
Mismo tarifario: true
Diurno 3 h: $3000
Nocturno 3 h: $3500
```

**Parte B · Tests** (`tests/ej2.test.ts`)

El archivo trae un solo test. Agregá tests que verifiquen, como mínimo:

- que `obtenerInstancia()` devuelve siempre la **misma instancia**;
- que la fábrica lanza `Error` con un **tipo desconocido**;
- **dos casos límite** de la regla R1 (valores justo en el borde);
- **un caso inválido** de la regla R1 que no sea un límite.

---

## Ejercicio 3 — Cobros del estacionamiento

**Archivos:** `src/ejercicio3.ts` y `tests/ej3.test.ts` · **Temas:** SOLID (OCP y DIP) y dobles de prueba.

**Parte A · Refactorización** (`src/ejercicio3.ts`)

El archivo trae el código original de un cobrador. Funciona (`npm run ej3`), pero tiene dos problemas: cada medio de pago nuevo obliga a agregar otro `if`, y la clase crea su propia dependencia concreta (`new ImpresoraTickets()`). Refactorizalo:

1. **OCP:** interfaz `MedioPago` (con `nombre: string` y `calcularTotal(monto: number): number`) y una clase por cada medio: `Efectivo` (nombre `"Efectivo"`, cobra el monto) y `Tarjeta` (nombre `"Tarjeta"`, cobra el monto más $300). `Cobrador.cobrar(medio: MedioPago, monto: number)` no tiene ningún `if` por medio de pago.
2. **DIP:** `Cobrador` no crea su dependencia. Recibe por constructor una interfaz `Comprobante` (método `emitir(texto: string): void`), con dos implementaciones: `ComprobanteImpreso` (muestra `[Impreso] ...`) y `ComprobanteDigital` (muestra `[Digital] ...`).
3. `cobrar` tiene que seguir lanzando `RangeError` si el monto es 0 o negativo, **antes** de emitir el comprobante.
4. Arriba de cada interfaz nueva, un comentario de una línea indicando qué principio aplica.
5. Reemplazá las últimas líneas del archivo (desde la creación del objeto) por este bloque de prueba, que tiene que quedar al final:

```ts
const enCaja = new Cobrador(new ComprobanteImpreso());
enCaja.cobrar(new Efectivo(), 3000);
enCaja.cobrar(new Tarjeta(), 3000);

const online = new Cobrador(new ComprobanteDigital());
online.cobrar(new Tarjeta(), 1000);
```

**Salida esperada** (`npm run ej3`):

```
[Impreso] Efectivo: $3000
[Impreso] Tarjeta: $3300
[Digital] Tarjeta: $1300
```

**Parte B · Test con un doble** (`tests/ej3.test.ts`)

Completá los dos `it.todo` usando el `crearComprobanteFalso()` que ya está en el archivo (su método `emitir` es una función espía `vi.fn()`):

- con un monto válido, `cobrar` llama a `emitir` **una sola vez** y con el texto exacto del cobro (por ejemplo, `Tarjeta` con 1000 → `"Tarjeta: $1300"`);
- con monto 0, `cobrar` lanza `RangeError` y **no** llama a `emitir`.

---

## Entrega

1. `npm test` y `npm run typecheck` tienen que terminar sin errores en los ejercicios que resolviste. Los tests de los que no hayas resuelto pueden quedar como están.
2. Completá `ENTREGA.md` con tus datos.
3. Comprimí la carpeta del proyecto **sin `node_modules`** y entregala como indique el docente.

---

## Ayuda memoria

```ts
import { describe, it, expect, vi } from 'vitest';

describe('grupo', () => {
  it('caso', () => {
    expect(valor).toBe(900);                     // igualdad estricta
    expect(a).toBe(b);                           // el mismo objeto
    expect(objeto).toBeInstanceOf(Clase);
    expect(() => fn(150)).toThrow(RangeError);   // la función lanza ese tipo de error
    expect(() => fn(10)).not.toThrow();
  });
});

// Funciones espía
const espia = vi.fn();
expect(espia).toHaveBeenCalledTimes(1);
expect(espia).toHaveBeenCalledWith('texto');
expect(espia).not.toHaveBeenCalled();
```
