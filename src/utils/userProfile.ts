import { ReturnValue } from '@/types/ReturnValue';
import { UserProfileRecord, getXataClient } from '@/xata';

export const getUserProfile = async (
  userId: string
): Promise<ReturnValue<UserProfileRecord | null>> => {
  try {
    const client = await getXataClient();
    const record = (await client.db.UserProfile.filter({
      id: userId,
    }).getFirst()) as UserProfileRecord;
    return { data: record };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to get item.' };
  }
};

export const searchUserProfiles = async (
  searchString: string
): Promise<any[]> => {
  const client = await getXataClient();
  const results = await client.db.UserProfile.search(searchString, {
    target: ['username', 'name'],
  });
  const records = results.records as UserProfileRecord[];
  return records;
};

export const checkUsernameAvailable = async (
  username: string
): Promise<ReturnValue<boolean>> => {
  try {
    const record = (await getXataClient().db.UserProfile.read(
      username
    )) as UserProfileRecord | null;
    return { data: !record };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to check username availability.' };
  }
};

export const createUserProfile = async (
  username: string,
  name: string,
  userId: string
): Promise<ReturnValue<boolean>> => {
  await getXataClient().db.UserProfile.create({
    username,
    name,
    id: userId,
  });
  return { data: true };
};
