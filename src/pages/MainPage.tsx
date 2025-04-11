// src/pages/MainPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "../components/UploadModal";
import ChzzkLoginButton from "../components/ChzzkLoginButton";
import ZzalList from "../components/ZzalList";
import StreamerList from "../components/StreamerList";
import "./MainPage.css";

const MainPage: React.FC = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedStreamerId, setSelectedStreamerId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleUploadClick = () => {
        // 로그인 여부 체크 후 (필요시) 업로드 모달 오픈
        setIsUploadModalOpen(true);
    };

    const handleUploadSuccess = () => {
        setIsUploadModalOpen(false);
        navigate("/"); // 업로드 성공 후 메인페이지로 이동
    };

    const handleStreamerSelect = (streamerId: string) => {
        // 동일한 스트리머를 다시 클릭하면 선택 해제(토글)
        setSelectedStreamerId((prev) => (prev === streamerId ? null : streamerId));
    };

    return (
        <div className="main-page-container">
            <header className="main-page-header">
                <h1 className="header-title" data-text="치짤">치짤</h1>
                <div className="header-buttons">
                    <button onClick={handleUploadClick} className="upload-icon-button">
                        업로드
                    </button>
                    <ChzzkLoginButton />
                </div>
            </header>
            <main className="main-page-content">
                {/* 스트리머 목록: onSelect와 선택된 스트리머 ID 전달 */}
                <StreamerList onSelect={handleStreamerSelect} selectedStreamerId={selectedStreamerId} />
                {/*
             ZzalList 컴포넌트는 선택된 스트리머 ID가 있으면 해당 스트리머의 짤만,
             없으면 전체 짤을 불러옴.
        */}
                <ZzalList streamerId={selectedStreamerId || undefined} />
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
