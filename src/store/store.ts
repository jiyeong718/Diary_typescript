import { configureStore } from '@reduxjs/toolkit';
import stateSlice from './stateSlice';

const store = configureStore({
    reducer: {
        diary: stateSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
