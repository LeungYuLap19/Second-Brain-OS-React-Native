export interface EmailListItemData {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  tags?: string[];
}

export interface EmailDetailData extends EmailListItemData {
  body: string;
  to: string[];
  cc?: string[];
}
