'use server';
import { ReturnValue } from '@/types/ReturnValue';
import { EventsRecord, getXataClient } from '@/xata';
import { XataRecord } from '@xata.io/client';

const xataClient = getXataClient();

export const createEvent = async (
  name: string,
  location: string,
  date: Date,
  description: string,
  userId: string
): Promise<ReturnValue<EventsRecord>> => {
  try {
    const newEvent = {
      name,
      description,
      date,
      location,
      userId,
    };

    const data = (await xataClient.db.Events.create(newEvent)) as EventsRecord;
    return { data };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to create event.' };
  }
};

export const getEventsByUser = async (
  userId: string
): Promise<ReturnValue<EventsRecord[]>> => {
  try {
    const events = (await xataClient.db.Events.filter({
      userId,
    }).getMany()) as EventsRecord[];
    return { data: events };
  } catch (error) {
    return { error: 'Failed to get events.' };
  }
};
