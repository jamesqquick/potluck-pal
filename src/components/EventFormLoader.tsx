'use client';
import { EventData, useNewEventFormContext } from '@/context/NewEventContext';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  validateData: (eventData: EventData) => boolean;
}

export default function EventFormLoader({ children, validateData }: Props) {
  const { dataLoaded, eventData } = useNewEventFormContext();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (dataLoaded) {
      if (!validateData(eventData)) {
        redirect('/new-event/details');
      } else {
        setValidated(true);
      }
    }
  }, [eventData, dataLoaded, validateData]);

  return (
    <>
      {dataLoaded && validated ? (
        <>{children}</>
      ) : (
        <div className=" min-h-44 text-center">Loading...</div>
      )}
    </>
  );
}
