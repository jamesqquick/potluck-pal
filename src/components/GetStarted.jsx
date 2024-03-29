import { FaArrowRight } from 'react-icons/fa';

export default function GetStarted() {
  const steps = [
    {
      number: 1,
      title: 'Sign up for FREE',
      description:
        'No hidden fees, no hassle. Start planning your upcoming potlucks with ease today!',
    },
    {
      number: 2,
      title: 'Create your event',
      description:
        'Add your event details and easily assign dishes for your guests to bring.',
    },
    {
      number: 3,
      title: 'Enjoy your event',
      description:
        'There is no step 3! Await the arrival of your guests with their assigned dished. ',
    },
  ];
  return (
    <div>
      <h2 className="text-4xl font-bold">Get started in 3 simple steps</h2>
      <div className="grid grid-cols-getting-started items-center space-between py-10 gap-x-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="border border-primary border-opacity-20 p-8 pt-16 rounded-2xl relative"
          >
            <div className="absolute text-primary text-opacity-15 top-4 right-4 text-8xl font-bold">
              {step.number}
            </div>
            <h3 className="text-2xl font-bold pb-8 text-primary">
              {step.title}
            </h3>
            <p className=" text-md">{step.description}</p>
          </div>
        ))}
        <div className="h-16 w-16 flex items-center justify-center bg-surface-1 rounded-full">
          <FaArrowRight className="h-24 text-2xl text-primary " />
        </div>
      </div>
    </div>
  );
}
