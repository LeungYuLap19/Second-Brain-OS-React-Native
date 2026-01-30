import { Chatroom } from "@/app/history-modal";

export const sampleChatrooms: Chatroom[] = [
  {
    id: "chat_001",
    topic: "Trip Planning",
    messages: [
      {
        id: "msg_001",
        role: "user",
        content: "I'm planning a trip to Japan next month. Any recommendations?",
        timestamp: new Date("2024-01-15T09:30:00")
      },
      {
        id: "msg_002",
        role: "assistant",
        content: "That's exciting! Japan is beautiful in spring. Are you interested in cities like Tokyo and Kyoto, or more rural areas?",
        timestamp: new Date("2024-01-15T09:31:00")
      },
      {
        id: "msg_003",
        role: "user",
        content: "Mostly Tokyo and maybe a day trip somewhere nearby. I love food and temples!",
        timestamp: new Date("2024-01-15T09:32:00")
      }
    ],
    startedAt: new Date("2024-01-15T09:30:00"),
    updatedAt: new Date("2024-01-15T09:32:00")
  },
  {
    id: "chat_002",
    topic: "Programming Help",
    messages: [
      {
        id: "msg_004",
        role: "user",
        content: "I'm getting an undefined error in my React component. Here's my code...",
        timestamp: new Date("2024-01-14T14:20:00")
      },
      {
        id: "msg_005",
        role: "assistant",
        content: "I can help with that. Could you share the component code and the specific error message?",
        timestamp: new Date("2024-01-14T14:21:00")
      },
      {
        id: "msg_006",
        role: "user",
        content: "The error says 'Cannot read properties of undefined' on line 15.",
        timestamp: new Date("2024-01-14T14:22:00")
      },
      {
        id: "msg_007",
        role: "assistant",
        content: "This usually happens when you're trying to access a property on an object that doesn't exist yet. Check if your data is loaded before rendering.",
        timestamp: new Date("2024-01-14T14:23:00")
      }
    ],
    startedAt: new Date("2024-01-14T14:20:00"),
    updatedAt: new Date("2024-01-14T14:23:00")
  },
  {
    id: "chat_003",
    topic: "Recipe Ideas",
    messages: [
      {
        id: "msg_008",
        role: "user",
        content: "Looking for vegetarian dinner ideas that are quick to make.",
        timestamp: new Date("2024-01-13T18:45:00")
      },
      {
        id: "msg_009",
        role: "assistant",
        content: "How about a vegetable stir-fry with tofu? Or black bean tacos?",
        timestamp: new Date("2024-01-13T18:46:00")
      }
    ],
    startedAt: new Date("2024-01-13T18:45:00"),
    updatedAt: new Date("2024-01-13T18:46:00")
  },
  {
    id: "chat_004",
    topic: "Book Recommendations",
    messages: [
      {
        id: "msg_010",
        role: "user",
        content: "I just finished Project Hail Mary and loved it. Similar sci-fi books?",
        timestamp: new Date("2024-01-12T20:15:00")
      }
    ],
    startedAt: new Date("2024-01-12T20:15:00"),
    updatedAt: new Date("2024-01-12T20:15:00")
  },
  {
    id: "chat_005",
    topic: "Fitness Routine",
    messages: [
      {
        id: "msg_011",
        role: "user",
        content: "I want to start a home workout routine with minimal equipment.",
        timestamp: new Date("2024-01-10T07:30:00")
      },
      {
        id: "msg_012",
        role: "assistant",
        content: "Great idea! Bodyweight exercises are perfect for this. How many days per week were you thinking?",
        timestamp: new Date("2024-01-10T07:31:00")
      },
      {
        id: "msg_013",
        role: "user",
        content: "Probably 3-4 days. I have some dumbbells and resistance bands.",
        timestamp: new Date("2024-01-10T07:32:00")
      }
    ],
    startedAt: new Date("2024-01-10T07:30:00"),
    updatedAt: new Date("2024-01-10T07:32:00")
  }
];