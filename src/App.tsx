import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ZzalDetail from './components/ZzalDetail';
import TagPage from './pages/TagPage';
import StreamerDetailPage from './components/StreamerDetailPage';
import Layout from './components/Layout';  // Header가 포함된 공통 Layout 컴포넌트
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
                        <Route path="zzals/:id/tag" element={<TagPage />} />
                        <Route path="streamer/:streamerId" element={<StreamerDetailPage />} />
                    </Route>
                </Routes>
            </FileProvider>
        </BrowserRouter>
    );
}

/**
 * ZzalDetailWrapper:
 * - URL 파라미터 zzalId(문자열)를 숫자로 변환하여 <ZzalDetail>에 넘겨주는 래퍼
 */
function ZzalDetailWrapper() {
    const { zzalId } = useParams();
    if (!zzalId) {
        return <div>잘못된 접근입니다.</div>;
    }
    return <ZzalDetail zzalId={parseInt(zzalId, 10)} />;
}

export default App;
