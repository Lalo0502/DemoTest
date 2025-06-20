'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { mockData } from '@/data/mockInventory';
import { useInventoryFilters } from '@/hooks/use-inventory-filters';
import { InventoryHeader } from '@/components/inventory/inventory-header';
import { InventoryStats } from '@/components/inventory/inventory-stats';
import { InventoryFilters } from '@/components/inventory/inventory-filters';
import { InventoryTable } from '@/components/inventory/inventory-table';
import { InventoryDetails } from '@/components/inventory/inventory-details';
import { InventoryPhotos } from '@/components/inventory/inventory-photos';
import { InventoryEdit } from '@/components/inventory/inventory-edit';
import { InventoryEntry } from '@/types/inventory';

export default function InventoryPage() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    materialFilter,
    setMaterialFilter,
    filteredData,
  } = useInventoryFilters(mockData);

  const [selectedEntry, setSelectedEntry] = useState<InventoryEntry | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="flex h-full flex-col space-y-6">
      <InventoryHeader />
      <InventoryStats data={filteredData} />
      
      <div className="flex flex-1 flex-col space-y-4 rounded-lg border bg-card">
        <div className="border-b px-6 py-4">
          <InventoryFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            materialFilter={materialFilter}
            onMaterialFilterChange={setMaterialFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </div>
        
        <div className="flex-1 px-6">
          <InventoryTable
            data={filteredData}
            onEntrySelect={(entry) => {
              setSelectedEntry(entry);
              setDetailsOpen(true);
            }}
            onEntryEdit={(entry) => {
              setSelectedEntry(entry);
              setEditOpen(true);
            }}
            onEntryPhotos={(entry) => {
              setSelectedEntry(entry);
              setPhotosOpen(true);
            }}
          />
        </div>
      </div>

      <InventoryDetails
        entry={selectedEntry}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onEdit={(entry) => {
          setDetailsOpen(false);
          setEditOpen(true);
        }}
        onViewPhotos={(entry) => {
          setDetailsOpen(false);
          setPhotosOpen(true);
        }}
      />

      <InventoryPhotos
        entry={selectedEntry}
        open={photosOpen}
        onOpenChange={setPhotosOpen}
      />

      <InventoryEdit
        entry={selectedEntry}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={(data) => {
          console.log('Guardando cambios:', data);
          setEditOpen(false);
        }}
      />
    </div>
  );
}