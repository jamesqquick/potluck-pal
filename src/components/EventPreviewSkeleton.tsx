import { env } from '@/env';
import { Events } from '@/xata';
import Image from 'next/image';
import React from 'react';
import { FaCalendarAlt, FaMapPin } from 'react-icons/fa';

export default function EventPreviewSkeleton({
  showDescription = true,
}: {
  showDescription?: boolean;
}) {
  return (
    <>
      <div className=" bg-gray-50 rounded-lg">
        <Image
          src={'/images/placeholder.jpg'}
          width={640}
          height={360}
          alt={'Event cover image'}
          className="rounded-t-lg w-full aspect-thumbnail animate-pulse"
        />{' '}
        <div className="p-8">
          <div className="mb-4">
            <h1 className="bg-gray-200 h-10 w-2/3 animate-pulse text-2xl font-bold"></h1>
            {/* <p className="text-primary ">Hosted by: {event.owner?.name} </p> */}
          </div>
          <div className="pb-6 grid gap-y-1">
            <p className=" h-4 flex gap-x-2 items-center animate-pulse w-10/12 bg-gray-200"></p>
            <p className="flex h-4 gap-x-2 items-center animate-pulse w-9/12 bg-gray-200"></p>
          </div>
          {showDescription && (
            <div className="grid gap-y-1">
              <p className="h-4 font-bold bg-gray-200 animate-pulse w-9/12"></p>
              <p className="h-4 font-light bg-gray-200 animate-pulse w-11/12"></p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
