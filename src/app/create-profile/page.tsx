import CreateProfileForm from '@/components/CreateProfileForm';
import { getUserProfile } from '@/utils/userProfile';
import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Header from '@/components/Header';

export default async function CreateProfilePage() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/');
  }
  const userProfileResponse = await getUserProfile(user.id);

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
