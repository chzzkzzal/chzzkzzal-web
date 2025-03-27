import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import zzalRepository from '../api/server/zzalRepository';
import './ZzalUploaderPreviewPage.css';

function ZzalUploaderPreviewPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    // **react-router-dom** 의 useNavigate 훅 사용
    const navigate = useNavigate();

    // 파일 선택
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // 업로드
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('파일을 선택하세요');
            return;
        }
        if (!title) {
            alert('제목을 입력하세요');
            return;
        }

        try {
            await zzalRepository.uploadZzal(selectedFile, title);
            alert('업로드 성공!');

            // **업로드 성공 후 메인 페이지("/")로 이동**
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('업로드 실패');
        }
    };

    return (
        <div className="zzal-uploader-preview-container">
            <h1 className="zzal-uploader-title glitch" data-text="짤 업로드 (단일 파일)">
                짤 업로드 (단일 파일)
            </h1>

            <div className="zzal-uploader-form">
                <label className="zzal-uploader-label">
                    이미지 선택
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="zzal-uploader-input"
                    />
                </label>

                <label className="zzal-uploader-label">
                    제목
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="zzal-uploader-text"
                    />
                </label>

                <button onClick={handleUpload} className="zzal-uploader-button">
                    업로드
                </button>
            </div>
        </div>
    );
}

export default ZzalUploaderPreviewPage;
