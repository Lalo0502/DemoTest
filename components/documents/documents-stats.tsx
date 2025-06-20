import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Document } from '@/types/documents';

interface DocumentsStatsProps {
  data: Document[];
}

export function DocumentsStats({ data }: DocumentsStatsProps) {
  const totalDocuments = data.length;
  const pendingDocuments = data.filter(doc => doc.status === 'pending').length;
  const generatedDocuments = data.filter(doc => doc.status === 'generated').length;
  const signedDocuments = data.filter(doc => doc.status === 'signed').length;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDocuments}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Documentos en el sistema
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{pendingDocuments}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Documentos por generar
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Generados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">{generatedDocuments}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Documentos generados
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Firmados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{signedDocuments}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Documentos firmados
          </p>
        </CardContent>
      </Card>
    </div>
  );
}