export const sendKakaoMessage = (inviterId: string, inviterName: string) => {
  if (!window.Kakao?.Share) return;

  const templateId = Number(import.meta.env.VITE_APP_KAKAO_TEMPLATE_ID);

  window.Kakao.Share.sendCustom({
    templateId,
    templateArgs: {
      inviterId, // ${inviterId}
      inviterName, // ${inviterName}
    },
  });
};
