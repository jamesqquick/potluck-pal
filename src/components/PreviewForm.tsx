'use client';
import { createEventAction } from '@/app/actions/CreateEvent';
import { useNewEventFormContext } from '@/context/NewEventContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SubmitButton from './SubmitButton';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

export default function PreviewForm() {
  const router = useRouter();
  const { eventData } = useNewEventFormContext();
  const handleOnSubmit = async () => {
    try {
      await createEventAction(eventData);
      toast.success('Event created successfully', {
        duration: 5000,
      });
      //clearLocalStorage();
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create event');
    }
  };
  return (
    <div>
      <form action={handleOnSubmit}>
        <div className="pt-10">
          <div className="flex flex-col justify-center md:flex-row gap-4 items-center">
            <Link
              className="flex gap-x-2 items-center md:w-52"
              href="/new-event/items"
            >
              <BsArrowLeft className="text-2xl" /> <span>back</span>
            </Link>
            <SubmitButton text="Publish" />
          </div>
        </div>
      </form>
    </div>
  );
}
