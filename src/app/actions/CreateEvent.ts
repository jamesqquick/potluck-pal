'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createEvent } from '@/utils/events';
import { createItemsForEvent } from '@/utils/items';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const eventFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string().transform((date) => new Date(date)),
  location: z.string(),
  userId: z.string(),
});

export async function handleCreateEvent(formData: FormData) {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/');
  }

  const parsed = eventFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    date: formData.get('date'),
    location: formData.get('location'),
    userId: user.id,
  });

  //get the array of items from the form data
  let items = Array.from(formData.entries())
    .filter((entry) => entry[0].startsWith('item-'))
    .map((entry) => entry[1] as string);

  // let items = Array.from(formData.entries())
  //     .reduce((acc: string[], entry) => {
  //         if(entry[0].startsWith('item-')){
  //             acc.push(entry[1] as string)
  //         }
  //         return acc;
  //     }, []);

  // let items = [];
  // for( let entry of Array.from(formData.entries())){
  //     if(entry[0].startsWith('item-')){
  //         items.push(entry[1] as string)
  //     }
  // }

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const { name, description, date, location, userId } = parsed.data;

  const createRecordResponse = await createEvent(
    name,
    location,
    date,
    description,
    userId
  );

  if ('error' in createRecordResponse) {
    return { error: createRecordResponse.error };
  }

  const createdEvent = createRecordResponse.data;

  //create the items
  const createItemsResponse = createItemsForEvent(items, createdEvent.id);

  if ('error' in createItemsResponse) {
    return { error: createItemsResponse.error };
  }

  redirect(`/events/${createdEvent.id}`);
}
