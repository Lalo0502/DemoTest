import { Button } from '@/components/ui/button';
import { HiOutlinePlus, HiOutlineRefresh, HiOutlineDownload, HiOutlineUpload } from 'react-icons/hi';

interface DocumentsHeaderProps {
  onUpload: () => void;
}

export function DocumentsHeader({ onUpload }: DocumentsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Documentos</h1>
        <p className="mt-1 text-base text-muted-foreground sm:mt-2 sm:text-lg">
          Gestiona y genera documentos de importación/exportación
        </p>
      </div>
      <div className="flex gap-2 sm:gap-3">
        <Button variant="outline" size="icon" className="h-10 w-10 sm:h-11 sm:w-11">
          <HiOutlineRefresh className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10 sm:h-11 sm:w-11">
          <HiOutlineDownload className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button 
          size="default" 
          className="h-10 px-4 sm:h-11 sm:px-6 sm:text-base"
          onClick={onUpload}
        >
          <HiOutlineUpload className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Subir Documento</span>
          <span className="sm:hidden">Subir</span>
        </Button>
        <Button 
          variant="default" 
          size="default" 
          className="h-10 px-4 sm:h-11 sm:px-6 sm:text-base"
        >
          <HiOutlinePlus className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Generar Documento</span>
          <span className="sm:hidden">Generar</span>
        </Button>
      </div>
    </div>
  );
}