'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.svg';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
export default function Navbar() {
  return (
    <nav className="flex flex-col  md:flex-row items-center gap-y-4 justify-between py-20">
      <Link href="/" className="text-2xl font-bold -ml-8">
        <Image className="h-10" src={logo} alt="Potluck Pal" />
      </Link>
      <ul className="flex space-x-6 items-center">
        <SignedIn>
          <li className="text-gray-1 hover:text-primary transition-colors">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <li className="border-primary border py-1 px-4 text-primary rounded-lg">
            <Link href="/sign-in">Sign in</Link>
          </li>
          <li className="bg-primary border py-1 px-4 text-white rounded-lg">
            <Link href="/sign-up">Sign up</Link>
          </li>
        </SignedOut>
      </ul>
    </nav>
  );
}
