import { useEffect } from 'react'
import { onMessage } from 'firebase/messaging'
import { messaging } from 'src/firebase'
import { enqueueSnackbar } from 'notistack'

export const useForegroundNotifications = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, payload => {
      console.log('*****************Foreground message:', payload)

      const title = payload.notification?.title ?? 'New notification'
      const body = payload.notification?.body

      enqueueSnackbar(
        <div className="flex justify-center flex-col">
            <strong>{title}</strong>
            <br />
            {body}
        </div>,
        { variant: 'info' }
        );



    })

    return () => unsubscribe()
  }, [])
}
