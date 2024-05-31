'use client';
import NewEventPreview from '@/components/NewEventPreview';
import { EventFormContextProvider } from '@/context/NewEventContext';
import { MinimumImageData } from '@/utils/EventImages';
import { EventImage } from '@/xata';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function EventFormClientWrapper({
  children,
  eventImages,
}: {
  children: React.ReactNode;
  eventImages: MinimumImageData[];
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <EventFormContextProvider eventImages={eventImages}>
        <div className="lg:grid grid-cols-2 gap-x-10">
          <div>{children}</div>
          <div className="hidden lg:block">
            <NewEventPreview allowShuffle={true} />
          </div>
        </div>
      </EventFormContextProvider>
    </QueryClientProvider>
  );
}
