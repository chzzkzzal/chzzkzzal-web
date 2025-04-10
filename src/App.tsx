import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ZzalDetail from './components/ZzalDetail';
import ZzalUploaderPreviewPage from './pages/ZzalUploaderPreviewPage';
import TagPage from './pages/TagPage';
import StreamerDetailPage from './components/StreamerDetailPage';

// FileProvider (이미 존재한다고 가정)
import { FileProvider } from './context/FileContext';

/**
 * 최상위 라우터 컴포넌트
 */
function App() {
    return (
        <BrowserRouter>
            <FileProvider>
                {/* 절대 중첩 <Routes>가 없도록 "한 번"만 선언합니다 */}
                <Routes>
                    {/* 메인 페이지 */}
                    <Route path="/" element={<MainPage />} />

                    {/* 짤 업로더 미리보기 */}
                    <Route path="/zzal-uploader-preview" element={<ZzalUploaderPreviewPage />} />

                    {/* 짤 상세 페이지 (/zzal/:zzalId) */}
                    <Route path="/zzal/:zzalId" element={<ZzalDetailWrapper />} />

                    {/* 태그 편집 페이지 (/zzals/:id/tag) */}
                    <Route path="/zzals/:id/tag" element={<TagPage />} />

                    {/* 스트리머 상세 페이지 (/streamer/:streamerId) */}
                    <Route path="/streamer/:streamerId" element={<StreamerDetailPage />} />
                </Routes>
            </FileProvider>
        </BrowserRouter>
    );
}

/**
 * ZzalDetailWrapper:
 *   - URL 파라미터 zzalId(문자열)를 숫자로 변환하여 <ZzalDetail>에 넘겨주는 래퍼
 *   - (짤 ID는 number 라고 가정)
 */
function ZzalDetailWrapper() {
    const { zzalId } = useParams();
    if (!zzalId) {
        return <div>잘못된 접근입니다.</div>;
    }
    return <ZzalDetail zzalId={parseInt(zzalId, 10)} />;
}

export default App;
