// src/components/Header.tsx
import React from "react";
import ChzzkLoginButton from "./ChzzkLoginButton";
import "./Header.css";

interface HeaderProps {
    onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
    return (
        <header className="main-page-header">
            <h1 className="header-title" data-text="치짤 갤러리">치짤 갤러리</h1>
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
