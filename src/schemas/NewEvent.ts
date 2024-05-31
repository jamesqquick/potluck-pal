import { z } from 'zod';

export const newEventFormSchema = z.object({
  name: z.string(),
  date: z.string(),
  location: z.string(),
  description: z.string(),
  imageURL: z.string(),
  imageId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number(),
    })
  ),
  attendees: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      username: z.string(),
    })
  ),
});
