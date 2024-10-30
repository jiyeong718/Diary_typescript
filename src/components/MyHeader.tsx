import { MyHeaderProps } from "../types";

const MyHeader: React.FC<MyHeaderProps> = ({ leftChild, headText, rightChild }) => {
    return(
        <header>
            <div className="header_btn_left">{leftChild}</div>
            <div className="header_text">{headText}</div>
            <div className="header_btn_right">{rightChild}</div>
        </header>
    );
};

export default MyHeader;