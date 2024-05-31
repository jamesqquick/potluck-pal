'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function DashboardNav({
  invitesCount,
}: {
  invitesCount: number;
}) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-y-4 sm:flex-row justify-between items-end  pb-4 border-b">
      <div className="flex gap-x-4 leading-tight">
        <Link
          href="/dashboard/hosting"
          className={twMerge(
            'pb-2',
            pathname.includes('hosting')
              ? 'font-bold border-b-2  border-primary'
              : ''
          )}
        >
          Hosting
        </Link>
        <Link
          href="/dashboard/attending"
          className={twMerge(
            'pb-2',
            pathname.includes('attending')
              ? 'font-bold  border-b-2  border-primary'
              : ''
          )}
        >
          Attending
        </Link>
        <Link
          href="/dashboard/invited"
          className={twMerge(
            'pb-2',
            pathname.includes('invited')
              ? 'font-bold  border-b-2 border-primary flex gap-x-1 items-center'
              : ''
          )}
        >
          <span>Invites</span>{' '}
          {invitesCount > 0 && (
            <span className="text-xs">({invitesCount})</span>
          )}
        </Link>
      </div>
      <Link
        href="/new-event"
        className="btn btn-primary bg-primary rounded-md px-4 py-2 text-white"
      >
        Create Event
      </Link>
    </div>
  );
}
