import { Locality, Province } from "../types";

export const getFuelName = (fuelTypeId: string | number): string => {
  // Convert to string to handle both string and number inputs
  const fuelTypeStr = fuelTypeId.toString();
  
  const fuelTypes: { [key: string]: string } = {
    '1': 'Sin Plomo 95',
    '3': 'Sin Plomo 98',
    '4': 'Gasoil A',
    '5': 'Gasoil B',
    '6': 'Gasoil C',
    '7': 'Gasoil A+',
    '8': 'Gasoil Premium',
    '15': 'Gas Natural Comprimido',
    '16': 'Gas Natural Licuado',
    '17': 'Gases licuados del petróleo',
    '18': 'Bioetanol',
    '19': 'Biodiésel',
    '20': 'Hidrógeno'
  };
  return fuelTypes[fuelTypeStr] || `Tipo de combustible ${fuelTypeStr}`;
};

export const mapProvincesToSelectItems = (provinces: Province[]) => {
  return provinces.map((province) => ({
    key: province.idProvincia.toString(),
    label: province.nombreProvincia,
  }));
};

export const mapLocalitiesToSelectItems = (localities: Locality[]) => {
  return localities.map((locality) => ({
    key: locality.idMunicipio.toString(),
    label: locality.nombreMunicipio,
  }));
};
