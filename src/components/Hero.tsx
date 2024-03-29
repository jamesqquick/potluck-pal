import { FaChevronRight } from 'react-icons/fa';
import FakeEvents from '@/components/FakeEvents';
export default function Hero() {
  return (
    <div className="grid grid-cols-2 gap-x-10 items-center pt-32 relative pb-20">
      <div className="absolute bottom-0 -left-40 -right-40 h-[360px] bg-surface-1"></div>
      <div className="z-10">
        <h1 className="text-5xl font-bold leading-normal">
          <span className="block">Simplify your Potlucks,</span> Delight Your
          Guests.
        </h1>
        <div className="py-8">
          <p className="text-xl ">
            Effortlessly coordinate your next gathering and ensure everyone
            brings something delicious to the table
          </p>
        </div>
        <div className="flex gap-x-10 items-center">
          <button className="rounded-2xl text-xl flex gap-x-2 items-center bg-primary hover:bg-primary-dark transition-colors py-4 px-6 text-white">
            <span>Create Your Event</span> <FaChevronRight />
          </button>
          <p className="text-gray-1">It's 100% free</p>
        </div>
      </div>
      <FakeEvents />
    </div>
  );
}
