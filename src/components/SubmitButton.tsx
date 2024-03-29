'use client';
import { useFormStatus } from 'react-dom';

interface Props {
  text: string;
}

export default function SubmitButton({ text }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="h absolute right-1 top-4 pr-[19px] hover:translate-x-1 md:top-6"
      disabled={pending}
    >
      {text}
      {pending && (
        // spinner animation during form submission
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-teal-500" />
      )}
    </button>
  );
}
