import { ReturnValue } from '@/types/ReturnValue';
import { ItemsRecord, RsvpsRecord, getXataClient } from '@/xata';

export const getItem = async (
  itemId: string
): Promise<ReturnValue<ItemsRecord | null>> => {
  try {
    const record = (await getXataClient().db.Items.read(
      itemId
    )) as ItemsRecord | null;
    return { data: record };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to get item.' };
  }
};

export const createItemsForEvent = async (
  itemNames: string[],
  eventId: string
): Promise<ReturnValue<ItemsRecord[]>> => {
  const itemsToCreate = itemNames.map((item) => ({
    name: item,
    event: eventId,
  }));
  try {
    const records = (await getXataClient().db.Items.create(
      itemsToCreate
    )) as ItemsRecord[];
    return { data: records };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to creat items.' };
  }
};

export const getEventRSVPByUser = async (
  eventId: string,
  userId: string
): Promise<ReturnValue<RsvpsRecord | null>> => {
  try {
    const rsvp = (await getXataClient()
      .db.RSVPS.filter({
        event: eventId,
        userId,
      })
      .getFirst()) as RsvpsRecord;
    return { data: rsvp };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to get item.' };
  }
};
