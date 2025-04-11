import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import zzalRepository from '../api/server/zzalRepository';
import StreamerSelect from '../components/StreamerSelect'; // 스트리머 선택 컴포넌트 임포트
import './ZzalUploaderPreviewPage.css';

function ZzalUploaderPreviewPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [selectedStreamerId, setSelectedStreamerId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('파일을 선택하세요');
            return;
        }
        if (!title) {
            alert('제목을 입력하세요');
            return;
        }
        if (!selectedStreamerId) {
            alert('스트리머를 선택하세요');
            return;
        }

        try {
            setIsUploading(true);
            const id = await zzalRepository.uploadZzal(
                selectedFile,
                title,
                Number(selectedStreamerId)
            );

            if (id) {
                alert('업로드 성공!');
                // 업로드 성공 후 태그 입력 페이지로 이동
                navigate(`/zzals/${id}/tag`);
            } else {
                alert('업로드 실패: 서버에서 ID를 반환하지 않았습니다.');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('업로드 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
        } finally {
            setIsUploading(false);
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
                        accept="image/*"
                        disabled={isUploading}
                    />
                </label>
                <label className="zzal-uploader-label">
                    제목
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="zzal-uploader-text"
                        disabled={isUploading}
                    />
                </label>
                {/* 스트리머 선택 드롭다운 추가 */}
                <StreamerSelect
                    selectedStreamerId={selectedStreamerId}
                    onChange={setSelectedStreamerId}
                />
                <button
                    onClick={handleUpload}
                    className="zzal-uploader-button"
                    disabled={isUploading}
                >
                    {isUploading ? '업로드 중...' : '업로드'}
                </button>
            </div>
        </div>
    );
}

export default ZzalUploaderPreviewPage;
