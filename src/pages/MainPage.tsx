// src/pages/MainPage.tsx
import React from 'react';
import './MainPage.css'; // CSS 불러오기

import ChzzkLoginButton from '../components/ChzzkLoginButton';
import ZzalUpload from '../components/ZzalUpload';
import ZzalList from '../components/ZzalList';

const MainPage: React.FC = () => {
    return (
        <div className="main-page-container">
            {/* 헤더 */}
            <header className="main-page-header">
                {/* 타이틀 */}
                <h1 className="header-title">치지직 메인 페이지</h1>

                {/* 버튼들(로그인, 업로드) */}
                <div className="header-buttons">
                    <ChzzkLoginButton />
                    <ZzalUpload />
                </div>
            </header>

            {/* 메인 컨텐츠 영역 */}
            <main className="main-page-content">
                <ZzalList />
            </main>
        </div>
    );
};

export default MainPage;
