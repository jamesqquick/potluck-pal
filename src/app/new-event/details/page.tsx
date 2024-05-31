'use client';
import CreateEventFormProgress from '@/components/CreateEventFormProgress';
import EventDetailsForm from '@/components/EventDetailsForm';
import EventFormLoader from '@/components/EventFormLoader';
import FormHeader from '@/components/FormHeader';
import React from 'react';

export default function Step1Page() {
  const text = 'Event Details';
  const subtext = undefined;
  const currentStep = 1;
  return (
    <div className="max-w-2xl mx-auto pb-20 relative">
      <FormHeader text={text} subtext={subtext} />
      <div className="relative">
        <EventFormLoader validateData={() => true}>
          <EventDetailsForm />
        </EventFormLoader>
      </div>
    </div>
  );
}
