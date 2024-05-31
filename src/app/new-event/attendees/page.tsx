'use client';
import EventAttendeeForm from '@/components/EventAttendeeForm';
import EventFormLoader from '@/components/EventFormLoader';
import FormHeader from '@/components/FormHeader';
import { EventData } from '@/context/NewEventContext';

export default function Step3() {
  const text = 'Event Attendees';
  const subtext = 'Invite guests to your event by name or username';
  const validateData = (eventData: EventData) => {
    for (const item of eventData.items) {
      if (item.name.length < 1 || item.quantity < 1) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto pb-20 relative">
      <FormHeader text={text} subtext={subtext} />
      <div className="relative">
        <EventFormLoader validateData={validateData}>
          <EventAttendeeForm />
        </EventFormLoader>
      </div>
    </div>
  );
}
