// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";

// import DiaryList from "../components/DiaryList";
// import DiaryEditor from "../components/DiaryEditor";
// import { DiaryItemProps } from "../types";

// const Edit = () => {
//     const [originData, setOriginData] = useState<DiaryItemProps | undefined>(undefined);
//     const navigate = useNavigate();
//     const { id } = useParams<{ id: string }>();

//     // const diaryList = useContext(DiaryStateContext);
//     const diaryList = useSelector((state: RootState) => state.diary.diaryList);

//     useEffect(() => {
//         const titleElement = document.getElementsByTagName("title")[0];
//         titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
//     }, []);

//     useEffect(() => {
//         if(diaryList.length >= 1){
//             const targetDiary = diaryList.find(
//                 (it: DiaryItemProps) => it.id === parseInt(id!)
//             );

//             if(targetDiary){
//                 setOriginData(targetDiary);
//             } else {
//                 alert("없는 일기입니다.");
//                 navigate("/", { replace: true });
//             }
//         }
//     }, [id, diaryList])

//     return(
//         <div>
//             {originData && <DiaryEditor 
//                 isEdit={true} 
//                 originData={originData}
//             />
//             }
//         </div>
//     );
// };

// export default Edit;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import DiaryEditor from "../components/DiaryEditor";
import { DiaryItemProps } from "../types";

const Edit = () => {
    const [originData, setOriginData] = useState<DiaryItemProps | undefined>(undefined);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const diaryList = useSelector((state: RootState) => state.diary.diaryList);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    }, [id]);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it: DiaryItemProps) => it.id === parseInt(id!)
            );

            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert("없는 일기입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList, navigate]);

    return (
        <div>
            {originData ? (
                <DiaryEditor 
                    isEdit={true} 
                    originData={originData}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Edit;
