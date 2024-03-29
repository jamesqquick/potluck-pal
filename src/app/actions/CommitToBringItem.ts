'use server';

import { ReturnValue } from '@/types/ReturnValue';
import { getEventRSVPByUser, getItem } from '@/utils/items';
import { ItemsRecord, getXataClient } from '@/xata';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

interface Props {
  itemId: string;
}

export async function handleCommitToBringItem({
  itemId,
}: Props): Promise<ReturnValue<ItemsRecord>> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const userId = user.id;

  try {
    const getItemResponse = await getItem(itemId);

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

    const updatedItem = (await getXataClient().db.Items.update(
      itemId,
      itemUpdate
    )) as ItemsRecord;

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
