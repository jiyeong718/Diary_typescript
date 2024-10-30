// import { useState, useRef, useCallback, useEffect } from "react";
// import { DiaryEditorProps, DiaryItemProps } from "../types";
// import { replace, useNavigate } from "react-router-dom";

// import { getStringDate } from "../util/date";
// import { emotionList } from "../util/emotion";
// import { useDispatch } from 'react-redux';
// import { create, edit, remove } from '../store/stateSlice';
// import { saveDiary, updateDiary, deleteDiary } from '../util/firebaseUtils';


// import MyHeader from "./MyHeader";
// import MyButton from "./MyButton";
// import EmotionItem from "./EmotionItem";

// const env = process.env;
// env.PUBLIC_URL = env.PUBLIC_URL || "";

// const DiaryEditor: React.FC<DiaryEditorProps> = ({ isEdit, originData }) => {
//     const contentRef = useRef<HTMLTextAreaElement | null>(null);
//     const [content, setContent] = useState("");
//     const [emotion, setEmotion] = useState(3);
//     const [date, setDate] = useState(getStringDate(new Date()));

//     const handleClickEmote = useCallback((emotion: number) => {
//         setEmotion(emotion);
//     }, []);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSubmit = async () => {
//         if (content.length < 1) {
//             if (contentRef.current) {
//                 contentRef.current.focus();
//                 return;
//             }
//         }
//         if (
//             window.confirm(
//                 isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
//             )
//         ) {
//             try {
//                 if (!isEdit) { // 새 일기 작성
//                     const newDiary: Omit<DiaryItemProps, 'id'> = {
//                         emotion: {
//                             emotion_id: emotion,
//                             emotion_img: emotionList.find(em => em.emotion_id === emotion)?.emotion_img || "",
//                             emotion_descript: emotionList.find(em => em.emotion_id === emotion)?.emotion_descript || ""
//                         },
//                         content,
//                         date,
//                     };
//                     const docId = await saveDiary(newDiary);
//                     const idNumber = parseInt(docId, 10);
//                     dispatch(create({ id: idNumber, ...newDiary }));
//                 } else { // 기존 일기 수정
//                     if (originData) {
//                         const updatedDiary: DiaryItemProps = {
//                             id: originData.id,
//                             emotion: {
//                                 emotion_id: emotion,
//                                 emotion_img: emotionList.find(em => em.emotion_id === emotion)?.emotion_img || "",
//                                 emotion_descript: emotionList.find(em => em.emotion_id === emotion)?.emotion_descript || ""
//                             },
//                             content,
//                             date
//                         };
//                         await updateDiary(originData.id, updatedDiary);
//                         dispatch(edit(updatedDiary));
//                     } else {
//                         console.error("Origin data is null, cannot update diary.");
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error while saving or updating the diary", error);
//             }
//         }
//         navigate("/", { replace: true });
//     };

//     const handleRemove = () => {
//         if(window.confirm("정말 삭제하시겠습니까?")){
//             if (originData) {
//                 deleteDiary(originData.id);
//                 dispatch(remove(originData.id));
//             }
//             navigate("/", { replace: true });
//         }
//     };

//     useEffect(() => {
//         if(isEdit && originData){
//             setDate(getStringDate(new Date(parseInt(originData.date))));
//             setEmotion(originData.emotion.emotion_id); 
//             setContent(originData.content);
//         }
//     }, [isEdit, originData]);

//     return(
//         <div className="DiaryEditor">
//             <MyHeader 
//                 headText={isEdit? "일기 수정하기": "새 일기 작성하기"}
//                 leftChild={
//                     <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} type="default"/>
//                 } 
//                 rightChild={
//                     isEdit && (
//                       <MyButton
//                         text={"삭제하기"}
//                         type={"negative"}
//                         onClick={handleRemove}
//                       />
//                     )
//                   }
//                 />

//             <div>
//                 <section>
//                     <h4>오늘은 언제인가요?</h4>
//                     <div className="input_box">
//                         <input 
//                             className="input_date"
//                             value={date}
//                             onChange={(e) => setDate(e.target.value)}
//                             type="date"
//                         />
//                     </div>
//                 </section>

