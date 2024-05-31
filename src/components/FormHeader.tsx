import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

export default function FormHeader({
  text,
  subtext,
}: {
  text: string;
  subtext?: string;
}) {
  return (
    <header className="pb-10">
      <h1 className="text-2xl xl:text-4xl  flex flex-col gap-y-2 md:flex-row items-center ">
        <span className="font-bold">Create Your Event</span>{' '}
        <FaChevronRight className="h-4 mx-2 hidden md:block" />
        <span className=" text-xl font-normal">{text}</span>
      </h1>
      {subtext && <p className="hidden md:block pt-4 ml-2">{subtext}</p>}
    </header>
  );
}
