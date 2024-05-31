import EventCard from '@/components/EventCard';
import { getHostedEventsByUser } from '@/utils/events';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

export default async function HostingEventsPage() {
  const { userId } = auth().protect();
  const hostedEvents = await getHostedEventsByUser(userId);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {hostedEvents.map((event) => {
        return (
          <Link href={`/events/${event.id}`} key={event.id}>
            <EventCard event={event} showDescription={false} />
          </Link>
        );
      })}
    </div>
  );
}
