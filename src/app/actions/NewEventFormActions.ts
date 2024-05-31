'use server';
import { redirect } from 'next/navigation';

export const goToEventItemsAction = () => {
  redirect('/new-event/items');
};

export const goToEventAttendeesAction = () => {
  redirect('/new-event/attendees');
};

export const goToEventPreviewAction = () => {
  redirect('/new-event/preview');
};
