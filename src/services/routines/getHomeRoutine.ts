import { authApi } from '@/api';

const getHomeRoutine = async (memberId: 1, date: '2026-02-01') => {
  return authApi.get(`/routines/home?memberId=${memberId}&date=${date}`);
};

export default getHomeRoutine;
