import { EventRecord } from '@/xata';
import Link from 'next/link';
import React from 'react';
import EventPreview from './EventCard';

export default function EventPreviewGrid({
  events,
}: {
  events: EventRecord[];
}) {
  return (
    <>
      {events.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No events to show</div>
      )}
      {events.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            return (
              <Link href={`/events/${event.id}`} key={event.id}>
                <EventPreview
                  event={event}
                  showDescription={false}
                ></EventPreview>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
