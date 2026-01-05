import { useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from 'src/firebase';
import { enqueueSnackbar } from 'notistack';

export const useReminder = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(
    Notification.permission === 'granted'
  );
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);

  const handleReminderClick = async () => {
    try {
      const permission = await Notification.requestPermission();

      console.log("permission status:", permission);

      if (permission !== 'granted') {
        enqueueSnackbar(
          'Please enable notifications to set reminders',
          { variant: 'warning' }
        );
        return;
      }

      setIsPermissionGranted(true);

      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      console.log('FCM Token:', token);

      // send token to backend 

      openReminderDialog();

    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const openReminderDialog = () => {
    setReminderDialogOpen(true);
    // open reminder picker
  };

  return { handleReminderClick, isPermissionGranted, reminderDialogOpen, setReminderDialogOpen };
};
