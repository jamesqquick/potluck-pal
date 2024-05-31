'use server';

import { ReturnValue } from '@/types/ReturnValue';
import { getEventRSVPByUser, getItem } from '@/utils/items';
import { ItemRecord, getXataClient } from '@/xata';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

interface Props {
  itemId: string;
}

export async function handleCommitToBringItem({
  itemId,
}: Props): Promise<ReturnValue<ItemRecord>> {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  try {
    const getItemResponse = await getItem(itemId);

    if (!getItemResponse) {
      return notFound();
    }

    if ('error' in getItemResponse) {
      return { error: getItemResponse.error };
    }

    const item = getItemResponse.data;

    if (!item) {
      return notFound();
    }

    if (!item.event) {
      return notFound();
    }

    const eventId = item.event.id;

    //check if the user rsvped in the rsvps table
    const existingRSVP = await getEventRSVPByUser(eventId, userId);

    if ('error' in existingRSVP) {
      return { error: existingRSVP.error };
    }

    const rsvp = existingRSVP.data;
    if (rsvp === null) {
      return { error: "You are not rsvp'ed to this event." };
    }

    if (item.userId) {
      return { error: 'Someone is already bringing that.' };
    }

    const itemUpdate = { ...item, userId };

    const updatedItem = (await getXataClient().db.Item.update(
      itemId,
      itemUpdate
    )) as ItemRecord;

    if (!updatedItem) {
      return notFound();
    }

    revalidatePath(`/events/${eventId}`);
    return { data: updatedItem };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to commit to bring item.' };
  }
}
