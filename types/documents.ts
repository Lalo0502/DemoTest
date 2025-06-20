export type DocumentType = 'BOL' | 'Packing List' | 'Pedimento' | 'Factura' | 'Carta Porte';
export type DocumentStatus = 'pending' | 'generated' | 'signed' | 'rejected';

export interface Document {
  id: string;
  type: DocumentType;
  reference: string;
  client: string;
  createdAt: Date;
  updatedAt: Date;
  status: DocumentStatus;
  fileName?: string;
  fileUrl?: string;
  notes?: string;
  inventoryEntryId: string;
  inventoryReference: string;
  checklist: {
    required: string[];
    completed: string[];
  };
}

export interface DocumentGroup {
  entryId: string;
  reference: string;
  client: string;
  date: Date;
  transportType: string;
  documents: Document[];
}

export interface DocumentFormData {
  type: DocumentType;
  reference: string;
  client: string;
  inventoryEntryId: string;
  inventoryReference: string;
  notes?: string;
  files?: File[];
}