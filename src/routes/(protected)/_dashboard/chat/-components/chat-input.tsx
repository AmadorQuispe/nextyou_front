import { useState, type KeyboardEvent, type ChangeEvent } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const send = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className=''>
      <form className='relative flex w-full max-w-4xl flex-1 items-center rounded-xl border border-primary1 bg-gray-100'>
        <div className='flex w-full flex-1 rounded-xl border-none bg-transparent'>
          <div className='flex min-h-full flex-1 flex-col'>
            <textarea
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder='¿Cómo puedo ayudarte hoy?'
              rows={2}
              className='max-h-[4lh] w-full resize-none overflow-y-auto overflow-x-hidden border-0 bg-transparent px-2.5 py-2.5 outline-none focus:ring-0 focus-visible:ring-0 sm:px-3'
            />
            <div className='-ml-0.5 flex max-w-[calc(100%-40px)] flex-wrap items-center justify-start p-4'></div>
          </div>
        </div>

        <button
          onClick={send}
          className='absolute bottom-2 right-2 p-2 rounded-full text-white self-end bg-primary1'
          aria-label='Enviar'>
          <ArrowUpIcon />
        </button>
      </form>
    </div>
  );
};
