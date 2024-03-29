'use client';
import { useNewEventFormContext } from '@/context/NewEventContext';
import { BsArrowLeft } from 'react-icons/bs';
import { AutoCompleteAttendee } from './AutoCompleteAttendee';
import AttendeeItem from './AttendeeItem';
import Link from 'next/link';
export default function EventAttendeeForm() {
  const { eventData, addAttendee, removeAttendee } = useNewEventFormContext();

  return (
    <form className="flex flex-col space-y-6">
      <div>
        {eventData.attendees.map((attendee) => (
          <AttendeeItem
            key={attendee.id}
            attendee={attendee}
            removeAttendee={removeAttendee}
          />
        ))}
      </div>
      <div>
        <AutoCompleteAttendee
          onAdd={(attendee) => {
            addAttendee(attendee);
          }}
        />
      </div>

      <div className="pt-10">
        <div className="flex gap-x-4 items-center">
          <Link
            className="flex gap-x-2 items-center w-52"
            href="/dashboard/new-event/step-2"
          >
            <BsArrowLeft className="text-2xl" /> <span>Go back</span>
          </Link>
          <button
            type="button"
            className={`bg-primary text-lg text-white py-4 px-6 rounded-xl disabled:opacity-50 w-full`}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}
