// src/components/ZzalUpload.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ZzalUpload.css';  // 추가

const ZzalUpload: React.FC = () => {
    const navigate = useNavigate();

    const goToUploaderSelect = () => {
        navigate('/zzal-uploader-preview');
    };

    return (
        <button onClick={goToUploaderSelect} className="zzal-upload-button">
            짤 업로드
        </button>
    );
};

export default ZzalUpload;
