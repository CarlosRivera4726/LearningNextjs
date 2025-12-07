'use client';

import { ReactNode, FormEvent } from 'react';

interface FormContainerProps {
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function FormContainer({ children, onSubmit }: FormContainerProps) {
    return (
        <div className="
      flex items-center justify-center 
      min-h-screen w-full 
      bg-linear-to-br
      from-gray-50 to-white
      dark:from-gray-900 dark:to-gray-800
      px-4
    ">
            <form
                className="
          flex flex-col gap-8
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur-md
          border border-gray-200/50 dark:border-gray-700/50
          rounded-2xl
          p-8
          w-full max-w-md
          shadow-2xl
          shadow-gray-200/20 dark:shadow-gray-900/30
          transition-all duration-300
          hover:shadow-3xl hover:shadow-gray-300/30 dark:hover:shadow-gray-800/40
        "
                onSubmit={onSubmit}
            >
                {/* Borde superior degradado (igual que navbar) */}
                <div className="
          absolute top-0 left-0 right-0 h-1
          bg-linear-to-r from-blue-500 via-purple-500 to-pink-500
          rounded-t-2xl
        " />

                {children}
            </form>
        </div>
    );
}