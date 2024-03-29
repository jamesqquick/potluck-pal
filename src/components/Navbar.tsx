'use client';
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.svg';
export default function Navbar() {
  const { user, isLoading } = useKindeBrowserClient();
  return (
    <nav className="flex justify-between py-20">
      <p className="text-2xl font-bold">
        <Image className="h-10" src={logo} alt="Potluck Pal" />
      </p>
      <ul className="flex space-x-6 items-center">
        {user && !isLoading && (
          <>
            <li className="text-gray-1 hover:text-primary transition-colors">
              <Link href="/dashboard">My Events</Link>
            </li>
            <li className="text-gray-1 hover:text-primary transition-colors">
              <Link href="/dashboard/new-event/step-1">Create An Event</Link>
            </li>
            <li className="border-primary border py-1 px-4 text-primary hover:bg-surface-1 hover:border-surface-1 transition-colors rounded-lg">
              <LogoutLink>Log out</LogoutLink>
            </li>
          </>
        )}
        {!user && !isLoading && (
          <li className="border-primary border py-1 px-4 text-primary rounded-lg">
            <LoginLink>Sign in</LoginLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
