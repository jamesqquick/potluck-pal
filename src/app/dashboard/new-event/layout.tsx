'use client';
import CreateEventFormProgress from '@/components/CreateEventFormProgress';
import Header from '@/components/Header';
import { EventFormContextProvider } from '@/context/NewEventContext';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function CreateEventLayout({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <EventFormContextProvider>
        <div className="max-w-2xl mx-auto pb-20 relative">
          <Header text="Create your event" />
          <div className="relative">
            <div className="absolute -left-20">
              <CreateEventFormProgress steps={3} currentStep={1} />
            </div>
            {children}
          </div>
        </div>
      </EventFormContextProvider>
    </QueryClientProvider>
  );
}
