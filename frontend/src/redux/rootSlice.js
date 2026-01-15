import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice.js';
import { authApi } from '@/features/api/authApi.js';
import { courseApi } from '@/features/api/courseApi.js';
import { purchaseApi } from '@/features/api/purchaseCourseApi.js';
import { courseProgressApi } from '@/features/api/courseProgressApi.js';


const rootSlice = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authSlice
});

export default rootSlice;