import { useState ,useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import { DiaryItemProps } from "../types";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

type DiaryListContextType = DiaryItemProps[] | undefined;

const Diary: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const diaryList =useSelector((state: RootState) => state.diary.diaryList);
    const navigate = useNavigate();
    const [data, setData] = useState<DiaryItemProps | undefined>(undefined);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
    }, []);

    useEffect(() => {
        if(diaryList){
            const targetDiary = diaryList.find(
                (it: any) => parseInt(it.id) === parseInt(id!)
            );

            if(targetDiary) {
                setData(targetDiary);
            } else {
                alert("없는 일기 입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList]);
    
    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>;
    }

    const curEmotionData = emotionList.find(
        (it) => it.emotion_id === data.emotion
    );

    if (!curEmotionData) {
        return <div className="DiaryPage">감정 데이터를 찾을 수 없습니다.</div>;
    }
    
    return (
        <div className="DiaryPage">
            <MyHeader 
                headText={`${getStringDate(new Date(data.date))} 기록`}
                leftChild={
                    <MyButton text={"뒤로가기"} onClick={() => navigate(-1)} type="default"/>
                }
                rightChild={
                    <MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} type="default"/>
                }
            />
            
            <article>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`,].join(" ") }>
                        <img src={curEmotionData.emotion_img} />
                        <div className="emotion_descript">
                            {curEmotionData.emotion_descript}
                        </div>
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="diary_content_wrappper">
                        <p>{data.content}</p>
                    </div>
                </section>
            </article>
        </div>
    );
}


export default Diary;