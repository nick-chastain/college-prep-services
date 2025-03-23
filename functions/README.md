# Calendar Integration Setup Guide

This guide provides step-by-step instructions for setting up the Google Calendar API integration for College Prep Services.

## Prerequisites

- Node.js 18 or later
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created
- Google account with access to Google Cloud Console

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### 2. Create a Service Account

1. In the Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "Service Account"
3. Fill in the service account details and click "Create"
4. Grant the service account the "Calendar API" > "Calendar API Admin" role
5. Click "Done"
6. Find the service account in the list, click on it, then go to the "Keys" tab
7. Click "Add Key" > "Create new key" > "JSON" format
8. Save the downloaded JSON file securely (you'll need this for the next step)

### 3. Share Your Google Calendar

1. Open [Google Calendar](https://calendar.google.com/)
2. Find the calendar you want to use for appointments under "My calendars"
3. Click the three dots next to the calendar and select "Settings and sharing"
4. Scroll down to "Share with specific people or groups"
5. Click "Add people" and enter the service account email (found in the JSON file)
6. Set permissions to "Make changes to events" and click "Send"
7. Copy the Calendar ID from the "Integrate calendar" section (looks like an email address)

### 4. Set Up Firebase Environment Variables

1. Set the required environment variables:

```bash
firebase functions:config:set calendar.client_email="YOUR_SERVICE_ACCOUNT_EMAIL" \
                          calendar.private_key="YOUR_PRIVATE_KEY" \
                          calendar.calendar_id="YOUR_CALENDAR_ID"
```

Note: When adding the private key, you may need to replace newlines with `\n`.

### 5. Deploy Firebase Functions

1. Navigate to the functions directory:

```bash
cd functions
```

2. Install dependencies:

```bash
npm install
```

3. Build the functions:

```bash
npm run build
```

4. Deploy to Firebase:

```bash
npm run deploy
```

5. After deployment, copy the Calendar Service API URL from the Firebase console (Functions section) and update your frontend `.env` file:

```
VITE_CALENDAR_API_URL=https://your-region-your-project.cloudfunctions.net/calendarApi
```

## Local Development

To test the functions locally:

1. Get the Firebase environment variables:

```bash
firebase functions:config:get > .runtimeconfig.json
```

2. Start the Firebase emulators:

```bash
npm run serve
```

3. Update your frontend `.env` file to use the local URL:

```
VITE_CALENDAR_API_URL=http://localhost:5001/your-project-id/us-central1/calendarApi
```

## Troubleshooting

- **403 Errors**: Ensure the service account has proper permissions on the calendar
- **Auth Errors**: Verify your environment variables are correctly set
- **CORS Issues**: Check that the origin settings in the CORS configuration match your frontend domain 