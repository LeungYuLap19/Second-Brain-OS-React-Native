import { EmailDetailData } from "@/types";

export const emailThreads: EmailDetailData[] = [
  {
    id: 'e1',
    senderName: 'Jamie Park',
    senderEmail: 'jamie@productlab.co',
    subject: 'Sprint 09 kickoff notes and open questions',
    preview: 'Sharing the kickoff notes from this morning and two open questions on scope.',
    time: '9:12 AM',
    unread: true,
    tags: ['Work', 'Product'],
    to: ['you@secondbrain.ai'],
    cc: ['leah@productlab.co'],
    body:
      'Hey team,\n\nGreat kickoff today. Attached are the highlights and the open questions we need to answer by end of week:\n\n1) Do we ship the new inbox filters in this sprint?\n2) Can we move the AI triage experiment to next week?\n\nLet me know what you think and I will consolidate into the sprint plan.\n\n- Jamie',
  },
  {
    id: 'e2',
    senderName: 'Stripe Billing',
    senderEmail: 'billing@stripe.com',
    subject: 'Your invoice for February is ready',
    preview: 'Invoice #8221 is available. Amount due: $2,480.00 due on Feb 15.',
    time: 'Yesterday',
    unread: false,
    tags: ['Billing'],
    to: ['you@secondbrain.ai'],
    body:
      'Hello,\n\nYour invoice #8221 is now available. The total amount due is $2,480.00 with a due date of Feb 15, 2026.\n\nYou can view and download the invoice in the billing portal.\n\nThanks,\nStripe Billing',
  },
  {
    id: 'e3',
    senderName: 'Rosa Chen',
    senderEmail: 'rosa@studioinfinity.com',
    subject: 'Design review feedback (batch 3)',
    preview: 'Loved the new hero treatment. I have notes on typography and spacing.',
    time: 'Mon',
    unread: true,
    tags: ['Work'],
    to: ['you@secondbrain.ai'],
    cc: ['alex@studioinfinity.com'],
    body:
      'Hi!\n\nThe hero treatment is looking sharp. Feedback for batch 3:\n- tighten the body line-height in the detail view\n- increase the contrast on muted labels\n- consider a lighter stroke on the cards\n\nHappy to jump on a quick call if helpful.\n\nRosa',
  },
  {
    id: 'e4',
    senderName: 'Mom',
    senderEmail: 'mom@gmail.com',
    subject: 'Weekend plans?',
    preview: 'Are you still coming by on Saturday? Dad is making dumplings.',
    time: 'Sun',
    unread: false,
    tags: ['Personal'],
    to: ['you@secondbrain.ai'],
    body:
      'Hi love,\n\nAre you still coming by on Saturday? Dad is making dumplings and I picked up your favorite tea.\n\nLet us know what time works best.\n\nLove,\nMom',
  },
];