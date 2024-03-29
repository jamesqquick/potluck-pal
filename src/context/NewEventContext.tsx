import { UserProfileRecord } from '@/xata';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
export type EventData = EventDetails & {
  items: ItemInput[];
  attendees: AttendeeInput[];
};

export type AttendeeInput = {
  id: string;
  name: string;
  username: string;
};

const attendeeFormSchema = z.object({
  name: z.string(),
  dateAndTime: z.string(),
  location: z.string(),
  description: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number(),
    })
  ),
  attendees: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      username: z.string(),
    })
  ),
});

export type ItemInput = {
  id: string;
  name: string;
  quantity: number;
};

export type EventDetails = {
  name: string;
  dateAndTime: string;
  location: string;
  description: string;
};
export type NewEventContextValue = {
  eventData: EventData;
  dataLoaded: boolean;
  updateEventDetails: (eventDetails: Partial<EventDetails>) => void;
  addAttendee: (attendee: UserProfileRecord) => void;
  removeAttendee: (id: string) => void;
  updateItems: (items: ItemInput[]) => void;
};

const NewEventFormContext = createContext<NewEventContextValue | null>(null);

export function EventFormContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO: track state for current step
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    dateAndTime: '',
    location: '',
    description: '',
    items: [{ id: uuidv4(), name: '', quantity: 1 }],
    attendees: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(eventData);
    }
  }, [eventData, dataLoaded]);

  const updateEventDetails = (eventDetails: Partial<EventDetails>) => {
    setEventData((prev) => ({
      ...prev,
      ...eventDetails,
    }));
  };

  const updateItems = (items: ItemInput[]) => {
    setEventData((prev) => ({
      ...prev,
      items,
    }));
  };

  const addAttendee = (attendee: UserProfileRecord) => {
    setEventData((prev) => ({
      ...prev,
      attendees: [...prev.attendees, attendee],
    }));
  };

  const removeAttendee = (id: string) => {
    setEventData((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((attendee) => attendee.id !== id),
    }));
  };

  const saveDataToLocalStorage = (currentEventData: EventData) => {
    localStorage.setItem('eventData', JSON.stringify(currentEventData));
  };

  const readFromLocalStorage = () => {
    const defaultData = {
      name: '',
      dateAndTime: '',
      location: '',
      description: '',
      items: [{ id: uuidv4(), name: '', quantity: 1 }],
      attendees: [],
    };
    const loadedDataString = localStorage.getItem('eventData');

    if (!loadedDataString) return setEventData(defaultData);

    try {
      const parsed = attendeeFormSchema.parse(JSON.parse(loadedDataString));
      setEventData(parsed);
    } catch (error) {
      setEventData(defaultData);
    }
  };

  return (
    <NewEventFormContext.Provider
      value={{
        eventData,
        updateEventDetails,
        addAttendee,
        removeAttendee,
        updateItems,
        dataLoaded,
      }}
    >
      {children}
    </NewEventFormContext.Provider>
  );
}

export const useNewEventFormContext = () => {
  const context = useContext(NewEventFormContext);
  if (!context) {
    throw new Error(
      'useNewEventFormContext must be used within a NewEventFormContext'
    );
  }

  return context;
};
