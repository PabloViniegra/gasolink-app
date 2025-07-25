// Select Item

export interface SelectItem {
  key: string;
  label: string;
}

// Provincias

export interface Province {
  idProvincia: number;
  nombreProvincia: string;
}

// Municipios de una provincia

export interface Locality {
  idMunicipio: number;
  nombreMunicipio: string;
  idProvincia: number;
}

// Estaciones

export interface Station {
  idEstacion: number;
  nombreEstacion: string;
  rotulo: string; // Added for sorting by name
  precioProducto?: number; // Added for sorting by price
  longitud: string;
  latitud: string;
  margen: string;
  codPostal: string;
  direccion: string;
  horario: string;
  tipoVenta: string;
  idMunicipio: number;
  lastUpdate: string;
  localidad: string;
  Gasolina95: string;
  Gasolina95_media: string;
  Gasolina98: string | null;
  Gasolina98_media: string | null;
  Diesel: string;
  Diesel_media: string;
  DieselPremium: string | null;
  DieselPremium_media: string | null;
  DieselB: string | null;
  DieselB_media: string | null;
  GLP: string | null;
  GLP_media: string | null;
  provincia: string;
  provinciaDistrito: string;
  marca: string;
  Simples95: string | null;
  Simples95_media: string | null;
  Simples98: string | null;
  Simples98_media: string | null;
  Gasoleo: string | null;
  Gasoleo_media: string | null;
  GasoleoEspecial: string | null;
  GasoleoEspecial_media: string | null;
  Especial98: string | null;
  Especial98_media: string | null;
  GPL: string | null;
  GPL_media: string | null;
  Especial95: string | null;
  Especial95_media: string | null;
  Gazole: string | null;
  SP95: string | null;
  E85: string | null;
  E10: string | null;
  GPLc: string | null;
  Gazole_media: string | null;
  SP95_media: string | null;
  E85_media: string | null;
  E10_media: string | null;
  GPLc_media: string | null;
  SP98: string | null;
  SP98_media: string | null;
}

export type Coords = [number, number];

export interface NearStation {
  idEstacion: number;
  nombreEstacion: string;
  direccion: string;
  longitud: number;
  latitud: number;
  margen: string | null;
  codPostal: string | null;
  horario: string | null;
  tipoVenta: string | null;
  nombreMunicipio: string | null;
  lastUpdate: string | null;
  localidad: string | null;
  provinciaDistrito: string | null;
  marca: string | null;
  Diesel: number;
  DieselPremium: number;
  Gasolina95: number;
  Diesel_media: number;
  DieselPremium_media: number;
  Gasolina95_media: number;
  coordenadas: string | null;
  distancia: number;
  provincia: string | null;
}

export interface DetailStation {
  idEstacion: number;
  nombreEstacion: string;
  longitud: number;
  latitud: number;
  margen: string | null;
  direccion: string | null;
  horario: string | null;
  tipoVenta: string | null;
  idMunicipio: number;
  lastUpdate: string;
  localidad: string;
  Gasolina95: string | null;
  Gasolina95_media: string | null;
  Gasolina98: string | null;
  Gasolina98_media: string | null;
  Diesel: string | null;
  Diesel_media: string | null;
  DieselPremium: string | null;
  DieselPremium_media: string | null;
  DieselB: string | null;
  DieselB_media: string | null;
  GLP_media: string | null;
  provincia: string;
  provinciaDistrito: string;
  marca: string | null;
}

export interface HistoricItem {
  idPrecio: number;
  idEstacion: number;
  idFuelType: number;
  precio: string;
  timestamp: string;
}

export interface Period {
  inicio: string;
  fin: string;
}

export interface Historic {
  title: string;
  estacionId: string;
  periodo: Period;
  cantidadResultados: number;
  data: HistoricItem[];
}

export interface Favorite {
  id: string;
  name: string;
  [key: string]: any;
}

export interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}