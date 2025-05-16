import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

type Props = {
  initial?: JournalEntry | null;
  onSave: (entry: { title: string; content: string }) => void;
  onCancel: () => void;
};

export default function JournalEditor({ initial, onSave, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setContent(initial.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [initial]);

  return (
    <div className='space-y-4'>
      <Input
        placeholder='Título de tu entrada'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder='Escribe lo que quieras recordar, reflexionar o expresar...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='min-h-[160px]'
      />
      <div className='flex justify-end gap-2'>
        <Button variant='ghost' onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={() => onSave({ title, content })}>Guardar</Button>
      </div>
    </div>
  );
}
