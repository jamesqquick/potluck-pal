import { getEventsByUser } from '@/utils/events';
import { getXataClient } from '@/xata';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

import React from 'react';

//list all of the events that the user created or rsvp'ed to
export default async function page() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  const eventsResponse = await getEventsByUser(user.id);

  if ('error' in eventsResponse) {
    console.log('error');
    //todo error handling
    return;
  }

  const events = eventsResponse.data;
  return (
    <div>
      {events.map((event) => {
        return <div key={event.id}>{event.name}</div>;
      })}
    </div>
  );
}
