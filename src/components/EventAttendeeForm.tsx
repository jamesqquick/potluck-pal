'use client';
import { useNewEventFormContext } from '@/context/NewEventContext';
import { BsArrowLeft } from 'react-icons/bs';
import { AutoCompleteAttendee } from './AutoCompleteAttendee';
import AttendeeItem from './AttendeeItem';
import Link from 'next/link';
import { goToEventPreviewAction } from '@/app/actions/NewEventFormActions';
import SubmitButton from './SubmitButton';

export default function EventAttendeeForm() {
  const { eventData, addAttendee, removeAttendee } = useNewEventFormContext();

  return (
    <form className="flex flex-col space-y-6" action={goToEventPreviewAction}>
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
        <div className="flex flex-col justify-center md:flex-row gap-4 items-center">
          <Link
            className="flex gap-x-2 items-center md:w-52"
            href="/new-event/items"
          >
            <BsArrowLeft className="text-2xl" /> <span>back</span>
          </Link>
          <SubmitButton text="Continue" />
        </div>
      </div>
    </form>
  );
}
