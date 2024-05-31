'use client';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

export default function EventFormButton() {
  const { pending } = useFormStatus();
  //TODO: show loading state
  useEffect(() => {
    console.log(pending);
  }, [pending]);
  return (
    <button
      type="submit"
      className={`bg-primary text-lg text-white py-4 px-6 rounded-xl disabled:opacity-50 w-full`}
    >
      Submit
    </button>
  );
}
