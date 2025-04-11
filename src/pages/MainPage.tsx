// src/pages/MainPage.tsx
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
                    data-text="치짤"
                >
                    치짤
                </h1>

                <div className="header-buttons">
                    <ZzalUpload />
                    <ChzzkLoginButton />
                </div>
            </header>

            <main className="main-page-content">
                <StreamerList />
                <ZzalList />
            </main>
        </div>
    );
};

export default MainPage;
