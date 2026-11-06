import { Pais, filtrar, normalizar, urlBandera } from './pais';

function pais(parcial: Partial<Pais>): Pais {
  return {
    n: '',
    o: '',
    en: '',
    c2: '',
    c3: '',
    cap: [],
    reg: '',
    sub: '',
    pop: 0,
    popYear: null,
    area: 0,
    lang: [],
    cur: [],
    flag: '',
    bor: [],
    tld: [],
    un: false,
    ...parcial,
  };
}

describe('normalizar', () => {
  it('pasa a minúsculas y quita acentos', () => {
    expect(normalizar('  PerÚ ')).toBe('peru');
    expect(normalizar('Córdoba')).toBe('cordoba');
  });
});

describe('filtrar', () => {
  const paises = [
    pais({ n: 'Argentina', o: 'República Argentina', c3: 'ARG', cap: ['Buenos Aires'], reg: 'Americas' }),
    pais({ n: 'Perú', o: 'República del Perú', c3: 'PER', cap: ['Lima'], reg: 'Americas' }),
    pais({ n: 'Japón', o: 'Japan', c3: 'JPN', cap: ['Tokio', 'Kyoto'], reg: 'Asia' }),
  ];

  it('busca por nombre ignorando acentos', () => {
    expect(filtrar(paises, 'nombre', 'peru').map((p) => p.c3)).toEqual(['PER']);
  });

  it('busca por nombre oficial', () => {
    expect(filtrar(paises, 'nombre', 'republica').map((p) => p.c3)).toEqual(['ARG', 'PER']);
  });

  it('busca por capital', () => {
    expect(filtrar(paises, 'capital', 'lima').map((p) => p.c3)).toEqual(['PER']);
  });

  it('busca por cualquiera de las capitales', () => {
    expect(filtrar(paises, 'capital', 'kyoto').map((p) => p.c3)).toEqual(['JPN']);
  });

  it('filtra por región, ordenado por nombre', () => {
    expect(filtrar(paises, 'region', 'Americas').map((p) => p.c3)).toEqual(['ARG', 'PER']);
  });

  it('devuelve vacío si no hay término', () => {
    expect(filtrar(paises, 'nombre', '   ')).toEqual([]);
  });
});

describe('urlBandera', () => {
  it('arma la URL de flagcdn con el código ISO', () => {
    expect(urlBandera(pais({ c2: 'AR' }), 80)).toBe('https://flagcdn.com/w80/ar.png');
  });

  it('devuelve vacío si no hay código', () => {
    expect(urlBandera(pais({ c2: '' }))).toBe('');
  });
});
