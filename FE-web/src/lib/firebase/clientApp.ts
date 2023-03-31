import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Messaging, getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { browserConfig } from "src/constants/browser-config";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const firebaseConfig = {
  apiKey: browserConfig.apiKey,
  authDomain: browserConfig.authDomain,
  projectId: browserConfig.projectId,
  storageBucket: browserConfig.storageBucket,
  messagingSenderId: browserConfig.messagingSenderId,
  appId: browserConfig.appId,
  measurementId: browserConfig.measurementId,
};

const app = initializeApp(firebaseConfig);

const getTokenMessage = (messaging: Messaging) =>
  getToken(messaging)
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      }
      return "";
    })
    .catch(() => {
      return "";
    });

export async function initializeAnalytics() {
  try {
    getAnalytics(app);
  } catch (err) {
    console.error("Firebase initialization error", err);
  }
}

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
  const isSupport = await isSupported();
  const isAllow = await allowNotification();
  if (isSupport && isAllow) {
    try {
      const fMessaging = getMessaging(app);
      const currentToken = await getTokenMessage(fMessaging);
      cookies.set("tokenFirebase", currentToken);
      const bodyRequest = {
        tokenFirebase: currentToken,
        topic: topicName,
      };
      const response = await axios.put(apiRoute.notifications.subscribeNotification, bodyRequest);

      await axios.post(apiRoute.notifications.register, {
        tokenFirebase: currentToken,
      });

      if (response.status === 204) {
        onMessage(fMessaging, (payload) => {
          handlePushNotify && handlePushNotify?.(payload);
        });
      }
    } catch (error) {}
  }
};

export const unSubscribeToTopic = async (topicName: string, isSignOut?: boolean) => {
  const isSupport = await isSupported();
  const isAllow = await allowNotification();
  if (isSupport && isAllow) {
    try {
      const fMessaging = getMessaging(app);
      const currentToken = await getTokenMessage(fMessaging);
      cookies.set("tokenFirebase", currentToken);
      const bodyRequest = {
        tokenFirebase: currentToken,
        topic: topicName,
      };
      const response = await axios.put(apiRoute.notifications.unSubscribeNotification, bodyRequest);
      if (isSignOut) {
        await axios.post(apiRoute.signup.signOut, {
          tokenFirebase: currentToken,
        });
      }
      if (response.status === 204) {
      }
    } catch (error) {}
  }
};
