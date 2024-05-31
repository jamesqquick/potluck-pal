import CreateProfileForm from '@/components/CreateProfileForm';
import { getUserProfile } from '@/utils/userProfile';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import { auth } from '@clerk/nextjs/server';

export default async function CreateProfilePage() {
  const { userId } = auth().protect();

  const userProfileResponse = await getUserProfile(userId);

  if ('error' in userProfileResponse) {
    console.error(userProfileResponse.error);
    redirect('/');
  }

  const userProfile = userProfileResponse.data;

  if (userProfile) {
    return redirect('/dashboard');
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <Header text="Create your profile" />
      <CreateProfileForm />
    </div>
  );
}
