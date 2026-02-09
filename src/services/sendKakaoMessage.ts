import type { FriendsPickerResponse } from '@/types/Kakao.types';

export const sendKakaoMessage = (inviterId: string, inviterName: string) => {
  const selectedUsers: FriendsPickerResponse =
    window.Kakao.Picker.selectFriends({
      title: '친구 선택',
      maxPickableCount: 5,
      minPickableCount: 1,
    });

  const templateId = parseInt(import.meta.env.VITE_APP_KAKAO_TEMPLATE_ID, 10);

  window.Kakao.API.request({
    url: '/v1/api/talk/friends/message/send',
    data: {
      receiver_uuids: selectedUsers.users.map((user) => user.uuid),
      template_id: templateId,
      template_args: {
        inviterId: inviterId, // ${inviterId} 자리에 들어감
        inviterName: inviterName, // ${inviterName} 자리에 들어감!
      },
    },
  });
};
