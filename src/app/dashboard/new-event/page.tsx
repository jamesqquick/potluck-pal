import { redirect } from 'next/navigation';

export default function createEventPage() {
  redirect('/dashboard/new-event/step-1');
}
