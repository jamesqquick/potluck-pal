'use client';
import EventFormLoader from '@/components/EventFormLoader';
import FormHeader from '@/components/FormHeader';
import NewEventPreview from '@/components/NewEventPreview';
import PreviewForm from '@/components/PreviewForm';
import { EventData } from '@/context/NewEventContext';

export default function Step4() {
  const text = 'Review and Publish';
  const subtext =
    'Make sure everything looks good before publishing your event.';
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
          <div className="block lg:hidden pb-10">
            <NewEventPreview />
          </div>
          <PreviewForm />
        </EventFormLoader>
      </div>
    </div>
  );
}
