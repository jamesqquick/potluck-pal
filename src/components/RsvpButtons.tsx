'use client';
import { rsvpForEventAction } from '@/app/actions/Rsvps';
import { RsvpStatus } from '@/types/ReturnValue';
import { rsvpForEvent } from '@/utils/rsvps';
import React from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

export default function RsvpButtons({
  rsvpId,
  status,
}: {
  rsvpId: string;
  status: RsvpStatus;
}) {
  const handleRsvpYes = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await rsvpForEventAction(rsvpId, RsvpStatus.GOING);
      toast.success('RSVPed YES for event', {
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to RSVP for event', {
        duration: 4000,
      });
    }
  };

  const handleRsvpNo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await rsvpForEventAction(rsvpId, RsvpStatus.NOT_GOING);
      toast.success('RSVPed NO for event', {
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to RSVP for event', {
        duration: 4000,
      });
    }
  };

  return (
    <div className="flex gap-x-2">
      <button
        onClick={handleRsvpYes}
        className={twMerge(
          ' rounded-lg text-sm gap-x-1 p-2 flex items-center justify-center bg-gray-200 hover:-translate-y-0.5 transition-transform',
          status === RsvpStatus.GOING && 'bg-green-500 text-green-50'
        )}
      >
        <FaCheck />
        <span>Going</span>
      </button>
      <button
        onClick={handleRsvpNo}
        className={twMerge(
          ' rounded-lg text-sm gap-x-1 p-2 flex items-center justify-center bg-gray-200 hover:-translate-y-0.5 transition-transform',
          status === RsvpStatus.NOT_GOING && 'bg-red-500 text-red-50'
        )}
      >
        <FaX />
        <span>Not Going</span>
      </button>
    </div>
  );
}
