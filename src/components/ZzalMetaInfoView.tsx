// src/components/ZzalMetaInfoView.tsx
import React from 'react';
import { ZzalMetaInfo } from '../api/server/zzalRepository';

interface Props {
    meta: ZzalMetaInfo;
}

const ZzalMetaInfoView: React.FC<Props> = ({ meta }) => {
    // 파일 크기를 KB 단위로 변환 (소수점 없이 반올림)
    const fileSizeKB = (meta.size / 1024).toFixed(0);

    // GIF 타입인 경우, 총 지속 시간을 소수점 3자리까지 포맷
    const totalDuration = meta.zzalType === 'GIF' ? Number(meta.totalDuration).toFixed(3) : null;

    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>메타 정보</h3>
            <p>파일 크기: {fileSizeKB}KB</p>
            {totalDuration && <p>길이: {totalDuration} sec</p>}
            <p>크기: {meta.width}x{meta.height}</p>
            <p>콘텐츠 타입: {meta.contentType}</p>
            <p>파일 이름: {meta.fileName}</p>
        </div>
    );
};

export default ZzalMetaInfoView;
