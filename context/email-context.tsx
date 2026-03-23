import { useEmailActions } from '@/hooks/use-email-actions';
import type { EmailContextValue, GmailMessage } from '@/types';
import { createContext, useContext, useState } from 'react';

const EmailContext = createContext<EmailContextValue | null>(null);

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [emails, setEmails] = useState<GmailMessage[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const hookReturns = useEmailActions(setEmails, setNextPageToken);

  return (
    <EmailContext.Provider
      value={{
        emails,
        nextPageToken,
        ...hookReturns,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export function useEmails() {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmails must be used within an EmailProvider');
  }
  return context;
}