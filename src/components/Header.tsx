import React from 'react';

export default function Header({ text }: { text: string }) {
  return (
    <header className="py-20">
      <h1 className="text-4xl font-bold ">{text}</h1>
    </header>
  );
}
