export type TransportType = 'Camión' | 'Furgón';
export type CargoType = 'Lingotes' | 'Sin Refinar' | 'Cilindros' | 'Catodos de Cobre';
export type MaterialType = 'Aluminio' | 'Cobre';
export type StatusType = 'approved' | 'review' | 'rejected';

export interface InventoryEntry {
  id: string;
  receptionDate: Date;
  transportType: TransportType;
  vehicleId: string;
  containerNumber: string;
  reference: string;
  client: string;
  supplier: string;
  line: string;
  customsDeclaration: string;
  paymentDate: Date;
  exchangeRate: number;
  material: MaterialType;
  cargoType: CargoType;
  packages: number;
  weight: number;
  invoice: string;
  value: number;
  crossingDate: Date;
  status: StatusType;
  photos?: string[];
  notes?: string;
}

export interface EditFormData {
  id?: string;
  receptionDate?: string;
  transportType?: TransportType;
  vehicleId?: string;
  containerNumber?: string;
  reference?: string;
  client?: string;
  supplier?: string;
  line?: string;
  customsDeclaration?: string;
  paymentDate?: string;
  exchangeRate?: number;
  material?: MaterialType;
  cargoType?: CargoType;
  packages?: number;
  weight?: number;
  invoice?: string;
  value?: number;
  crossingDate?: string;
  status?: StatusType;
  photos?: string[];
  notes?: string;
}