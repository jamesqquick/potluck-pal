import AttendeeInitials from '@/components/AttendeeInitials';
import RsvpButtons from '@/components/RsvpButtons';
import { env } from '@/env';
import { RsvpStatus } from '@/types/ReturnValue';
import { getEventByIdWithDetails } from '@/utils/events';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaMapPin } from 'react-icons/fa';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { userId } = auth().protect();

  if (!id || typeof id !== 'string') {
    throw new Error('Invalid id');
  }

  const event = await getEventByIdWithDetails(id);
  //TODO: ? don't know how to get typescript to work
  const myRsvp = event?.rsvps.find((rsvp) => rsvp.user === userId);

  if (!event || (event?.owner.id !== userId && !myRsvp)) {
    return notFound();
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
        <div className="bg-gray-50 rounded-lg">
          <div>
            <Image
              src={event.image?.file?.url || env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}
              width={640}
              height={360}
              alt={'Event cover image'}
              className="rounded-t-lg w-full aspect-thumbnail"
            />
          </div>
          <div className="p-8">
            {myRsvp && (
              <div className="pb-4">
                <RsvpButtons
                  rsvpId={myRsvp.id}
                  status={myRsvp.status as RsvpStatus}
                />
              </div>
            )}
            <div className="pb-4">
              <h1 className="text-2xl font-bold">{event.name}</h1>
              <p className="text-primary ">Hosted by: {event.owner?.name} </p>
            </div>
            <div className="pb-6">
              <p className="pb-1 flex gap-x-2 items-center">
                <FaCalendarAlt className=" text-gray-1" />
                {event.location}
              </p>
              <p className="flex gap-x-2 items-center">
                <FaMapPin className=" text-gray-1" />
                {event.date.toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="">
              <p className="font-bold">About this event</p>
              <p className="font-light">{event.description}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="pb-10">
            <p className="font-bold text-xl mb-2">The Menu</p>
            <p className="font-light">
              To take out the guess work, and keep everyone on the same page,
              here is the menu for this event.
            </p>
          </div>
          <div className="flex gap-x-8 items-center pb-2">
            <p className="block text-gray-1 mb-1 grow">Dish name</p>
            <p className="block text-gray-1 mb-1 w-16">Quantity</p>
          </div>
          <div className="flex flex-col gap-y-2">
            {event.items.map((item) => (
              <div className="flex gap-x-8 items-center " key={item.id}>
                <p className="border text-gray-500 font-light border-gray-300 p-4 grow rounded-xl focus:ring-primary ">
                  {item.name}
                </p>
                <p className="border text-gray-500 font-light border-gray-300 p-4 w-16 rounded-xl focus:ring-primary ">
                  {item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-x-1">
            {event.rsvps.map((rsvp) => (
              <>
                {rsvp.user?.name && (
                  <AttendeeInitials name={rsvp.user.name} key={rsvp.id} />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
