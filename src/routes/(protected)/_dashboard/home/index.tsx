import { createFileRoute } from "@tanstack/react-router";
import SilhouetteSVG from "../assets/image-hero.svg";

export const Route = createFileRoute("/(protected)/_dashboard/home/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className='relative min-h-screen bg-gradient-to-b from-backgroundLight to-white text-textPrimary flex flex-col items-center justify-center px-6 overflow-hidden'>
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute top-[-10%] left-[50%] w-[600px] h-[600px] -translate-x-1/2 bg-primary1 opacity-20 rounded-full blur-[160px]' />
        <div className='absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-emotionalAccent opacity-30 rounded-full blur-[120px]' />
      </div>
      <section className='relative z-10 text-center max-w-3xl animate-fadeInUp'>
        <h1 className='text-5xl md:text-6xl font-extrabold text-primary1 tracking-tight leading-tight'>
          Imagina quién puedes ser mañana
        </h1>
        <div className='relative my-4'>
          <img
            src={SilhouetteSVG}
            alt='Siluetas representando el yo actual y futuro'
            className='w-full max-w-md mx-auto'
          />
        </div>
        <p className='text-lg md:text-xl text-textSecondary mb-10'>
          NextYou es tu espacio para escribir, reflexionar y recibir consejos
          desde tu propio futuro. Tu crecimiento comienza hoy.
        </p>
      </section>
    </main>
  );
}
