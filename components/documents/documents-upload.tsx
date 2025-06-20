'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DocumentType } from '@/types/documents';
import { HiOutlineUpload, HiOutlineX } from 'react-icons/hi';

interface DocumentsUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (files: File[]) => void;
}

export function DocumentsUpload({ open, onOpenChange, onUpload }: DocumentsUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState<DocumentType>('BOL');
  const [reference, setReference] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    onUpload(selectedFiles);
    setSelectedFiles([]);
    setReference('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Subir Documento
              </DialogTitle>
              <DialogDescription className="mt-1.5">
                Selecciona los archivos que deseas subir al sistema
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <HiOutlineX className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Documento</Label>
            <Select
              value={documentType}
              onValueChange={(value: DocumentType) => setDocumentType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BOL">BOL</SelectItem>
                <SelectItem value="Packing List">Packing List</SelectItem>
                <SelectItem value="Pedimento">Pedimento</SelectItem>
                <SelectItem value="Factura">Factura</SelectItem>
                <SelectItem value="Carta Porte">Carta Porte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Referencia</Label>
            <Input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ej: BOL-2024-001"
            />
          </div>

          <div className="space-y-2">
            <Label>Archivos</Label>
            <div className="rounded-lg border border-dashed p-4">
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Arrastra los archivos aquí o haz clic para seleccionarlos
              </p>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-medium">Archivos seleccionados:</h4>
              <ul className="mt-2 space-y-1">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              <HiOutlineUpload className="mr-2 h-4 w-4" />
              Subir Archivos
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}