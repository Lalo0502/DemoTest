import { useState, useMemo } from 'react';
import { Document } from '@/types/documents';

export function useDocumentsFilters(data: Document[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredData = useMemo(() => {
    return data.filter(doc => {
      const matchesSearch = 
        doc.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesType = typeFilter === 'all' || doc.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [data, searchTerm, statusFilter, typeFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredData,
  };
}