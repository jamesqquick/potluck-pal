import { FaCalendar, FaMapPin } from 'react-icons/fa';
import event1 from '../../public/images/event1.png';
import event2 from '../../public/images/event2.png';
import person1 from '../../public/images/person1.png';
import person2 from '../../public/images/person2.png';
import person3 from '../../public/images/person3.png';
import person4 from '../../public/images/person4.png';
import person5 from '../../public/images/person5.png';
import person6 from '../../public/images/person6.png';
import person7 from '../../public/images/person7.png';
import person8 from '../../public/images/person8.png';
import person9 from '../../public/images/person9.png';
import person10 from '../../public/images/person10.png';
import person11 from '../../public/images/person11.png';
import Image from 'next/image';

const fakeEvents = [
  {
    title: "Christmas Get-together @ Kate's",
    host: 'Kate Thomas',
    location: '19 Lounge Street, Denver, CA',
    date: 'December 16, 2024',
    time: '5pm',
    peopleImages: [person1, person2, person3, person4, person5],
    coverImage: event1,
  },
  {
    title: 'March Break Potluck',
    host: 'Kim Ropley',
    location: '42 March Road, Nashville, TN',
    date: 'December 16, 2024',
    time: '5pm',
    peopleImages: [person6, person7, person8, person9, person11],
    coverImage: event2,
  },
];

const fakeItems = [
  {
    title: 'Veggie Samosas',
    quantity: 10,
    image: person10,
  },
  {
    title: 'Chicken pot pie',
    quantity: 4,
    image: person10,
  },
];

export default function FakeEvents() {
  return (
    <div className="">
      <div className="relative flex flex-col gap-y-4 p-4 bg-white rotate-6 w-[540px] rounded-2xl z-20 translate-y-4 translate-x-16 shadow-lg">
        {fakeEvents.map((event, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <Image
              key={index}
              className="w-24 h-24 -ml-3 -rotate-6 self-center"
              src={event.coverImage}
              alt="profile picture"
            />
            <div className="w-1/2 h-full  rounded-r-2xl grow">
              <p className="text-xl font-bold">{event.title}</p>
              <p className="text-primary">
                Hosted by <span className="underline">{event.host}</span>
              </p>
              <div className="flex gap-x-6 items-end">
                <div className="pt-2 flex flex-col gap-y-1">
                  <div className="flex gap-x-2">
                    <FaMapPin className="text-gray-1" />
                    <p className="text-sm text-gray-1">{event.location}</p>
                  </div>
                  <div className="flex gap-x-2">
                    <FaCalendar className="text-gray-1" />
                    <p className="text-sm text-gray-1">
                      {event.date} <span className="pl-4">{event.time}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {event.peopleImages.map((image, index) => (
                    <Image
                      key={index}
                      className="w-10 h-10 -ml-3 rounded-full self-center"
                      src={image}
                      alt="profile picture"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative p-6 bg-white -rotate-1 w-[500px] rounded-2xl z-10 overflow-y-hidden  h-52 shadow-lg">
        <p className="text-xl font-bold">Assign a dish to your guests</p>
        {fakeItems.map((item, index) => (
          <div className="flex gap-x-2 items-stretch pt-6" key={index}>
            <p className="bg-surface-0 px-8 py-6 rounded-lg w-80">
              {item.title}
            </p>
            <div className="flex items-center justify-center rounded-xl text-lg border p-4 w-16 border-surface-2">
              <p>{item.quantity}</p>
            </div>

            <Image
              className="w-10 h-10 rounded-full self-center"
              src={item.image}
              alt="profile picture"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
