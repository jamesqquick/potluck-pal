'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNewEventFormContext } from '@/context/NewEventContext';

export default function EventDetailsForm() {
  const router = useRouter();
  const { updateEventDetails, eventData } = useNewEventFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // updateEventDetails({
    //   name: e.currentTarget.fullName.value,
    //   dateAndTime: e.currentTarget.dateAndTime.value,
    //   location: e.currentTarget.location.value,
    //   description: e.currentTarget.description.value,
    // });
    router.push('step-2');
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <label className="block text-gray-1 mb-1" htmlFor="dateAndTime">
            Date and Time
          </label>
          <div className="relative">
            <input
              type="text"
              required
              id="dateAndTime"
              name="dateAndTime"
              placeholder="Mon April 7th at 5pm"
              className={`border border-gray-1 w-full p-4 rounded-xl`}
              value={eventData.dateAndTime}
              onChange={(e) => {
                updateEventDetails({ dateAndTime: e.currentTarget.value });
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
        <button
          type="submit"
          className={`bg-primary text-lg text-white py-4 px-6 rounded-xl disabled:opacity-50 w-full`}
        >
          Continue
        </button>
      </div>
    </form>
  );
}
