import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { ExpoPushToken } from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";
import { UseAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();
  const { session } = UseAuth();
  const user = session?.user;
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: String) => {
    setExpoPushToken(newToken);
    if (!newToken || !user) {
      return;
    }
    supabase
      .from("profiles")
      .update({
        expo_push_notification: expoPushToken,
      })
      .eq("id", user?.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => savePushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
    //console.warn("Mounted the notification");
  }, []);
  return <>{children}</>;
};

export default NotificationProvider;
