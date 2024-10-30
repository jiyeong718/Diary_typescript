import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlMenuProps, DiaryListProps, DiaryItemProps } from "../types";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
    { value: "all", name: "전부다"},
    { value: "good", name: "좋은 감정만"},
    { value: "bad", name: "나쁜 감정만"},
];

const ControlMenu: React.FC<ControlMenuProps> = React.memo(({ value, onChange, optionList}) => {
    return (
        <select 
            className="ControlMenu" 
            value={value}
            onChange={(e) => onChange}
            >
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const DiaryList: React.FC<DiaryListProps> = ({ diaryList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    const getProcessedDiaryList = () => {
        const filterCallback = (item: any) => {
            if(filter === "good"){
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        };

        const compare = (a: DiaryItemProps, b: DiaryItemProps) => {
            if(sortType === "latest"){
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filteredList = 
            filter === "all"? copyList :copyList.filter((it: any) => filterCallback(it));

        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return(
        <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it: DiaryItemProps) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
  };

export default DiaryList;