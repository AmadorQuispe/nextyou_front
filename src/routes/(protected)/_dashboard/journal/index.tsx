import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { es } from "date-fns/locale";

type JournalEntry = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

export const Route = createFileRoute("/(protected)/_dashboard/journal/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntryMode, setNewEntryMode] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const handleSaveNew = () => {
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      content: newContent,
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [...prev, newEntry]);
    setNewContent("");
    setNewEntryMode(false);
  };

  const handleEditSave = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, content: editContent } : e))
    );
    setEditingId(null);
    setEditContent("");
  };

  const handleCancel = () => {
    setNewEntryMode(false);
    setEditingId(null);
    setNewContent("");
    setEditContent("");
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className='max-w-3xl w-full mx-auto space-y-4'>
      <h2 className='text-2xl font-semibold p-0 m-0'>Tu historia de vida</h2>
      <p className='text-muted-foreground'>
        Escribe aquí todo lo que te pasa y piensas.
      </p>

      {entries.length === 0 && !newEntryMode && (
        <div className='mt-10 space-y-4'>
          <p className='text-muted-foreground'>
            Aún no tienes entradas. ¿Quieres comenzar?
          </p>
          <Button onClick={() => setNewEntryMode(true)}>
            <Plus className='w-4 h-4 mr-2' /> Escribir ahora
          </Button>
        </div>
      )}

      {/* Entradas */}
      {sortedEntries.map((entry) => (
        <div
          key={entry.id}
          className='bg-accent/5 p-4 rounded-md shadow-sm space-y-2 relative'>
          <p className='font-semibold text-sm text-muted-foreground'>
            {format(new Date(entry.createdAt), "PPPP", { locale: es })}
          </p>

          {editingId === entry.id ? (
            <>
              <Textarea
                className='mt-1'
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className='flex justify-end gap-2 mt-2'>
                <Button variant='ghost' size='sm' onClick={handleCancel}>
                  <X className='w-4 h-4 mr-1' /> Cancelar
                </Button>
                <Button size='sm' onClick={() => handleEditSave(entry.id)}>
                  <Save className='w-4 h-4 mr-1' /> Guardar
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className='whitespace-pre-wrap'>{entry.content}</p>
              <div className='absolute top-3 right-3 flex gap-2'>
                <button onClick={() => handleEdit(entry)} title='Editar'>
                  <Pencil className='w-4 h-4 text-muted-foreground hover:text-primary' />
                </button>
                <button onClick={() => handleDelete(entry.id)} title='Eliminar'>
                  <Trash2 className='w-4 h-4 text-muted-foreground hover:text-destructive' />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Botón para agregar nueva entrada */}
      {!newEntryMode && entries.length > 0 && (
        <div
          className='bg-accent/15 rounded-md h-10 flex items-center justify-center cursor-pointer hover:bg-accent transition'
          onClick={() => setNewEntryMode(true)}>
          <Plus className='w-5 h-5 text-muted-foreground' />
        </div>
      )}

      {/* Editor de nueva entrada */}
      {newEntryMode && (
        <div className='bg-accent/15 p-4 rounded-md space-y-2'>
          <Textarea
            placeholder='Escribe aquí tu texto'
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className='min-h-[100px]'
          />
          <div className='flex justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={handleCancel}>
              <X className='w-4 h-4 mr-1' /> Cancelar
            </Button>
            <Button size='sm' onClick={handleSaveNew}>
              <Save className='w-4 h-4 mr-1' /> Guardar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
