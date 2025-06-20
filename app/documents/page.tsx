'use client';

import { useState } from 'react';
import { DocumentsHeader } from '@/components/documents/documents-header';
import { DocumentsStats } from '@/components/documents/documents-stats';
import { DocumentsTable } from '@/components/documents/documents-table';
import { DocumentsUpload } from '@/components/documents/documents-upload';
import { DocumentsPreview } from '@/components/documents/documents-preview';
import { mockDocuments, mockDocumentGroups } from '@/data/mockDocuments';
import { useDocumentsFilters } from '@/hooks/use-documents-filters';
import { Document } from '@/types/documents';

export default function DocumentsPage() {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    filteredData,
  } = useDocumentsFilters(mockDocuments);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  return (
    <div className="flex h-full flex-col space-y-6">
      <DocumentsHeader onUpload={() => setUploadOpen(true)} />
      <DocumentsStats data={filteredData} />
      
      <div className="flex flex-1 flex-col space-y-4 rounded-lg border bg-card">
        <div className="border-b px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex w-full sm:max-w-sm">
              <input
                type="text"
                placeholder="Buscar por referencia o cliente..."
                className="w-full rounded-lg border bg-background px-4 py-2 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex gap-3">
              <select
                className="rounded-lg border bg-background px-3 py-2 text-sm"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Todos los tipos</option>
                <option value="BOL">BOL</option>
                <option value="Packing List">Packing List</option>
                <option value="Pedimento">Pedimento</option>
                <option value="Factura">Factura</option>
                <option value="Carta Porte">Carta Porte</option>
              </select>
              <select
                className="rounded-lg border bg-background px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="generated">Generado</option>
                <option value="signed">Firmado</option>
                <option value="rejected">Rechazado</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex-1 px-6">
          <DocumentsTable
            data={mockDocumentGroups}
            onDocumentSelect={(doc) => {
              setSelectedDocument(doc);
              setPreviewOpen(true);
            }}
          />
        </div>
      </div>

      <DocumentsUpload
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={(files) => {
          console.log('Archivos subidos:', files);
          setUploadOpen(false);
        }}
      />

      <DocumentsPreview
        document={selectedDocument}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
}