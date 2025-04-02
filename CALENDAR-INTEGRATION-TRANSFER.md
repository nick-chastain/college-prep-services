# Calendar Integration Transfer Guide

This document provides detailed instructions for transferring the calendar integration to a customer while maintaining the existing Firebase and Google Cloud infrastructure.

## What Is Being Transferred

This handoff involves:
- **Connecting your Google Calendar** to our existing system so appointments appear on your calendar
- **Setting up your admin email** to receive notifications and send confirmations to clients
- **Testing the integration** to ensure everything works correctly

We are **NOT** transferring:
- The Firebase project or backend infrastructure (we'll continue to host this)
- The service account credentials (these remain unchanged)
- The frontend code (this stays on the current hosting)

## Required Information From You

### 1. Google Calendar Setup

You need to share your Google Calendar with our service account:

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
  10. **Send us the Calendar ID** so we can update the system

### 2. Admin Email for Notifications

The calendar system has been configured with a dedicated email account for handling appointment notifications:

- **Sending Address**: calendar@collegeprepservicesllc.com
  - This address will appear as the sender for all client booking confirmations
  - Uses HostGator SMTP server (smtp.hostgator.com) for reliable delivery

- **Admin Notifications**: nick.chastain@collegeprepservicesllc.com
  - All appointment notifications will be sent to this address
  - Includes details about new bookings, cancellations, and changes

#### Email Flow

1. When a client books an appointment:
   - They receive a confirmation email from calendar@collegeprepservicesllc.com
   - An admin notification is sent to nick.chastain@collegeprepservicesllc.com

2. The email notifications include:
   - Appointment date and time
   - Client's contact information
   - Service type selected
   - Any notes provided during booking

#### Troubleshooting Email Delivery

If emails are not being received:
- Check spam/junk folders
- Ensure nick.chastain@collegeprepservicesllc.com is added to your safe senders list
- Contact us if you need to update either email address

### 3. System Deployment

Once you've provided us with:
1. Your Google Calendar ID
2. Your admin email address
3. Your email app password (if using Gmail)

We will:
1. Update the system configuration
2. Deploy the updated functions
3. Test the integration with you

## Post-Transfer Verification

After completing the transfer, we'll verify that everything is working:

1. **Calendar Sharing**: Confirm the service account appears in your calendar sharing settings
2. **Available Slots**: Verify the calendar booking form successfully shows available time slots
3. **Test Booking**: Make a test booking and confirm it appears in your Google Calendar
4. **Email Notifications**: Ensure you receive email notifications when bookings are made
5. **Client Emails**: Verify clients receive confirmation emails from your admin email address

## Troubleshooting Tips

If issues occur:

1. **Check Logs**: We can review Firebase Function logs to identify any problems

2. **Calendar Permissions**: Verify the service account has proper calendar permissions
   - Check Google Calendar sharing settings
   - Ensure the email is correctly entered with no typos

3. **Email Settings**: If emails aren't being sent/received:
   - We may need to verify your email configuration
   - For Gmail, ensure the app password is valid
   - Check spam/junk folders for notification emails

4. **Calendar Availability**: If no available slots are showing:
   - We'll verify the calendar ID is correct
   - Check your calendar for conflicts during business hours
   - Ensure your calendar is not marked as busy during all time slots

## Contact Information

For assistance with this integration:
- Technical Contact: [Your Contact Information]
- Firebase Project: nick-website-test
- Service Account: calendar-service-account@nick-website-test.iam.gserviceaccount.com 