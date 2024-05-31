'use server';
import { RsvpStatus } from '@/types/ReturnValue';
import { getXataClient } from '@/xata';
import { revalidatePath } from 'next/cache';

export const rsvpForEventAction = async (
  rsvpId: string,
  status: RsvpStatus
) => {
  const updatedRsvp = await getXataClient().db.Rsvp.update(rsvpId, {
    status,
  });
  //TODO confirm typescript type for event id
  revalidatePath(`/events/${updatedRsvp.event}`);
};
