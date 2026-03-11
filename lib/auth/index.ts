import { getAppleUserData } from './apple';
import { getGoogleUserData } from './google';

export async function getCurrentUser(): Promise<{ id: string }> {
  const apple = await getAppleUserData();
  if (apple?.id) return { id: apple.id };

  const google = await getGoogleUserData();
  if (google?.id) return { id: google.id };

  throw new Error('Not authenticated');
}
