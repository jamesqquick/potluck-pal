'use client';
import EventFormLoader from '@/components/EventFormLoader';
import EventItemsForm from '@/components/EventItemsForm';
import FormHeader from '@/components/FormHeader';
import { EventData } from '@/context/NewEventContext';

export default function Step2Page() {
  const text = 'Event Items';
  const subtext = 'Add items that you would like your guests to bring';
  const validateData = (eventData: EventData) => {
    return (
      eventData.date?.length > 0 &&
      eventData.description?.length > 0 &&
      eventData.location?.length > 0 &&
      eventData.name?.length > 0
    );
  };

  return (
    <div className="max-w-2xl mx-auto pb-20 relative">
      <FormHeader text={text} subtext={subtext} />
      <div className="relative">
        <EventFormLoader validateData={validateData}>
          <EventItemsForm />
        </EventFormLoader>
      </div>
    </div>
  );
}
