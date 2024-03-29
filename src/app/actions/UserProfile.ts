'use server';

import { ReturnValue } from '@/types/ReturnValue';
import { checkUsernameAvailable, createUserProfile } from '@/utils/userProfile';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { redirect } from 'next/navigation';

export const checkUsernameAvailableAction = async (
  username: string
): Promise<ReturnValue<boolean>> => {
  return await checkUsernameAvailable(username);
};

export const createUserProfileAction = async (
  formData: FormData
): Promise<ReturnValue<boolean>> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }
  const username = formData.get('username') as string;
  const name = formData.get('name') as string;
  await createUserProfile(username, name, user.id);
  return { data: true };
};
