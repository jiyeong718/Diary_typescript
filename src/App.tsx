import React, { useEffect, useRef } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "./store/store";
import { fetchDiaries, saveDiary, updateDiary, deleteDiary } from './util/firebaseUtils';
import { init, create, edit, remove } from './store/stateSlice';
import { DiaryItemProps } from "./types";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";


const App: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   const localData = localStorage.getItem("diary");
  //   if(localData){
  //     const diaryList = JSON.parse(localData).sort(
  //       (a: any, b: any) => parseInt(b.id) - parseInt(a.id)
  //     );

  //     if(diaryList.length >= 1){
  //       dataId.current = parseInt(diaryList[0].id) + 1;
  //       dispatch({ type: "INIT", data: diaryList });
  //     }
  //   }
  // }, []);

  // const dataId = useRef(0);

  const dispatch: AppDispatch = useDispatch();
    const diaryList = useSelector((state: RootState) => state.diary.diaryList);

    // Fetch diaries when the component mounts
    useEffect(() => {
        const loadDiaries = async () => {
            const diaries = await fetchDiaries();
            dispatch(init(diaries));
        };

        loadDiaries();
    }, [dispatch]);

    // Function to add a new diary
    const handleAddDiary = async (diary: DiaryItemProps) => {
        await saveDiary(diary);
        dispatch(create(diary));
    };

    // Function to update an existing diary
    const handleUpdateDiary = async (id: number, updatedDiary: Partial<DiaryItemProps>) => {
        await updateDiary(id, updatedDiary);
        dispatch(edit({ id, ...updatedDiary } as DiaryItemProps));
    };

    // Function to delete a diary
    const handleDeleteDiary = async (id: number) => {
      await deleteDiary(id);
      dispatch(remove(id));
    };

  return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
  );
}

export default App;
