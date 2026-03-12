import { checkAppleSignIn, getAppleUserData } from './apple';
import { checkGoogleSignIn, getGoogleUserData } from './google';

export async function checkSignedIn(): Promise<boolean> {
  const [apple, google] = await Promise.all([checkAppleSignIn(), checkGoogleSignIn()]);
  return apple || google;
}

export async function getCurrentUser(): Promise<{ id: string }> {
  const apple = await getAppleUserData();
  if (apple?.id) return { id: apple.id };

  const google = await getGoogleUserData();
  if (google?.id) return { id: google.id };

  throw new Error('Not authenticated');
}
