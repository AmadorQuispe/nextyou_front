import { Skeleton } from "./skeleton";

export function Loader() {
  return (
    <div className='flex h-screen w-full items-center justify-center flex-col space-y-4'>
      <Skeleton className='h-[125px] w-2xl rounded-xl bg-primary/15' />
      <Skeleton className='h-[125px] w-2xl rounded-xl bg-primary/15' />
      <Skeleton className='h-[125px] w-2xl rounded-xl bg-primary/15' />
    </div>
  );
}
