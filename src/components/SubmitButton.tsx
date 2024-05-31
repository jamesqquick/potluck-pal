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
      className={`bg-primary text-lg text-white py-4 px-6 rounded-xl disabled:opacity-70 w-full`}
      disabled={pending}
    >
      {!pending ? (
        text
      ) : (
        <div className="h-6 w-6 mx-auto animate-spin rounded-full border-b-2 border-white" />
      )}
    </button>
  );
}
