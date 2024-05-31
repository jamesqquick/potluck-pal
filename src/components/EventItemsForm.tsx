'use client';
import { goToEventAttendeesAction } from '@/app/actions/NewEventFormActions';
import { useNewEventFormContext } from '@/context/NewEventContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaX } from 'react-icons/fa6';
import SubmitButton from './SubmitButton';

export default function EventItemsForm() {
  const router = useRouter();
  const { eventData, updateItem, addItem, removeItem } =
    useNewEventFormContext();

  return (
    <form
      className="flex flex-col space-y-6 jsutify"
      action={goToEventAttendeesAction}
    >
      {eventData.items.map((item, i) => (
        <div className="flex gap-x-4 items-center" key={item.id}>
          <div className="grow w-full">
            <label className="block text-gray-1 mb-1" htmlFor="dishName">
              Dish name
            </label>
            <input
              type="text"
              required
              id="dishName"
              name="dishName"
              placeholder="Casserole"
              className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
              onChange={(e) => updateItem(item.id, { name: e.target.value })}
              value={item.name}
            />
          </div>
          <div className="relative">
            <label className="block text-gray-1 mb-1" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              required
              id="quantity"
              min={1}
              name="quantity"
              className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
              onChange={(e) =>
                updateItem(item.id, { quantity: e.target.valueAsNumber })
              }
              value={item.quantity}
            />
            {i > 0 && (
              <button
                type="button"
                className="absolute top-12 -right-10 h-10 w-10  text-xs text-brand flex items-center justify-center bg-surface-1 rounded-full hover:-translate-y-0.5 transition-transform"
                onClick={() => removeItem(item.id)}
              >
                <FaX />
              </button>
            )}
          </div>
          <div className="w-10"></div>
        </div>
      ))}
      <button
        className=" text-gray-1 rounded-xl p-4"
        type="button"
        onClick={addItem}
      >
        Add item...
      </button>
      <div className="pt-10">
        <div className="flex flex-col justify-center md:flex-row gap-4 items-center">
          <Link
            href="/new-event/details"
            className="flex gap-x-2 items-center md:w-52"
          >
            <BsArrowLeft className="text-2xl" /> <span>back</span>
          </Link>
          <SubmitButton text="Continue" />
        </div>
      </div>
    </form>
  );
}
