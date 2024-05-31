import { ItemRecord, RsvpRecord, getXataClient } from '@/xata';

export const getItem = async (itemId: string): Promise<ItemRecord | null> => {
  return getXataClient().db.Item.read(itemId) as Promise<ItemRecord | null>;
};

export const createItemsForEvent = async (
  itemNames: string[],
  eventId: string
): Promise<ItemRecord[]> => {
  const itemsToCreate = itemNames.map((item) => ({
    name: item,
    event: eventId,
  }));
  return getXataClient().db.Item.create(itemsToCreate) as Promise<ItemRecord[]>;
};
