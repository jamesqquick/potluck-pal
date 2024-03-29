'use client';
import { ItemInput, useNewEventFormContext } from '@/context/NewEventContext';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { v4 as uuid4 } from 'uuid';

export default function EventItemsForm() {
  const router = useRouter();
  const { eventData, updateItems } = useNewEventFormContext();

  const form = useForm({
    defaultValues: {
      items:
        eventData.items ||
        ([{ id: uuid4(), name: '', quantity: 1 }] as ItemInput[]),
    },
    onSubmit({ value }) {
      const { items } = value;
      updateItems(items);
      router.push('step-3');
    },
  });

  return (
    <form className="flex flex-col space-y-6">
      <form.Field name="items">
        {(field) => {
          return (
            <>
              {field.state.value.map((_, i) => {
                return (
                  <Fragment key={i}>
                    <div className="flex gap-x-8 items-start">
                      <form.Field name={`items[${i}].name`}>
                        {(subField) => {
                          return (
                            <div className="grow w-full">
                              <label
                                className="block text-gray-1 mb-1"
                                htmlFor="dishName"
                              >
                                Dish name
                              </label>
                              <input
                                type="text"
                                required
                                id="dishName"
                                name="dishName"
                                placeholder="Casserole"
                                className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
                                onChange={(e) => {
                                  subField.handleChange(e.target.value);
                                }}
                                value={subField.state.value}
                              />
                            </div>
                          );
                        }}
                      </form.Field>
                      <form.Field name={`items[${i}].quantity`}>
                        {(subField) => {
                          return (
                            <div className="grow ">
                              <label
                                className="block text-gray-1 mb-1"
                                htmlFor="quantity"
                              >
                                Quantity
                              </label>
                              <input
                                type="number"
                                required
                                id="quantity"
                                name="quantity"
                                className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
                                onChange={(e) => {
                                  subField.handleChange(e.target.valueAsNumber);
                                }}
                                value={subField.state.value}
                              />
                            </div>
                          );
                        }}
                      </form.Field>
                    </div>
                  </Fragment>
                );
              })}
              <button
                className=" text-gray-1 rounded-xl p-4"
                onClick={() =>
                  field.pushValue({ id: uuid4(), name: '', quantity: 1 })
                }
                type="button"
              >
                Add item...
              </button>
            </>
          );
        }}
      </form.Field>
      <div className="pt-10">
        <div className="flex gap-x-4 items-center">
          <Link
            href="/dashboard/new-event/step-1"
            className="flex gap-x-2 items-center w-52"
          >
            <BsArrowLeft className="text-2xl" /> <span>Go back</span>
          </Link>
          <button
            type="submit"
            className={`bg-primary text-lg text-white py-4 px-6 rounded-xl disabled:opacity-50 w-full`}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}
