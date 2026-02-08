import { authApi } from '@/api';
import type {
  TreeArchive,
  TreeArchiveParams,
} from '@/types/statistics/Statistics.types';

export const getTreeArchive = async (
  treeArchiveParams: TreeArchiveParams
): Promise<TreeArchive> => {
  return await authApi.get('/statistics/trees', { params: treeArchiveParams });
};
