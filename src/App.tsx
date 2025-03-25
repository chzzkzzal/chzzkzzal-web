// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ZzalDetail from './components/ZzalDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<MainPage />} />

                {/* 짤 상세 페이지 (URL 파라미터 zzalId 활용) */}
                <Route path="/zzal/:zzalId" element={<ZzalDetailWrapper />} />
            </Routes>
        </BrowserRouter>
    );
}

/**
 * ZzalDetailWrapper:
 * URL 파라미터에서 zzalId를 추출해서 <ZzalDetail> 컴포넌트에 넘겨주는 역할
 */
function ZzalDetailWrapper() {
    const { zzalId } = useParams();
    if (!zzalId) {
        return <div>잘못된 접근입니다.</div>;
    }
    // URL 파라미터는 기본적으로 string이므로, 숫자로 변환
    return <ZzalDetail zzalId={parseInt(zzalId, 10)} />;
}

export default App;
