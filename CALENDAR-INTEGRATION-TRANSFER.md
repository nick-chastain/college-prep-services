# Calendar Integration Transfer Guide

This document provides detailed instructions for transferring the calendar integration to a customer while maintaining the existing Firebase and Google Cloud infrastructure.

## Required Changes for the Customer

### 1. Google Calendar Setup

The customer needs to share their Google Calendar with the service account:

- Service Account Email: `calendar-service-account@nick-website-test.iam.gserviceaccount.com`
- Instructions:
  1. Open Google Calendar
  2. Find the calendar to be used under "My calendars"
  3. Click the three dots (⋮) next to the calendar name
  4. Select "Settings and sharing"
  5. Scroll down to "Share with specific people or groups"
  6. Click "Add people" and enter the service account email
  7. Set permissions to "Make changes to events"
  8. Click "Send"
  9. While in settings, copy the Calendar ID from the "Integrate calendar" section (looks like an email address)

### 2. Update Calendar ID in Firebase

Update the Firebase configuration with the customer's calendar ID:

```bash
firebase functions:config:set calendar.calendar_id="CUSTOMER_CALENDAR_ID@group.calendar.google.com"
```

Replace `CUSTOMER_CALENDAR_ID@group.calendar.google.com` with the actual Calendar ID copied from the previous step.

### 3. Environment Variables

Ensure the frontend `.env` file has the correct Firebase function URL:

```
VITE_CALENDAR_API_URL=https://us-central1-nick-website-test.cloudfunctions.net/calendarApi
```

### 4. Redeploy the Functions

After updating the calendar ID, redeploy the Firebase functions:

```bash
cd functions
npm run build
firebase deploy --only functions
```

## No-Change Items

These items **do not need to change** as you're keeping the same Firebase and Google Cloud instances:

1. Service account credentials (client_email and private_key)
2. Firebase project configuration
3. API endpoints
4. Frontend code implementation

## Post-Transfer Verification

After completing the transfer, verify that everything is working:

1. **Calendar Sharing**: Confirm the service account appears in the customer's calendar sharing settings
2. **Available Slots**: Verify the calendar booking form successfully shows available time slots
3. **Test Booking**: Make a test booking and confirm it appears in the customer's Google Calendar
4. **Email Notifications**: Ensure the customer receives email notifications when bookings are made

## Firebase Configuration Reference

Current Firebase configuration:

```bash
# View current config
firebase functions:config:get

# Service account email (should not change)
firebase functions:config:set calendar.client_email="calendar-service-account@nick-website-test.iam.gserviceaccount.com"

# Calendar ID (must be updated to customer's)
firebase functions:config:set calendar.calendar_id="CUSTOMER_CALENDAR_ID@group.calendar.google.com"

# Private key (should not change)
# Set using the private-key.ps1 script
```

## Troubleshooting Tips

If issues occur:

1. **Check Logs**: Review Firebase Function logs via the Firebase Console
   - Go to https://console.firebase.google.com/project/nick-website-test/overview
   - Navigate to Functions > Logs

2. **Calendar Permissions**: Verify the service account has proper calendar permissions
   - Check Google Calendar sharing settings
   - Ensure the email is correctly entered with no typos

3. **Firebase Configuration**: Confirm the calendar ID is correctly set
   - Run `firebase functions:config:get` to verify

4. **Frontend Settings**: Make sure the `.env` file has the correct API URL

5. **Function Errors**: If the calendar API isn't working, check the error response
   - Use browser developer tools to inspect network requests

## Contact Information

For assistance with this integration:
- Technical Contact: [Your Contact Information]
- Firebase Project: nick-website-test
- Service Account: calendar-service-account@nick-website-test.iam.gserviceaccount.com 