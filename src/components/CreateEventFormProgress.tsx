'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CreateEventFormProgress() {
  const pathname = usePathname();
  const steps = 4;
  //map of current step to url
  const stepToURLMap: { [key: number]: string } = {
    0: '/new-event/details',
    1: '/new-event/items',
    2: '/new-event/attendees',
    3: '/new-event/preview',
  };

  const pathNameToStepMap: { [key: string]: number } = {
    '/new-event/details': 0,
    '/new-event/items': 1,
    '/new-event/attendees': 2,
    '/new-event/preview': 3,
  };

  const currentStep = pathNameToStepMap[pathname] + 1;
  return (
    <div className="flex 2xl:flex-col">
      {Array.from(Array(steps).keys()).map((num) => (
        <Link
          href={stepToURLMap[num]}
          className="flex flex-row 2xl:flex-col items-center"
          key={num}
        >
          <div
            className={`h-8 w-8  border-primary border rounded-full ${
              currentStep - 1 === num && 'border-4 bg-surface-0'
            } ${currentStep - 1 < num && 'border-1 border-dashed'} ${
              currentStep - 1 > num && 'bg-primary'
            }`}
          ></div>
          {num < steps - 1 && (
            <div className="w-8 h-0.5 2xl:w-0.5 2xl:h-8 bg-primary"></div>
          )}
        </Link>
      ))}
    </div>
  );
}
