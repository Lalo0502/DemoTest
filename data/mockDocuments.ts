import { Document, DocumentGroup } from '@/types/documents';

const documents: Document[] = [
  {
    id: '1',
    type: 'BOL',
    reference: 'BOL-2024-001',
    client: 'Metalúrgica del Norte',
    createdAt: new Date('2024-03-20T10:30:00'),
    updatedAt: new Date('2024-03-20T10:30:00'),
    status: 'generated',
    fileName: 'BOL-2024-001.pdf',
    fileUrl: 'https://example.com/documents/BOL-2024-001.pdf',
    inventoryEntryId: '1',
    inventoryReference: 'LOT-2024-001',
    checklist: {
      required: ['Datos del transportista', 'Información de carga', 'Sellos'],
      completed: ['Datos del transportista', 'Información de carga', 'Sellos'],
    },
  },
  {
    id: '2',
    type: 'Packing List',
    reference: 'PL-2024-001',
    client: 'Metalúrgica del Norte',
    createdAt: new Date('2024-03-20T10:35:00'),
    updatedAt: new Date('2024-03-20T10:35:00'),
    status: 'pending',
    inventoryEntryId: '1',
    inventoryReference: 'LOT-2024-001',
    checklist: {
      required: ['Lista de materiales', 'Pesos y medidas', 'Embalaje'],
      completed: ['Lista de materiales'],
    },
  },
  {
    id: '3',
    type: 'Pedimento',
    reference: 'PED-2024-001',
    client: 'Metalúrgica del Norte',
    createdAt: new Date('2024-03-20T11:00:00'),
    updatedAt: new Date('2024-03-20T14:30:00'),
    status: 'signed',
    fileName: 'PED-2024-001.pdf',
    fileUrl: 'https://example.com/documents/PED-2024-001.pdf',
    inventoryEntryId: '1',
    inventoryReference: 'LOT-2024-001',
    checklist: {
      required: ['Clasificación arancelaria', 'Valor comercial', 'Permisos'],
      completed: ['Clasificación arancelaria', 'Valor comercial', 'Permisos'],
    },
  },
  {
    id: '4',
    type: 'Factura',
    reference: 'FAC-2024-001',
    client: 'Industrias Metálicas SA',
    createdAt: new Date('2024-03-21T09:15:00'),
    updatedAt: new Date('2024-03-21T09:15:00'),
    status: 'rejected',
    notes: 'Datos de impuestos incorrectos',
    inventoryEntryId: '2',
    inventoryReference: 'LOT-2024-002',
    checklist: {
      required: ['Datos fiscales', 'Desglose de impuestos', 'Términos de pago'],
      completed: ['Datos fiscales', 'Términos de pago'],
    },
  },
  {
    id: '5',
    type: 'Carta Porte',
    reference: 'CP-2024-001',
    client: 'Industrias Metálicas SA',
    createdAt: new Date('2024-03-21T10:00:00'),
    updatedAt: new Date('2024-03-21T10:00:00'),
    status: 'pending',
    inventoryEntryId: '2',
    inventoryReference: 'LOT-2024-002',
    checklist: {
      required: ['Ruta de transporte', 'Datos del operador', 'Seguro de carga'],
      completed: ['Ruta de transporte'],
    },
  },
];

// Agrupar documentos por entrada de inventario
export const mockDocumentGroups: DocumentGroup[] = [
  {
    entryId: '1',
    reference: 'LOT-2024-001',
    client: 'Metalúrgica del Norte',
    date: new Date('2024-03-20T10:30:00'),
    transportType: 'Camión',
    documents: documents.filter(doc => doc.inventoryEntryId === '1'),
  },
  {
    entryId: '2',
    reference: 'LOT-2024-002',
    client: 'Industrias Metálicas SA',
    date: new Date('2024-03-21T09:15:00'),
    transportType: 'Furgón',
    documents: documents.filter(doc => doc.inventoryEntryId === '2'),
  },
];

export const mockDocuments = documents;