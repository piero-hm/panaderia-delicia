// components/admin/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
}

/**
 * Un botón de envío que muestra un estado de carga.
 * Debe ser usado dentro de un <form> que utiliza una Server Action.
 */
export function SubmitButton({ label, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
