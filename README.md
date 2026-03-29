# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Project Structure

Below is the full project tree (excluding .expo, .github, .vscode, android, ios, node_modules):

```
__tests__/
   date-utils.test.ts
   storage-helpers.test.ts
   utilities.test.ts
   ws-parser.test.ts
app/
   (auth)/
      _layout.tsx
      index.tsx
   (tabs)/
      _layout.tsx
      calendar.tsx
      files.tsx
      inbox.tsx
      chatroom/
         [chatroom_id].tsx
         _layout.tsx
         index.tsx
   +not-found.tsx
   _layout.tsx
   activity-modal.tsx
   history-modal.tsx
   index.tsx
   mail-modal.tsx
assets/
   fonts/
   images/
   videos/
components/
   calendar/
      form/
         activity-field.tsx
         date-field.tsx
         notes-field.tsx
         priority-selector.tsx
         settings-fields.tsx
         tag-location-fields.tsx
         time-fields.tsx
         title-field.tsx
      month/
         month-view.tsx
      today/
         activity-item.tsx
         activity-section.tsx
         todays-activities.tsx
      week/
         week-row.tsx
         week-view.tsx
   chat/
      chat-header.tsx
      chat-input.tsx
      message-item.tsx
      message-list.tsx
   chat-history/
      history-item.tsx
   files/
      file-item.tsx
      file-status-pill.tsx
      upload-card.tsx
   inbox/
      email-detail.tsx
      email-list-item.tsx
      new-email-fields.tsx
      reply-box.tsx
   ui/
      animation/
         animated-background.tsx
         animated-height-view.tsx
         typewriter.tsx
      elements/
         badge.tsx
         circle-button.tsx
         divider.tsx
         dot-separator.tsx
         empty-state.tsx
         hidden-delete.tsx
         icon-circle.tsx
         message-composer.tsx
         section-label.tsx
         signin-button.tsx
         themed-datetime-picker.tsx
         themed-text-input.tsx
         themed-text.tsx
      layout/
         card-container.tsx
         error-boundary.tsx
         form-field-container.tsx
         header.tsx
         modal-screen.tsx
         tab-screen.tsx
         themed-safe-area-view.tsx
         themed-view.tsx
constants/
   calendar.ts
   emails.ts
   files.ts
   theme.ts
   ui.ts
context/
   activity-context.tsx
   email-context.tsx
hooks/
   use-activity-crud.ts
   use-activity-date-picker.ts
   use-animated-height.ts
   use-chat-history.ts
   use-chatroom-websocket.ts
   use-email-actions.ts
   use-pager-loop.ts
   use-signin.ts
lib/
   api/
      calendar.ts
      chat.ts
      clients/
         base-client.ts
         gmail-client.ts
      config.ts
      gmail.ts
      ws-parser.ts
   auth/
      apple.ts
      google.ts
      index.ts
   utils/
      activity-utils.ts
      date-utils.ts
      gmail-helpers.ts
      markdown-styles.ts
      storage.ts
      supabase.ts
scripts/
   (empty)
types/
   api.ts
   auth.ts
   calendar.ts
   chat.ts
   components.ts
   context.ts
   files.ts
   inbox.ts
   index.ts
   supabase.ts
app.json
babel.config.js
eslint.config.js
expo-env.d.ts
global.css
jest.config.js
metro.config.js
nativewind-env.d.ts
package-lock.json
package.json
tailwind.config.js
tsconfig.json
README.md
```

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
