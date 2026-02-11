import { create } from 'zustand';
import type {
  AiBatchItem,
  AiRecommendItem,
  CategoryRecommendCategory,
} from '@/types/recommendations/Recommend.types';
import type { ApiError } from '@/types/Api.types';
import getRoutinesByAi from '@/services/recommendations/getRoutinesByAi';
import getRoutineByCategory from '@/services/recommendations/getRoutinesByCategory';
import addCategoryRoutine from '@/services/recommendations/addCategoryRoutine';
import addAiRoutine from '@/services/recommendations/addAiRoutine';

type RecommendState = {
  ai: AiRecommendItem[];
  categories: CategoryRecommendCategory[];

  isAiLoading: boolean;
  isCategoryLoading: boolean;
  isLoading: boolean;

  hasFetchedAi: boolean;
  hasFetchedCategories: boolean;

  fetchAi: (force?: boolean) => Promise<void>;
  fetchCategories: () => Promise<void>;

  addSelectedAiRoutines: (routines: AiBatchItem[]) => Promise<void>;
  addSelectedCategroyRoutine: (routineIds: number[]) => Promise<void>;
};

export const useRecommendStore = create<RecommendState>((set, get) => ({
  ai: [],
  categories: [],

  isAiLoading: false,
  isCategoryLoading: false,
  isLoading: false,

  hasFetchedAi: false,
  hasFetchedCategories: false,

  fetchAi: async (force = false) => {
    const { hasFetchedAi, isAiLoading } = get();
    if (!force && (hasFetchedAi || isAiLoading)) return;

    set({ isAiLoading: true });
    try {
      const result = await getRoutinesByAi();
      set({ ai: result, hasFetchedAi: true });
    } catch (e) {
      const err = e as ApiError;
      console.error(err);
    } finally {
      set({ isAiLoading: false });
    }
  },

  fetchCategories: async () => {
    const { hasFetchedCategories, isCategoryLoading } = get();
    if (hasFetchedCategories || isCategoryLoading) return;

    set({ isCategoryLoading: true });
    try {
      const result = await getRoutineByCategory();
      set({ categories: result.categories, hasFetchedCategories: true });
    } catch (e) {
      const err = e as ApiError;
      console.error(err);
    } finally {
      set({ isCategoryLoading: false });
    }
  },

  addSelectedAiRoutines: async (routines) => {
    if (routines.length === 0) return;

    set({ isLoading: true });
    try {
      await addAiRoutine({ routines });
    } catch (e) {
      console.error(e as ApiError);
    } finally {
      set({ isLoading: false });
    }
  },

  addSelectedCategroyRoutine: async (routineIds) => {
    if (routineIds.length === 0) return;

    set({ isLoading: true });
    try {
      await addCategoryRoutine({ routinIds: routineIds });
    } catch (e) {
      const err = e as ApiError;
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
