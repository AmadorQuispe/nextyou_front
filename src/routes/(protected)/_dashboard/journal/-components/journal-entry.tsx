import type { Journal } from "@/types/journal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";

export function JournalEntry({
  entry,
  onEdit,
  onDelete,
}: {
  entry: Journal;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className='bg-accent/2 p-4 rounded-md shadow-sm space-y-2 relative'>
      <p className='font-semibold text-sm text-muted-foreground'>
        {format(new Date(entry?.createdAt), "PPPP", { locale: es })}
      </p>
      <p className='whitespace-pre-wrap'>{entry?.content}</p>
      <div className='absolute top-3 right-3 flex gap-2'>
        <button onClick={onEdit} title='Editar'>
          <Pencil className='w-4 h-4 text-muted-foreground hover:text-primary' />
        </button>
        <button onClick={onDelete} title='Eliminar'>
          <Trash2 className='w-4 h-4 text-muted-foreground hover:text-destructive' />
        </button>
      </div>
    </div>
  );
}
