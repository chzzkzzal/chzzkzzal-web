import React from 'react';
import './MainPage.css';

import ChzzkLoginButton from '../components/ChzzkLoginButton';
import ZzalUpload from '../components/ZzalUpload';
import ZzalList from '../components/ZzalList';
import StreamerList from '../components/StreamerList';

const MainPage: React.FC = () => {
    return (
        <div className="main-page-container">
            <header className="main-page-header">
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
                {/* 스트리머 목록 (정확히 한 번) */}
                <StreamerList />

                {/* 그 아래에 짤 목록 */}
                <ZzalList />
            </main>
        </div>
    );
};

export default MainPage;
