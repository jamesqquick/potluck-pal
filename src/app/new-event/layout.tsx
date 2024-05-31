import CreateEventFormProgress from '@/components/CreateEventFormProgress';
import ClientWrapper from './EventFormClientWrapper';
import { auth } from '@clerk/nextjs/server';
import { getEventImages } from '@/utils/EventImages';

interface Props {
  children: React.ReactNode;
}

export default async function CreateEventLayout({ children }: Props) {
  auth().protect();

  const eventImages = await getEventImages();
  return (
    <div>
      <div className="relative">
        <div className="pb-8 2xl:absolute 2xl:block 2xl:-left-20 relative flex justify-center">
          <CreateEventFormProgress />
        </div>
      </div>
      <ClientWrapper eventImages={eventImages}>{children}</ClientWrapper>
    </div>
  );
}
