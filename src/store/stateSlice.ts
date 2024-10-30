import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiaryItemProps, DiaryListProps } from '../types';

const initialState: DiaryListProps = {
    diaryList: [], 
};

// 슬라이스 생성
const stateSlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        init(state, action: PayloadAction<DiaryItemProps[]>) {
            state.diaryList = action.payload;
        },
        create(state, action: PayloadAction<DiaryItemProps>) {
            state.diaryList.unshift(action.payload);
        },
        remove(state, action: PayloadAction<number>) {
            state.diaryList = state.diaryList.filter(diary => diary.id !== action.payload);
        },
        edit(state, action: PayloadAction<DiaryItemProps>) {
            const index = state.diaryList.findIndex(diary => diary.id === action.payload.id);
            if (index !== -1) {
                state.diaryList[index] = action.payload;
            }
        },
    },
});

export const { init, create, remove, edit } = stateSlice.actions;
export default stateSlice.reducer;
