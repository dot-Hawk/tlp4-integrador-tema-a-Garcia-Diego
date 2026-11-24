import { describe, it, vi } from 'vitest';
import type { Comprobante } from '../src/ejercicio3.ts';

function crearComprobanteFalso() {
  return { emitir: vi.fn() } satisfies Comprobante;
}

describe('Ej. 3 - Cobrador con un comprobante falso', () => {
  it.todo('con un monto válido llama a emitir una sola vez con el texto del cobro');
  it.todo('con monto 0 lanza RangeError y NO llama a emitir');
});
