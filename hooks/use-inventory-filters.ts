import { useState, useMemo } from 'react';
import { InventoryEntry } from '@/types/inventory';

export function useInventoryFilters(data: InventoryEntry[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [materialFilter, setMaterialFilter] = useState<string>('all');

  const filteredData = useMemo(() => {
    return data.filter(entry => {
      const matchesSearch = 
        entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
      const matchesMaterial = materialFilter === 'all' || entry.material === materialFilter;

      return matchesSearch && matchesStatus && matchesMaterial;
    });
  }, [data, searchTerm, statusFilter, materialFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    materialFilter,
    setMaterialFilter,
    filteredData,
  };
}