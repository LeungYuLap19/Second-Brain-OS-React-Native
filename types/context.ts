import { Activity, ActivityForm, ActivityMap } from "./calendar";
import { GmailDraft, GmailDraftParams, GmailReplyParams, GmailSendParams, NormalizedEmail } from "./inbox";

export interface ActivityContextValue {
  activities: ActivityMap;
  loading: boolean;
  fetchActivities: (year: number, month: number, options?: { force?: boolean }) => Promise<void>;
  createActivity: (form: ActivityForm) => Promise<Activity>;
  updateActivity: (id: string, form: ActivityForm) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
  toggleActivityDone: (id: string, completed: boolean) => Promise<void>;
}

export interface EmailContextValue {
  emails: NormalizedEmail[];
  nextPageToken?: string;
  loading: boolean;
  fetchInbox: (pageToken?: string) => Promise<void>;
  searchEmails: (query: string, pageToken?: string) => Promise<void>;
  sendEmail: (params: GmailSendParams) => Promise<NormalizedEmail | undefined>;
  replyToEmail: (params: GmailReplyParams) => Promise<NormalizedEmail | undefined>;
  createDraft: (params: GmailDraftParams) => Promise<GmailDraft | undefined>;
}