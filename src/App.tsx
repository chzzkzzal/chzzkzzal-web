import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MainPage from './domain/pages/MainPage';
import ZzalDetailPage from './domain/pages/ZzalDetailPage';
import Layout from './domain/component/layout/Layout';  // Header가 포함된 공통 Layout 컴포넌트
import { FileProvider } from './context/FileContext';

/**
 * 최상위 라우터 컴포넌트
 */
function App() {
    return (
        <BrowserRouter>
            <FileProvider>
                <Routes>
                    {/* Layout을 최상위로 사용하여 모든 페이지에 공통 헤더가 표시됨 */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<MainPage />} />
                        <Route path="zzal/:zzalId" element={<ZzalDetailWrapper />} />
                    </Route>
                </Routes>
            </FileProvider>
        </BrowserRouter>
    );
}

/**
 * ZzalDetailWrapper:
 * - URL 파라미터 zzalId(문자열)를 숫자로 변환하여 <ZzalDetailPage>에 넘겨주는 래퍼
 */
function ZzalDetailWrapper() {
    const { zzalId } = useParams();
    if (!zzalId) {
        return <div>잘못된 접근입니다.</div>;
    }
    return <ZzalDetailPage zzalId={parseInt(zzalId, 10)} />;
}

export default App;
