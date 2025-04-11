// src/components/Layout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import UploadModal from "./UploadModal";
import "./Layout.css";

const Layout: React.FC = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const openUploadModal = () => {
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleUploadSuccess = () => {
        setIsUploadModalOpen(false);
        // 업로드 성공 후 추가 처리 필요시 여기에 구현
    };

    return (
        <div className="layout-container">
            <Header onUploadClick={openUploadModal} />
            <main className="layout-content">
                <Outlet />
            </main>
            {isUploadModalOpen && (
                <UploadModal
                    onClose={closeUploadModal}
                    onUploadSuccess={handleUploadSuccess}
                />
            )}
        </div>
    );
};

export default Layout;
