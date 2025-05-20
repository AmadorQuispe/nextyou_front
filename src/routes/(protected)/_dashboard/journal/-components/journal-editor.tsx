import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";

export function JournalEditor({
  value,
  onChange,
  onCancel,
  onSave,
}: {
  value: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className='bg-accent/2 p-4 rounded-md space-y-2'>
      <Textarea
        className='min-h-[100px]'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className='flex justify-end gap-2'>
        <Button variant='ghost' size='sm' onClick={onCancel}>
          <X className='w-4 h-4 mr-1' /> Cancelar
        </Button>
        <Button size='sm' onClick={onSave}>
          <Save className='w-4 h-4 mr-1' /> Guardar
        </Button>
      </div>
    </div>
  );
}
