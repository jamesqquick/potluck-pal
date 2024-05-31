'use server';
import { RsvpStatus } from '@/types/ReturnValue';
import { EventRecord, RsvpRecord, getXataClient } from '@/xata';

export const createRSVPsForEvent = async (
  attendeesIds: string[],
  eventId: string
): Promise<RsvpRecord[]> => {
  const rsvpsToCreate = attendeesIds.map((id) => ({
    user: id,
    event: eventId,
    status: RsvpStatus.NOT_RESPONDED,
  }));
  const records = (await getXataClient().db.Rsvp.create(
    rsvpsToCreate
  )) as RsvpRecord[];
  return records;
};

interface RSVPWithEvent extends RsvpRecord {
  event: EventRecord;
}

export const getNotRespondedRSVPs = async (
  userId: string
): Promise<RSVPWithEvent[]> => {
  const xata = getXataClient();
  const rsvps = xata.db.Rsvp.filter({
    status: RsvpStatus.NOT_RESPONDED,
    user: userId,
  })
    .select(['*', 'event.*', 'event.owner.*', 'event.image.*'])
    .getMany() as Promise<RSVPWithEvent[]>;
  return rsvps;
};

export const getInvitesByUserCount = async (
  userId: string
): Promise<number> => {
  const xata = getXataClient();
  const data = await xata.db.Rsvp.aggregate({
    invitesCount: {
      count: {
        filter: {
          status: RsvpStatus.NOT_RESPONDED,
          user: userId,
        },
      },
    },
  });
  const count = data.aggs.invitesCount;
  return count;
};

export const rsvpForEvent = async (
  rsvpId: string,
  status: RsvpStatus
): Promise<RsvpRecord> => {
  return getXataClient().db.Rsvp.update(rsvpId, {
    status,
  }) as Promise<RsvpRecord>;
};
