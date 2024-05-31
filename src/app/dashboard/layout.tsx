import React from 'react';
import { redirect } from 'next/navigation';
import { getUserProfile } from '@/utils/userProfile';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import DashboardNav from './DashboardNav';
import { getInvitesByUserCount } from '@/utils/rsvps';

interface Props {
  children: React.ReactNode;
}
export default async function dashboardLayout({ children }: Props) {
  const { userId } = auth().protect();

  const userProfileResponse = await getUserProfile(userId);
  if ('error' in userProfileResponse) {
    console.error(userProfileResponse.error);
    return null;
  }

  const userProfile = userProfileResponse.data;
  const invitesCount = await getInvitesByUserCount(userId);

  if (!userProfile) {
    return redirect('/create-profile');
  }

  return (
    <div>
      <div className="pb-10">
        <DashboardNav invitesCount={invitesCount} />
      </div>
      {children}
    </div>
  );
}
