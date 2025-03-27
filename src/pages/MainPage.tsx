// src/pages/MainPage.tsx

import React from 'react';
import './MainPage.css';

import ChzzkLoginButton from '../components/ChzzkLoginButton';
import ZzalUpload from '../components/ZzalUpload';
import ZzalList from '../components/ZzalList';

const MainPage: React.FC = () => {
    return (
        <div className="main-page-container">
            <header className="main-page-header">
                {/* 타이틀에 data-text 속성 주입 */}
                <h1
                    className="header-title"
                    data-text="치지직 메인 페이지"
                >
                    치지직 메인 페이지
                </h1>

                <div className="header-buttons">
                    <ZzalUpload />
                    <ChzzkLoginButton />
                </div>
            </header>

            <main className="main-page-content">
                <ZzalList />
            </main>
        </div>
    );
};

export default MainPage;
