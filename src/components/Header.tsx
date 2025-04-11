// src/components/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ChzzkLoginButton from "./ChzzkLoginButton";
// 저장한 아이콘 이미지 임포트 (파일 경로에 맞게 조정하세요)
import 치짤콘 from "../치짤콘.png";
import "./Header.css";

interface HeaderProps {
    onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
    const navigate = useNavigate();

    const handleIconClick = () => {
        navigate("/");
    };

    return (
        <header className="main-page-header">
            {/* 아이콘 이미지 클릭 시 메인페이지로 이동 */}
            <img
                src={치짤콘}
                alt="치짤 아이콘"
                className="header-icon"
                onClick={handleIconClick}
                style={{ cursor: "pointer", width: "100px" }} // 인라인 스타일에서 width 조절
            />
            <div className="header-buttons">
                <button onClick={onUploadClick} className="upload-icon-button">
                    업로드
                </button>
                <ChzzkLoginButton />
            </div>
        </header>
    );
};

export default Header;
