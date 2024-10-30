import { useContext, useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";
import { DiaryItemProps } from "../types";

const Home = () => {
    const diaryList = useSelector((state: RootState) => state.diary.diaryList);

    const [data, setData] = useState<DiaryItemProps[]>([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장`;
    }, []);

    useEffect(() => {
        if(diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() +1,
                0,
                23,
                59,
                59
            ).getTime();

            const filteredDiaryList = diaryList.filter((item: DiaryItemProps) => {
                const itemDate = new Date(item.date).getTime();
                return firstDay <= itemDate && itemDate <= lastDay;
            });

            setData(filteredDiaryList);
        } else {
            setData([]);
        }
    }, [diaryList, curDate]);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
      };
    
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
    };

    return(
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth} type="default"/>}
                rightChild={<MyButton text={">"} onClick={increaseMonth} type="default"/>} 
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;