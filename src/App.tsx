import React from 'react';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';

import MainPage from './pages/MainPage';
import ZzalDetail from './components/ZzalDetail';
import ZzalUploaderPreviewPage from './pages/ZzalUploaderPreviewPage';

// 위에서 만든 Provider
import { FileProvider } from './context/FileContext';
import TagPage from "./pages/TagPage";

function App() {
    return (
        <BrowserRouter>
            {/* FileProvider로 감싸서 하위 컴포넌트들이 컨텍스트를 사용할 수 있게 함 */}
            <FileProvider>
                <Routes>
                    {/* 메인 페이지 */}
                    <Route path="/" element={<MainPage />} />


                    <Route path="/zzal-uploader-preview" element={<ZzalUploaderPreviewPage />} />

                    {/* 짤 상세 페이지 */}
                    <Route path="/zzal/:zzalId" element={<ZzalDetailWrapper />} />

                    // App.tsx (Router 설정부)
                    <Route path="/zzals/:id/tag" element={<TagPage />} />

                </Routes>
            </FileProvider>
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
