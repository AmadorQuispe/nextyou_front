import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Journal } from "@/types/journal";
import { JournalEditor } from "./-components/journal-editor";
import { JournalEntry } from "./-components/journal-entry";
import { toast } from "sonner";
import { useJournals } from "@/querys/use-journals";
import { useCreateJournal } from "@/mutations/use-create-journal";
import { useUpdateJournal } from "@/mutations/use-update-journal";
import { useDeleteJournal } from "@/mutations/use-delete-journal";

export const Route = createFileRoute("/(protected)/_dashboard/journal/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, refetch, isLoading } = useJournals();
  const { mutate: createJournalSubmit } = useCreateJournal();
  const { mutate: updateJournalSubmit } = useUpdateJournal();
  const { mutate: deleteJournalSubmit } = useDeleteJournal();

  const [newEntryMode, setNewEntryMode] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const sortedEntries = useMemo(
    () =>
      data
        ? [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        : [],
    [data]
  );

  const handleSaveNew = useCallback(() => {
    if (!newContent.trim()) {
      toast.error("No puedes guardar una entrada vacía");
      return;
    }

    createJournalSubmit(newContent, {
      onSuccess: () => {
        setNewContent("");
        setNewEntryMode(false);
        toast.success("Entrada guardada con éxito");
        refetch(); // Recargar datos del servidor
      },
      onError: () => {
        toast.error("Error al guardar la entrada");
      },
    });
  }, [newContent, createJournalSubmit, refetch]);

  const handleEditSave = useCallback(() => {
    if (!editContent.trim() || !editingId) {
      toast.error("No puedes guardar una entrada vacía");
      return;
    }

    updateJournalSubmit(
      { id: editingId, content: editContent },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditContent("");
          toast.success("Entrada actualizada con éxito");
          refetch(); // Recargar datos del servidor
        },
        onError: () => {
          toast.error("Error al actualizar la entrada");
        },
      }
    );
  }, [editingId, editContent, updateJournalSubmit, refetch]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteJournalSubmit(id, {
        onSuccess: () => {
          toast.success("Entrada eliminada con éxito");
          refetch(); // Recargar datos del servidor
        },
        onError: () => {
          toast.error("Error al eliminar la entrada");
        },
      });
    },
    [deleteJournalSubmit, refetch]
  );

  const handleStartEdit = useCallback((entry: Journal) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
  }, []);

  const handleCancel = useCallback(() => {
    setNewEntryMode(false);
    setEditingId(null);
    setNewContent("");
    setEditContent("");
  }, []);

  const renderEmptyState = () => (
    <div className='mt-10 space-y-4'>
      <p className='text-muted-foreground'>
        Aún no tienes entradas. ¿Quieres comenzar?
      </p>
      <Button onClick={() => setNewEntryMode(true)}>
        <Plus className='w-4 h-4 mr-2' /> Escribir ahora
      </Button>
    </div>
  );

  const renderEntries = () => (
    <>
      {!newEntryMode && (
        <div
          className='bg-accent/5 rounded-md h-10 flex items-center justify-center cursor-pointer hover:bg-accent transition'
          onClick={() => setNewEntryMode(true)}>
          <Plus className='w-5 h-5 text-muted-foreground' />
        </div>
      )}
      {sortedEntries?.map((entry) =>
        editingId === entry.id ? (
          <JournalEditor
            key={`edit-${entry.id}`}
            value={editContent}
            onChange={setEditContent}
            onCancel={handleCancel}
            onSave={handleEditSave}
          />
        ) : (
          <JournalEntry
            key={entry.id}
            entry={entry}
            onEdit={() => handleStartEdit(entry)}
            onDelete={() => handleDelete(entry.id)}
          />
        )
      )}
    </>
  );

  return (
    <div className='max-w-3xl w-full mx-auto space-y-4'>
      <h2 className='text-2xl font-semibold'>Tu historia de vida</h2>
      <p className='text-sm text-muted-foreground'>
        Escribe aquí todo lo que te pasa y piensas.
      </p>

      {isLoading ? (
        <div className='flex justify-center py-10'>
          <span className='loading loading-spinner loading-md'></span>
        </div>
      ) : (
        <>
          {(!data || data.length === 0) && !newEntryMode && renderEmptyState()}

          {newEntryMode && (
            <JournalEditor
              value={newContent}
              onChange={setNewContent}
              onCancel={handleCancel}
              onSave={handleSaveNew}
            />
          )}

          {((data && data.length > 0) || newEntryMode) && renderEntries()}
        </>
      )}
    </div>
  );
}
