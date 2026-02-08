import { create } from 'zustand';
import type {
  AiRecommendItem,
  CategoryRecommendCategory,
} from '@/types/recommendations/Recommend.types';
import type { ApiError } from '@/types/Api.types';
import getRoutinesByAi from '@/services/recommendations/getRoutinesByAi';
import getRoutineByCategory from '@/services/recommendations/getRoutinesByCategory';
import addRecommendBatch from '@/services/recommendations/addBatchRoutine';

type RecommendState = {
  ai: AiRecommendItem[];
  categories: CategoryRecommendCategory[];

  isLoading: boolean;

  hasFetchedAi: boolean;
  hasFetchedCategories: boolean;

  fetchAi: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addSelectedRoutine: (routineIds: number[]) => Promise<void>;
};

export const useRecommendStore = create<RecommendState>((set, get) => ({
  ai: [],
  categories: [],

  isLoading: false,

  hasFetchedAi: false,
  hasFetchedCategories: false,

  fetchAi: async () => {
    const { hasFetchedAi, isLoading } = get();
    if (hasFetchedAi || isLoading) return;

    set({ isLoading: true });
    try {
      const result = await getRoutinesByAi();
      set({ ai: result, hasFetchedAi: true });
    } catch (e) {
      const err = e as ApiError;
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCategories: async () => {
    const { hasFetchedCategories, isLoading } = get();
    if (hasFetchedCategories || isLoading) return;

    set({ isLoading: true });
    try {
      const result = await getRoutineByCategory();
      set({ categories: result.categories, hasFetchedCategories: true });
    } catch (e) {
      const err = e as ApiError;
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addSelectedRoutine: async (routineIds) => {
    if (routineIds.length === 0) return;

    set({ isLoading: true });
    try {
      await addRecommendBatch({ routinIds: routineIds });
    } catch (e) {
      const err = e as ApiError;
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
