'use server';
import { RsvpStatus } from '@/types/ReturnValue';
import {
  EventImageRecord,
  EventRecord,
  ItemRecord,
  RsvpRecord,
  UserProfileRecord,
  getXataClient,
} from '@/xata';

const xataClient = getXataClient();

export const createEvent = async (
  name: string,
  location: string,
  date: Date,
  description: string,
  userId: string,
  imageId: string
): Promise<EventRecord> => {
  const newEvent = {
    name,
    description,
    date,
    location,
    owner: userId,
    image: imageId,
  };
  return xataClient.db.Event.create(newEvent) as Promise<EventRecord>;
};

export const getHostedEventsByUser = async (
  userId: string
): Promise<EventRecord[]> => {
  return xataClient.db.Event.filter({
    owner: userId,
  })
    .select([
      '*',
      'owner.*',
      'image.*',
      {
        name: '<-Item.event',
        columns: ['*'],
      },
      {
        name: '<-Rsvp.event',
        columns: ['*'],
      },
    ])
    .getMany() as Promise<EventRecord[]>;
};

//TODO: write query to get events attended by user
export const getAttendingEventByUser = async (
  userId: string
): Promise<EventRecord[]> => {
  return xataClient.db.Event.filter({
    $not: {
      owner: userId,
    },
  })
    .select([
      '*',
      'owner.*',
      'image.*',
      {
        name: '<-Item.event',
        columns: ['*'],
      },
      {
        name: '<-Rsvp.event',
        columns: ['*'],
      },
    ])
    .getMany() as Promise<EventRecord[]>;
};

export const getEventById = async (id: string): Promise<EventRecord> => {
  const xata = getXataClient();
  const event = (await xata.db.Event.select([
    '*',
    'owner.*',
    'image.*',
    {
      name: '<-Items.event',
      columns: ['*'],
    },
    {
      name: '<-Rsvp.event',
      columns: ['*'],
    },
  ])
    .filter({
      id,
    })
    .getFirst()) as EventRecord;

  return event;
};

interface EventWithDetails extends EventRecord {
  items: ItemRecord[];
  rsvps: RsvpRecord[];
  owner: UserProfileRecord;
  image: EventImageRecord;
}

export const getEventByIdWithDetails = async (
  id: string
): Promise<EventWithDetails | null> => {
  const xata = getXataClient();

  //TODO: how to get user info from rsvp
  const event = await xata.db.Event.select([
    '*',
    'owner.*',
    'image.*',
    {
      name: '<-Item.event',
      columns: ['*'],
    },
    {
      name: '<-Rsvp.event',
      columns: ['event', 'user', 'user.name', 'status'],
    },
  ])
    .filter({
      id,
    })
    .getFirst();

  if (!event) {
    return null;
  }

  const items = event.Itemevent?.records as ItemRecord[];
  const rsvps = event.Rsvpevent?.records as RsvpRecord[];
  const owner = event.owner as UserProfileRecord;
  const image = event.image as EventImageRecord;

  const rsvpWithDetails: EventWithDetails = {
    ...event,
    items,
    rsvps,
    owner,
    image,
  };
  return rsvpWithDetails;
};
