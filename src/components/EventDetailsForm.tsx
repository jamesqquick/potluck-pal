'use client';
import { useNewEventFormContext } from '@/context/NewEventContext';
import SubmitButton from './SubmitButton';
import { goToEventItemsAction } from '@/app/actions/NewEventFormActions';

export default function EventDetailsForm() {
  const { updateEventDetails, eventData } = useNewEventFormContext();

  return (
    <form action={goToEventItemsAction}>
      <div className="flex flex-col space-y-6">
        <div>
          <label className="block text-gray-1 mb-1" htmlFor="fullName">
            Event Name
          </label>
          <input
            type="text"
            required
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
            value={eventData.name}
            onChange={(e) => {
              updateEventDetails({ name: e.target.value });
            }}
          />
        </div>
        <div className="relative">
          <label className="block text-gray-1 mb-1" htmlFor="date">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              required
              id="date"
              name="date"
              placeholder="Mon April 7th at 5pm"
              className={`border border-gray-1 w-full p-4 rounded-xl`}
              value={eventData.date}
              onChange={(e) => {
                updateEventDetails({ date: e.currentTarget.value });
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-1 mb-1" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            required
            id="location"
            name="location"
            placeholder="1234 Apple Ridge Ln Manolo, MS"
            className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
            value={eventData.location}
            onChange={(e) => {
              updateEventDetails({ location: e.currentTarget.value });
            }}
          />
        </div>
        <div>
          <label className="block text-gray-1 mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            rows={5}
            required
            id="description"
            name="description"
            className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
            value={eventData.description}
            onChange={(e) => {
              updateEventDetails({ description: e.currentTarget.value });
            }}
          />
        </div>
      </div>{' '}
      <div className="pt-10">
        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}
