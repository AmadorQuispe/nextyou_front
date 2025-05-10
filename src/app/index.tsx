import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center px-4'>
      <div
        className={`max-w-xl text-center space-y-6 transition-opacity duration-1000 transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
        <h1 className='text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white'>
          Conversa con tu futuro
        </h1>
        <img src='/hero.png' className='w-full' />
        <p className='text-lg text-gray-600 dark:text-gray-300'>
          Reflexiona, escribe y escucha a la versión más sabia de ti.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className='mt-4 px-6 py-3 text-lg bg-indigo-600 text-white rounded-2xl shadow-md hover:bg-indigo-700 transition-colors'>
          Hablar con mi yo futuro
        </button>
      </div>
    </div>
  );
}
