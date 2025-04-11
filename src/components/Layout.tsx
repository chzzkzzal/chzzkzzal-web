// src/components/Layout.tsx
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import UploadModal from "./UploadModal";
import { AnimatePresence, motion } from "framer-motion";
import "./Layout.css";

const Layout: React.FC = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const location = useLocation();

    const openUploadModal = () => {
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleUploadSuccess = () => {
        setIsUploadModalOpen(false);
        // 업로드 성공 후 추가 작업 가능
    };

    return (
        <div className="layout-container">
            <Header onUploadClick={openUploadModal} />

            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    className="layout-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    <Outlet />
                </motion.main>
            </AnimatePresence>

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
