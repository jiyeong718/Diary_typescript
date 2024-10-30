export interface MyHeaderProps {
    leftChild: React.ReactNode;
    headText: string;
    rightChild: React.ReactNode;
}

export interface MyButtonProps {
    text: string;
    type: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface DiaryItemProps {
    id: number;
    emotion: number;
    content: string;
    date: string;
}

export interface DiaryListProps { 
    diaryList: DiaryItemProps[];
}

export interface ControlMenuProps {
    value: any;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    optionList:  Array<{ value: string, name: string }>;
}
export interface EmotionData {
    emotion_id: number;
    emotion_img: string;
    emotion_descript: string;
    onClick: (id: number) => void;
    isSelected: boolean;
}

export interface DiaryEditorProps {
    isEdit: boolean;
    originData: DiaryItemProps| null;
}