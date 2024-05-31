import { getEventImages } from '@/utils/EventImages';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const images = await getEventImages();
  return new Response(JSON.stringify(images), {
    status: 200,
  });
}
