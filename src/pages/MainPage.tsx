import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "../components/UploadModal";
import ChzzkLoginButton from "../components/ChzzkLoginButton";
import ZzalList from "../components/ZzalList";
import StreamerList from "../components/StreamerList";
import "./MainPage.css";

const MainPage: React.FC = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleUploadClick = () => {
        // 로그인 여부 체크 로직 추가 가능 (로그인 안 됐으면 로그인 페이지로 이동)
        setIsUploadModalOpen(true);
    };

    const handleUploadSuccess = () => {
        setIsUploadModalOpen(false);
        navigate("/"); // 업로드 성공 후 메인페이지로 이동
    };

    return (
        <div className="main-page-container">
            <header className="main-page-header">
                <h1 className="header-title" data-text="치짤">치짤</h1>
                <div className="header-buttons">
                    <button onClick={handleUploadClick} className="upload-icon-button">업로드</button>
                    <ChzzkLoginButton />
                </div>
            </header>
            <main className="main-page-content">
                <StreamerList />
                <ZzalList />
            </main>
            {isUploadModalOpen && (
                <UploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onUploadSuccess={handleUploadSuccess}
                />
            )}
        </div>
    );
};

export default MainPage;
