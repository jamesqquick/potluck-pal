import { env } from '@/env';
import { newEventFormSchema } from '@/schemas/NewEvent';
import { MinimumImageData } from '@/utils/EventImages';
import { EventImage, UserProfileRecord } from '@/xata';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export type EventData = EventDetails & {
  items: ItemInput[];
  attendees: AttendeeInput[];
};

export type AttendeeInput = {
  id: string;
  name: string;
  username: string;
};

export type ItemInput = {
  id: string;
  name: string;
  quantity: number;
};

export type EventDetails = {
  name: string;
  date: string;
  location: string;
  description: string;
  imageURL: string;
  imageId: string;
};

export type NewEventContextValue = {
  eventData: EventData;
  dataLoaded: boolean;
  updateEventDetails: (eventDetails: Partial<EventDetails>) => void;
  addAttendee: (attendee: UserProfileRecord) => void;
  updateItem: (id: string, item: Partial<ItemInput>) => void;
  addItem: () => void;
  removeAttendee: (id: string) => void;
  removeItem: (id: string) => void;
  updateItems: (items: ItemInput[]) => void;
  clearLocalStorage: () => void;
  eventImages: EventImage[];
  selectRandomImage: () => void;
};

const NewEventFormContext = createContext<NewEventContextValue | null>(null);

export function EventFormContextProvider({
  children,
  eventImages,
}: {
  children: React.ReactNode;
  eventImages: MinimumImageData[];
}) {
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    date: '',
    location: '',
    description: '',
    items: [{ id: uuidv4(), name: '', quantity: 1 }],
    attendees: [],
    imageURL: env.NEXT_PUBLIC_DEFAULT_IMAGE_URL,
    imageId: eventImages[0].id,
  });

  const [selectedImageIndex, setselectedImageIndex] = useState(0);

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

  const selectRandomImage = () => {
    const random = Math.floor(Math.random() * eventImages.length);
    setEventData((prev) => ({
      ...prev,
      imageURL: eventImages[random].url,
      imageId: eventImages[random].id,
    }));
    setselectedImageIndex(random);
  };

  const updateEventDetails = (eventDetails: Partial<EventDetails>) => {
    setEventData((prev) => ({
      ...prev,
      ...eventDetails,
    }));
  };

  const removeItem = (id: string) => {
    setEventData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateItems = (items: ItemInput[]) => {
    setEventData((prev) => ({
      ...prev,
      items,
    }));
  };

  const addItem = () => {
    setEventData((prev) => ({
      ...prev,
      items: [...prev.items, { id: uuidv4(), name: '', quantity: 1 }],
    }));
  };

  const updateItem = (id: string, item: Partial<ItemInput>) => {
    setEventData((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === id ? { ...i, ...item } : i)),
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
    localStorage.setItem(
      'potluckpal_eventData',
      JSON.stringify(currentEventData)
    );
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('potluckpal_eventData');
  };

  const readFromLocalStorage = () => {
    const defaultData = {
      name: '',
      date: '',
      location: '',
      description: '',
      items: [{ id: uuidv4(), name: '', quantity: 1 }],
      attendees: [],
      imageURL: eventImages[0].url,
      imageId: eventImages[0].id,
    };
    const loadedDataString = localStorage.getItem('potluckpal_eventData');
    if (!loadedDataString) return setEventData(defaultData);

    try {
      const parsed = newEventFormSchema.parse(JSON.parse(loadedDataString));
      setEventData(parsed);
    } catch (error) {
      console.error(error);
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
        clearLocalStorage,
        updateItems,
        dataLoaded,
        updateItem,
        addItem,
        removeItem,
        eventImages,
        selectRandomImage,
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
