import { getToken } from 'firebase/messaging';
import { getFirebaseMessaging } from '@/libs/firebase';

export const getFcmToken = async (): Promise<string | null> => {
  // 1) 알림 API 지원
  if (!('Notification' in window)) return null;

  // 2) 권한 요청 (✅ 지금처럼 클릭 이벤트 안에서 호출되는 건 좋아)
  const permission =
    Notification.permission === 'granted'
      ? 'granted'
      : await Notification.requestPermission();

  if (permission !== 'granted') return null;

  // 3) messaging 지원 체크
  const messaging = await getFirebaseMessaging();
  if (!messaging) return null;

  // 4) VAPID KEY
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as
    | string
    | undefined;
  if (!vapidKey) return null;

  try {
    // ✅ service worker 등록 보장 (파일이 public에 있어야 함)
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    console.log('FCM TOKEN >>>', token);
    return token || null;
  } catch (e) {
    console.warn('FCM token 발급 실패:', e);
    return null;
  }
};
