import { EventImage, getXataClient } from '@/xata';

//function to query event images
export interface MinimumImageData {
  id: string;
  name: string;
  url: string;
}

export async function getEventImages(): Promise<MinimumImageData[]> {
  const xata = getXataClient();
  const eventImages = await xata.db.EventImage.select([
    'file.id',
    'file.name',
    'file.url',
  ])
    .filter({
      $exists: 'file',
    })
    .getMany();

  //TODO typescript says file could be null
  return eventImages.map((image) => ({
    id: image.id,
    name: image.file?.name || '',
    url: image.file?.url || '',
  }));
}
