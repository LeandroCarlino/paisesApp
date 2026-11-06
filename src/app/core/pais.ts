/** Registro de país tal como viene en `public/data/paises.json`. */
export interface Pais {
  n: string; // nombre común en español
  o: string; // nombre oficial en español
  en: string; // nombre común en inglés (para buscar)
  c2: string; // ISO 3166-1 alfa-2
  c3: string; // ISO 3166-1 alfa-3
  cap: string[];
  reg: string;
  sub: string;
  pop: number;
  popYear: number | null;
  area: number;
  lang: string[];
  cur: string[];
  flag: string;
  bor: string[];
  tld: string[];
  un: boolean;
}

export type Modo = 'nombre' | 'capital' | 'region';

export interface Region {
  id: string;
  nombre: string;
  emoji: string;
}

export const REGIONES: readonly Region[] = [
  { id: 'Americas', nombre: 'América', emoji: '🌎' },
  { id: 'Europe', nombre: 'Europa', emoji: '🌍' },
  { id: 'Asia', nombre: 'Asia', emoji: '🌏' },
  { id: 'Africa', nombre: 'África', emoji: '🌍' },
  { id: 'Oceania', nombre: 'Oceanía', emoji: '🌏' },
  { id: 'Antarctic', nombre: 'Antártida', emoji: '🧊' },
];

/** Minúsculas y sin acentos, para comparar búsquedas. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function nombreRegion(id: string): string {
  return REGIONES.find((r) => r.id === id)?.nombre ?? id;
}

export function formatearNumero(valor: number): string {
  return new Intl.NumberFormat('es-AR').format(valor);
}

/**
 * Filtra los países según el modo de búsqueda.
 * - `nombre`: coincide con el nombre común u oficial.
 * - `capital`: coincide con alguna de sus capitales.
 * - `region`: coincidencia exacta con la región.
 */
export function filtrar(
  paises: readonly Pais[],
  modo: Modo,
  termino: string,
): Pais[] {
  const q = normalizar(termino);
  if (!q) return [];

  const coincide = (p: Pais): boolean => {
    if (modo === 'nombre') {
      return (
        normalizar(p.n).includes(q) ||
        normalizar(p.o).includes(q) ||
        normalizar(p.en).includes(q)
      );
    }
    if (modo === 'capital') {
      return p.cap.some((c) => normalizar(c).includes(q));
    }
    return p.reg === termino;
  };

  return paises
    .filter(coincide)
    .sort((a, b) => a.n.localeCompare(b.n, 'es'));
}

/** URL de la bandera en flagcdn; usa el emoji como respaldo si no hay ISO. */
export function urlBandera(pais: Pais, ancho: 80 | 320 = 320): string {
  return pais.c2
    ? `https://flagcdn.com/w${ancho}/${pais.c2.toLowerCase()}.png`
    : '';
}

const idiomas = new Intl.DisplayNames(['es'], { type: 'language' });
const monedas = new Intl.DisplayNames(['es'], { type: 'currency' });

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Nombre del idioma en español a partir de su código ISO 639. */
export function nombreIdioma(codigo: string): string {
  try {
    return capitalizar(idiomas.of(codigo) ?? codigo);
  } catch {
    return codigo;
  }
}

/** «euro (EUR)» a partir del código ISO 4217. */
export function nombreMoneda(codigo: string): string {
  try {
    const nombre = monedas.of(codigo);
    return nombre ? `${capitalizar(nombre)} (${codigo})` : codigo;
  } catch {
    return codigo;
  }
}
