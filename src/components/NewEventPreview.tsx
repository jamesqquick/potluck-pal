'use client';
import { useNewEventFormContext } from '@/context/NewEventContext';
import Image from 'next/image';
import { env } from 'process';
import { FaCalendarAlt, FaMapPin } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import AttendeeInitials from './AttendeeInitials';

export default function NewEventPreview({
  allowShuffle = false,
}: {
  allowShuffle?: boolean;
}) {
  const { eventData, selectRandomImage } = useNewEventFormContext();

  return (
    <div className="rounded-lg bg-gray-50">
      <div className="relative group">
        <Image
          src={eventData.imageURL}
          width={640}
          height={360}
          alt={'Event cover image'}
          className="rounded-t-lg w-full aspect-thumbnail"
        />
        {allowShuffle && (
          <div
            className="absolute hidden cursor-pointer group-hover:flex group-hover:inset-0 bg-gray-200 bg-opacity-60 items-center justify-center"
            onClick={() => selectRandomImage()}
          >
            <FaShuffle className="text-2xl text-gray-800" />
          </div>
        )}
      </div>

      <div className="p-4 md:p-8">
        <div className="pb-4">
          <h1 className="text-xl font-bold line-clamp-1">{eventData.name}</h1>
          {/* <p className="text-primary ">Hosted by: {event.owner?.name} </p> */}
        </div>
        <div className="pb-6">
          <div className="pb-1 flex gap-x-2 items-center ">
            <FaCalendarAlt className=" text-gray-1" />
            <p className="line-clamp-1">{eventData.location}</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <FaMapPin className=" text-gray-1" />
            <p className="line-clamp-1">
              {eventData?.date &&
                new Date(eventData.date).toLocaleDateString('en-us', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
            </p>
          </div>
        </div>

        <div className="pb-4">
          <p className="font-bold">About this event</p>
          <p className="font-light">{eventData.description}</p>
        </div>
        <div className="flex">
          {eventData.attendees.map((attendee) => (
            <div className="-ml-2" key={attendee.id}>
              <AttendeeInitials name={attendee.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
