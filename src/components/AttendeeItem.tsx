import { AttendeeInput } from '@/context/NewEventContext';
import {
  FaMinus,
  FaMinusCircle,
  FaMinusSquare,
  FaRegTrashAlt,
  FaTrashAlt,
  FaTrashRestore,
} from 'react-icons/fa';
import { FaRegTrashCan, FaTrashArrowUp, FaTrashCan } from 'react-icons/fa6';
import AttendeeInitials from './AttendeeInitials';

export default function AttendeeItem({
  attendee,
  removeAttendee,
}: {
  attendee: AttendeeInput;
  removeAttendee?: (id: string) => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-x-3 items-center  px-4 py-3">
        <AttendeeInitials name={attendee.name} />

        <span className="text-gray-1">{attendee.name}</span>
        <small className="text-gray-1 font-light">@{attendee.username}</small>
      </div>
      {removeAttendee && (
        <button
          onClick={() => removeAttendee(attendee.id)}
          className="text-primary text-sm rounded-full h-8 w-8 flex items-center justify-center bg-surface-1 hover:-translate-y-0.5 transition-transform"
        >
          <FaMinus className="text-xs" />
        </button>
      )}
    </div>
  );
}
