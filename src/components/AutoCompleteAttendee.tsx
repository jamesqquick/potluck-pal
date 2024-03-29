'use client';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { UserProfileRecord } from '@/xata';
import AttendeeItem from './AttendeeItem';
import { useNewEventFormContext } from '@/context/NewEventContext';

export function AutoCompleteAttendee({
  onAdd,
}: {
  onAdd: (attendee: UserProfileRecord) => void;
}) {
  const [val, setVal] = useState<string>('');
  const { eventData } = useNewEventFormContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [debouncedVal] = useDebounce(val, 200);
  const { data, isLoading } = useQuery<UserProfileRecord[]>({
    queryKey: ['search', debouncedVal],
    queryFn: async () => {
      if (!hasSearched) {
        setHasSearched(true);
      }
      if (!debouncedVal) return [];
      const res = await fetch(
        `/api/searchAttendees?searchTerm=${debouncedVal}`
      );
      const attendeeData = await res.json();
      setSelectedIndex(0);
      return attendeeData;
    },
  });
  const [filteredAttendees, setFilteredAttendees] = useState<
    UserProfileRecord[]
  >([]);

  useEffect(() => {
    if (!data?.length) return setFilteredAttendees([]);

    const filteredBySelected = data.filter((searchedAttendee) => {
      return !eventData.attendees.find(
        (attendee) => attendee.id === searchedAttendee.id
      );
    });
    setFilteredAttendees(filteredBySelected);
  }, [data, eventData]);

  const handleClickAttendee = (attendee: UserProfileRecord) => {
    onAdd(attendee);
    setVal('');
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev + 1) % filteredAttendees.length);
    }
    if (e.key === 'ArrowUp') {
      setSelectedIndex(
        (prev) =>
          (prev - 1 + filteredAttendees.length) % filteredAttendees.length
      );
    }
    if (e.key === `Enter` && filteredAttendees.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      handleClickAttendee(filteredAttendees[selectedIndex]);
    }
  };

  return (
    <div>
      <div className="grow w-full mb-1">
        <label className="block sr-only" htmlFor="dishName">
          Attendee
        </label>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleOnKeyDown}
          type="search"
          autoComplete="off"
          id="dishName"
          name="dishName"
          placeholder="John Doe"
          className="border border-gray-1 p-4 w-full rounded-xl focus:ring-primary "
        />
      </div>
      <div className="pt-2 mb-6 ">
        {/* {!isLoading && debouncedVal && filteredAttendees?.length === 0 && (
          <p className="text-gray-1">Couldn&apos;t find any users...</p>
        )} */}
        {!isLoading && data && data.length > 0 && (
          <ul
            id="results"
            className="max-h-40 overflow-y-scroll flex flex-col shadow-base mt-0 rounded-2xl"
            style={{ scrollbarWidth: 'none' }}
          >
            {filteredAttendees.map((attendee, i) => (
              <li
                key={attendee.id}
                tabIndex={i}
                onClick={(e) => handleClickAttendee(attendee)}
                className={`cursor-pointer hover:bg-surface-0 ${
                  selectedIndex === i ? 'bg-surface-0' : ''
                }`}
              >
                <AttendeeItem attendee={attendee} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
