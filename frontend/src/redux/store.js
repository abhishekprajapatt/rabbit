import { configureStore } from '@reduxjs/toolkit';
import rootSlice from './rootSlice.js';
import { authApi } from '@/features/api/authApi.js';
import { courseApi } from '@/features/api/courseApi.js';
import { purchaseApi } from '@/features/api/purchaseCourseApi.js';
import { courseProgressApi } from '@/features/api/courseProgressApi.js';
export const appStore = configureStore({
  reducer: rootSlice,
  middleware:(defaultMiddleware) =>  defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
});

const initializeApp = async () => {
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch:true}))
}
initializeApp();