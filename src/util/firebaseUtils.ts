import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; 
import { DiaryItemProps } from "../types";

// 새로운 다이어리 항목 저장
export const saveDiary = async (diary: Omit<DiaryItemProps, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, "diaries"), diary);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id; // ID를 반환합니다.
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e; // 오류를 호출자에게 전달합니다.
    }
};

// 다이어리 목록 가져오기
export const fetchDiaries = async (): Promise<DiaryItemProps[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "diaries"));
        const diaries: DiaryItemProps[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const diary: DiaryItemProps = {
                id: parseInt(doc.id),
                emotion: data.emotion,
                content: data.content,
                date: data.date
            };
            diaries.push(diary);
        });
        return diaries;
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
};

// 다이어리 항목 업데이트
export const updateDiary = async (id: number, updatedDiary: Partial<DiaryItemProps>) => {
    try {
        const docRef = doc(db, "diaries", id.toString());  
        await updateDoc(docRef, updatedDiary);
        console.log("Document updated");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

// 다이어리 항목 삭제
export const deleteDiary = async (id: number) => {
    try {
        const docRef = doc(db, "diaries", id.toString());
        await deleteDoc(docRef);
        console.log("Document deleted");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};
