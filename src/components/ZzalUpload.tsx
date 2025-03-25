// src/components/ZzalUpload.tsx
import React, { ChangeEvent, useState } from 'react';
import zzalRepository from '../api/server/zzalRepository';

const ZzalUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // 파일 입력 핸들러
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    // 업로드 실행
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('파일을 선택해주세요.');
            return;
        }

        try {
            await zzalRepository.uploadZzal(selectedFile);
            alert('업로드 성공!');
            // 업로드 후 로직 (ex. 메인 목록 다시 불러오기 등) 필요하면 추가
        } catch (error) {
            console.error(error);
            alert('업로드 실패...');
        }
    };

    return (
        <div style={{ marginLeft: '10px' }}>
            <label style={{ cursor: 'pointer' }}>
                파일 선택
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
            <button onClick={handleUpload} style={{ marginLeft: '5px' }}>업로드</button>
        </div>
    );
};

export default ZzalUpload;
