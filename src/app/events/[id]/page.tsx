import { getXataClient } from '@/xata';
import { notFound, redirect } from 'next/navigation';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid id');
  }

  const event = await getXataClient().db.Events.read(id);

  if (!event) {
    return notFound();
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.date.toString()}</p>
      <p>{event.location}</p>
    </div>
  );
}
