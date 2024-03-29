import { searchUserProfiles } from '@/utils/userProfile';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchTerm = searchParams.get('searchTerm');
  if (searchTerm === null) {
    return new Response(JSON.stringify([]), {
      status: 200,
    });
  }
  const profiles = await searchUserProfiles(searchTerm);
  return new Response(JSON.stringify(profiles), {
    status: 200,
  });
}
