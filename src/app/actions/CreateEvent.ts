'use server';

import { createEvent } from '@/utils/events';
import { createItemsForEvent } from '@/utils/items';
import { redirect } from 'next/navigation';
import { EventData } from '@/context/NewEventContext';
import { createRSVPsForEvent } from '@/utils/rsvps';
import { auth } from '@clerk/nextjs/server';

export async function createEventAction(eventData: EventData) {
  const { userId } = auth().protect();

  if (!userId) {
    redirect('/');
  }

  const { name, location, date, description, items, attendees, imageId } =
    eventData;

  const createdEvent = await createEvent(
    name,
    location,
    new Date(date),
    description,
    userId,
    imageId
  );

  const itemNames = items.map((item) => item.name);
  await createItemsForEvent(itemNames, createdEvent.id);

  const attendeesIds = attendees.map((attendee) => attendee.id);
  await createRSVPsForEvent(attendeesIds, createdEvent.id);
}
