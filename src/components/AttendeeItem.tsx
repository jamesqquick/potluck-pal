import { UserProfileRecord } from '@/xata';
import { FaTrashAlt } from 'react-icons/fa';

export default function AttendeeItem({
  attendee,
  removeAttendee,
}: {
  attendee: UserProfileRecord;
  removeAttendee?: (id: string) => void;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-x-3 items-center  px-4 py-3">
        <div className="bg-surface-1 flex items-center justify-center h-10 w-10 border border-primary rounded-full">
          <span>JQ</span>
        </div>
        <span className="text-gray-1">{attendee.name}</span>
        <small className="text-gray-1 font-light">@{attendee.username}</small>
      </div>
      {removeAttendee && (
        <button
          onClick={() => removeAttendee(attendee.id)}
          className="text-gray-1"
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
}
