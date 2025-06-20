import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryEntry, StatusType } from '@/types/inventory';
import { statusConfig } from '@/config/inventory';

interface InventoryStatsProps {
  data: InventoryEntry[];
}

export function InventoryStats({ data }: InventoryStatsProps) {
  const totalPackages = data.reduce((sum, entry) => sum + entry.packages, 0);
  const statusCount = data.reduce((acc, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {} as Record<StatusType, number>);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.length}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Entradas activas en el sistema
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bultos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPackages}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Unidades en inventario
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md bg-emerald-100 px-2 py-1 dark:bg-emerald-500/20">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {statusCount.approved || 0}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-amber-100 px-2 py-1 dark:bg-amber-500/20">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {statusCount.review || 0}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-rose-100 px-2 py-1 dark:bg-rose-500/20">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-xs font-medium text-rose-700 dark:text-rose-400">
                {statusCount.rejected || 0}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Aprobados / En Revisión / Rechazados
          </p>
        </CardContent>
      </Card>
    </div>
  );
}