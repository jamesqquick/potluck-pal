import React from 'react';

export default function AttendeeInitials({ name }: { name: string }) {
  const firstInitial = name.charAt(0);
  const secondInitial = name.charAt(name.indexOf(' ') + 1);
  return (
    <div className="bg-surface-1 flex items-center justify-center h-10 w-10 border border-primary rounded-full">
      <span>{`${firstInitial}${secondInitial}`} </span>
    </div>
  );
}
