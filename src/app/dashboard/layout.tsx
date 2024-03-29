import React from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfile } from '@/utils/userProfile';

interface Props {
  children: React.ReactNode;
}
export default async function dashboardLayout({ children }: Props) {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/');
  }
  const userProfileResponse = await getUserProfile(user.id);

  if ('error' in userProfileResponse) {
    console.error(userProfileResponse.error);
    return null;
  }

  const userProfile = userProfileResponse.data;

  if (!userProfile) {
    return redirect('/create-profile');
  }

  return <div>{children}</div>;
}
