import type { ReactNode } from "react";

interface Props {
  actions?: ReactNode;
}

export function EmptyJournals({ actions }: Props) {
  return (
    <div className='mt-10 space-y-4'>
      <p className='text-muted-foreground'>
        Aún no tienes entradas. ¿Quieres comenzar?
      </p>
      {actions}
    </div>
  );
}
