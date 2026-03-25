# Copilot instructions for `Second-Brain-OS-Mobile`

## Build, run, test, and lint commands

- Install dependencies with `npm install`.
- Start the Expo dev server with `npm start`.
- Launch a native build with `npm run ios` or `npm run android`.
- Run the web target with `npm run web`.
- Lint with `npm run lint`.
- Run the full Jest suite with `npm test -- --runInBand`.
- Run a single test file with `npm test -- --runInBand __tests__/ws-parser.test.ts`.

Jest only picks up `__tests__/**/*.test.ts` files, and the repo uses the `@/` path alias in both TypeScript and Jest.

Google auth expects `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` and `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` in `.env`.

`npm run reset-project` is the Expo starter reset script from the README. Do not run it unless the task explicitly asks to wipe the current app structure.

Current baseline: `npm run lint` does not pass cleanly before changes because ESLint reports missing `react-native/no-inline-styles` rule definitions in `components/calendar/today/activity-item.tsx` and `components/calendar/week/week-row.tsx`.

## High-level architecture

This is an Expo Router app. `app/index.tsx` is the auth gate: it calls `checkSignedIn()` from `lib/auth/index.ts` and redirects either to `/(auth)` or to the tabbed app.

`app/_layout.tsx` is the real app shell. It loads the `GoogleSansCode` font, keeps the splash screen up until the app is ready, wraps the tree in `ErrorBoundary` and `ActivityProvider`, and registers the modal routes (`history-modal`, `activity-modal`, `mail-modal`).

The main product surface lives under `app/(tabs)`. `app/(tabs)/_layout.tsx` uses `expo-router/build/native-tabs` to define four native tabs: `chatroom`, `files`, `calendar`, and `inbox`.

The chat flow is split between HTTP history loading and WebSocket streaming:

- `app/(tabs)/chatroom/[chatroom_id].tsx` loads existing chat history with `apiFetch<Chatroom>(\`/retrieve_chatroom/\${id}\`)`.
- `hooks/use-chatroom-websocket.ts` opens `${WS_URL}/${clientId}/${chatroomId}` using the device-specific client ID from `lib/utils/storage.ts`.
- Streaming responses are assembled with `parseWebSocketMessage()` from `lib/api/ws-parser.ts`, which handles response start/end tags and updates a placeholder assistant message incrementally.

Calendar state is global and provider-backed. `context/activity-context.tsx` exposes `activities` plus CRUD operations from `hooks/use-activity-crud.ts`. That hook caches the last fetched month, calls `calendarApi`, and keeps the `ActivityMap` keyed by date with entries sorted through `sortActivities()`.

Networking is centralized in `lib/api/client.ts` and `lib/api/config.ts`:

- `lib/api/config.ts` derives the backend host from Expo's `hostUri`, so local REST and WebSocket traffic target the machine running Expo instead of a hard-coded emulator-only hostname.
- `apiFetch<T>()` expects the backend response envelope to include `success`, `data`, and optional `detail`.
- `gmailFetch<T>()` attaches the Google access token, retries once after refreshing on `401`, and throws `AppError` for typed API failures.

Email support is partially wired. There is a Gmail API layer in `lib/api/gmail.ts`, action hooks in `hooks/use-email-actions.ts`, and a provider in `context/email-context.tsx`, but the current inbox screens still render fixture data from `constants/emails.ts` (`app/(tabs)/inbox.tsx` and `app/mail-modal.tsx`). Do not assume the inbox UI is already connected to live Gmail state.

## Key conventions

- Use `@/` imports instead of deep relative imports. This is the default convention across `app/`, `components/`, `hooks/`, and `lib/`.
- Keep error handling typed. The codebase consistently uses `catch (error: unknown)` and then formats messages through `getErrorMessage()`. When server status or backend `detail` matters, use `AppError`.
- New shared state should follow the existing provider pattern: create a context in `context/`, keep the mutations in a `use-*` hook, and expose a guarded accessor hook that throws when used outside its provider.
- NativeWind is the primary styling path. Tailwind scanning is limited to `app/**/*`, `components/**/*`, and `constants/**/*`, so new files outside those trees will not be picked up automatically.
- Shared UI primitives are split deliberately: screen/layout wrappers in `components/ui/layout`, reusable leaf elements in `components/ui/elements`, and animation helpers in `components/ui/animation`.
- Route structure matters. Keep Expo Router group names intact (`(auth)`, `(tabs)`) and follow existing dynamic segment naming like `[chatroom_id]`.
- Persistent chat identity is stored in AsyncStorage under the existing `clientid` and `chatroomid` keys in `lib/utils/storage.ts`; reuse those helpers instead of inventing new storage keys for the same concepts.
- `app.json` has Expo Router typed routes enabled and custom auth schemes configured, so route edits and auth callback changes should preserve those assumptions.
- The README is still mostly the default Expo starter document. For implementation work, treat the current source tree as the source of truth.
