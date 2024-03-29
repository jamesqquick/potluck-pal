'use client';
import CreateEventFormProgress from '@/components/CreateEventFormProgress';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EventDetailsForm from '@/components/EventDetailsForm';
import EventItemsForm from '@/components/EventItemsForm';
import EventAttendeeForm from '@/components/EventAttendeeForm';
import { useRouter } from 'next/navigation';

export default function CreateEventForm() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    dateAndTime: '',
    location: '',
    description: '',
    items: [],
    attendees: [],
  });

  const [items, setItems] = useState<{ id: string; value: string }[]>([
    { id: uuidv4(), value: '' },
  ]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const totalSteps = 3;
  const addInputField = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        value: '',
      },
    ]);
  };

  const handleInputChange = (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.value = event.target.value;
      }
      return item;
    });
    setItems(newItems);
  };

  const handleContinueClick = () => {
    router.push(`#step${currentStep + 1}`);
    setCurrentStep((prev) => prev + 1);
  };

  const handleGoBackClick = () => {
    router.push(`#step${currentStep - 1}`);
    setCurrentStep((prev) => prev - 1);
  };

  // Function to remove an input field
  const removeInputField = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const forms = [
    <EventDetailsForm key={1} goForward={handleContinueClick} />,
    <EventItemsForm
      goForward={handleContinueClick}
      goBack={handleGoBackClick}
      key={2}
    />,
    <EventAttendeeForm key={3} />,
  ];

  return (
    <div className="relative">
      <div className="absolute -left-20">
        <CreateEventFormProgress steps={3} currentStep={currentStep} />
      </div>
      {forms[currentStep]}
    </div>
  );
}

//    <div>
//         <label className="block" htmlFor="description">
//           Items
//         </label>
//         <div className="flex gap-y-2 flex-col">
//           {items.map((item, index) => (
//             <div key={item.id} className="flex gap-x-2">
//               <input
//                 type="text"
//                 className="text-gray-900"
//                 value={item.value}
//                 name={`item-${index}`}
//                 required
//                 onChange={(e) => handleInputChange(item.id, e)}
//               />
//               <button type="button" onClick={() => removeInputField(item.id)}>
//                 -
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button type="button" onClick={addInputField}>
//         Add
//       </button>
