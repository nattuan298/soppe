import { initializeApp } from "firebase/app";
import { Messaging, getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

const app = initializeApp(firebaseConfig);

const getTokenMessage = (messaging: Messaging) =>
  getToken(messaging)
    .then((currentToken: string) => {
      if (currentToken) {
        return currentToken;
      }
      return "";
    })
    .catch((error) => {
      return null;
    });

const allowNotification = () => {
  const requestPermission = Notification?.requestPermission();
  if (!requestPermission) {
    return false;
  }
  return requestPermission
    .then((permission) => {
      if (permission === "granted") {
        navigator.serviceWorker.register("/firebase-messaging-sw.js");
        return true;
      }
      return false;
    })
    .catch(() => {
      return false;
    });
};

export const subscribeToTopic = async (topicName: string, handlePushNotify?: Function) => {
  try {
    const isSupport = await isSupported();
    const isAllow = await allowNotification();
    if (isSupport && isAllow) {
      const fMessaging = getMessaging(app);
      const currentToken = await getTokenMessage(fMessaging);
      if (!currentToken) {
        return;
      }
      const bodyRequest = {
        tokenFirebase: currentToken,
        topic: topicName,
      };
      const response = await authorizedRequest.put(
        `${config.apiBaseUrl}/admin/notifications/subscribe/topic`,
        bodyRequest,
      );
      console.log("subscribeToTopic Success", response);
      onMessage(fMessaging, (payload: any) => {
        handlePushNotify && handlePushNotify?.(payload);
      });
    }
  } catch (error) {}
};

export const unSubscribeToTopic = async (topicName: string) => {
  try {
    const isSupport = await isSupported();
    if (isSupport) {
      const fMessaging = getMessaging(app);
      const currentToken = await getTokenMessage(fMessaging);
      if (!currentToken) {
        return;
      }
      const bodyRequest = {
        tokenFirebase: currentToken,
        topic: topicName,
      };
      const response = await authorizedRequest.put(
        `${config.apiBaseUrl}/admin/notifications/unsubscribe/topic`,
        bodyRequest,
      );
      console.log("unsubscribeToTopic Success", response);
      onMessage(fMessaging, (payload: any) => {});
    }
  } catch (error) {}
};
