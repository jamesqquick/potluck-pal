import { redirect } from 'next/navigation';

export default function createEventPage() {
  redirect('/new-event/details');
}