//                 <section>
//                     <h4>오늘의 감정</h4>
//                     <div className="input_box emotion_list_wrapper">
//                         {emotionList.map((it: any) => (
//                             <EmotionItem 
//                                 key={it.emotion_id}
//                                 {...it}
//                                 onClick={handleClickEmote}
//                                 isSelected={it.emotion_id === emotion}
//                             />
//                         ))}
//                     </div>
//                 </section>

//                 <section>
//                     <h4>오늘의 일기</h4>
//                     <div className="input_box text_wrapper">
//                         <textarea
//                             placeholder="오늘은 어땠나요"
//                             ref={contentRef}
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                         />
//                      </div>
//                 </section>

//                 <section>
//                     <div className="control_box">
//                         <MyButton text={"취소하기"} onClick={() => navigate(-1)} type="default"/>
//                         <MyButton 
//                             text={"작성완료"}
//                             type={"positive"}
//                             onClick={handleSubmit}
//                         />
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default DiaryEditor;

import { useState, useRef, useCallback, useEffect } from "react";
import { DiaryEditorProps, DiaryItemProps } from "../types";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import { useDispatch } from 'react-redux';
import { create, edit, remove } from '../store/stateSlice';
import { saveDiary, updateDiary, deleteDiary } from '../util/firebaseUtils';

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { useNavigate } from "react-router-dom";

const DiaryEditor: React.FC<DiaryEditorProps> = ({ isEdit, originData }) => {
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const handleClickEmote = useCallback((emotion: number) => {
        setEmotion(emotion);
    }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (content.length < 1) {
            if (contentRef.current) {
                contentRef.current.focus();
                return;
            }
        }
        if (
            window.confirm(
                isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
            )
        ) {
            try {
                if (!isEdit) { // 새 일기 작성
                    const newDiary: Omit<DiaryItemProps, 'id'> = {
                        emotion,
                        content,
                        date,
                    };
                    const docId = await saveDiary(newDiary);
                    const idNumber = parseInt(docId, 10);
                    dispatch(create({ id: idNumber, ...newDiary }));
                } else { // 기존 일기 수정
                    if (originData) {
                        const updatedDiary: DiaryItemProps = {
                            id: originData.id,
                            emotion: originData.emotion,
                            content,
                            date
                        };
                        await updateDiary(originData.id, updatedDiary);
                        dispatch(edit(updatedDiary));
                    } else {
                        console.error("Origin data is null, cannot update diary.");
                        alert("일기 데이터를 불러오는 데 문제가 발생했습니다.");
                        navigate("/", { replace: true });
                    }
                }
            } catch (error) {
                console.error("Error while saving or updating the diary", error);
                alert("일기를 저장하거나 업데이트하는 데 오류가 발생했습니다.");
            }
        }
        navigate("/", { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            if (originData) {
                deleteDiary(originData.id);
                dispatch(remove(originData.id));
            } else {
                console.error("Origin data is null, cannot delete diary.");
                alert("일기 데이터를 불러오는 데 문제가 발생했습니다.");
            }
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        if (isEdit) {
            if (originData) {
                setDate(getStringDate(new Date(parseInt(originData.date))));
                setEmotion(originData.emotion); 
                setContent(originData.content);
            } else {
                console.error("Origin data is null, cannot initialize editor.");
                alert("일기 데이터를 불러오는 데 문제가 발생했습니다.");
            }
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={isEdit ? "일기 수정하기" : "새 일기 작성하기"}
                leftChild={
                    <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} type="default" />
                } 
                rightChild={
                    isEdit && (
                        <MyButton
                            text={"삭제하기"}
                            type={"negative"}
                            onClick={handleRemove}
                        />
                    )
                }
            />

            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input 
                            className="input_date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                        />
                    </div>
                </section>

                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem 
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘은 어땠나요"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>

                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={() => navigate(-1)} type="default"/>
                        <MyButton 
                            text={"작성완료"}
                            type={"positive"}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
