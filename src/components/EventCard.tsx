import { env } from '@/env';
import { EventRecord } from '@/xata';
import Image from 'next/image';
import React from 'react';
import { FaCalendarAlt, FaMapPin } from 'react-icons/fa';

export default function EventCard({
  event,
  showDescription = true,
  children,
}: {
  event: EventRecord;
  showDescription?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-gray-50">
      <div>
        <Image
          src={event.image?.file?.url || env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}
          width={640}
          height={360}
          alt={'Event cover image'}
          className="rounded-t-lg w-full aspect-thumbnail"
        />
      </div>
      <div className="p-4 md:p-8">
        <div className="pb-4">
          <h1 className="text-xl font-bold line-clamp-1">{event.name}</h1>
          {/* <p className="text-primary ">Hosted by: {event.owner?.name} </p> */}
        </div>
        <div className="pb-6">
          <div className="pb-1 flex gap-x-2 items-center ">
            <FaCalendarAlt className=" text-gray-1" />
            <p className="line-clamp-1">{event.location}</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <FaMapPin className=" text-gray-1" />
            <p className="line-clamp-1">
              {event?.date &&
                new Date(event.date).toLocaleDateString('en-us', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
            </p>
          </div>
        </div>
        {showDescription && (
          <div className="">
            <p className="font-bold">About this event</p>
            <p className="font-light">{event.description}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
