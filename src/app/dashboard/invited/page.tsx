import EventPreviewGrid from '@/components/EventPreviewGrid';
import { getNotRespondedRSVPs } from '@/utils/rsvps';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function InvitedEventsPage() {
  const { userId } = auth().protect();
  const rsvps = await getNotRespondedRSVPs(userId);
  const events = rsvps.map((rsvp) => rsvp.event);
  return (
    <>
      <EventPreviewGrid events={events} />
    </>
  );
}
