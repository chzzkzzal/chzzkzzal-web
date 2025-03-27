// src/components/ZzalDetail.tsx

import React, { useEffect, useState } from 'react';
import zzalRepository, { ZzalDetailResponse } from '../api/server/zzalRepository';
import ZzalMetaInfoView from './ZzalMetaInfoView';
import './ZzalDetail.css'; // CSS 추가

interface Props {
    zzalId: number;
}

const ZzalDetail: React.FC<Props> = ({ zzalId }) => {
    const [zzalData, setZzalData] = useState<ZzalDetailResponse | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await zzalRepository.getZzalDetail(zzalId);
                setZzalData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetail();
    }, [zzalId]);

    if (!zzalData) {
        return <div className="zzal-detail-container loading">로딩 중...</div>;
    }

    return (
        <div className="zzal-detail-container">
            <div className="zzal-detail-content">
                <h1 className="zzal-detail-title glitch" data-text={zzalData.title}>
                    {zzalData.title}
                </h1>

                <div className="zzal-detail-image-wrapper">
                    <img className="zzal-detail-image" src={zzalData.url} alt="zzal" />
                </div>

                <div className="zzal-detail-info">
                    <p className="zzal-detail-writer">
                        <span className="info-label">작성자</span>: {zzalData.writerChannelName}
                    </p>
                    <p className="zzal-detail-created">
                        <span className="info-label">생성일</span>: {zzalData.createdAt}
                    </p>
                </div>

                {/* 메타 정보 표시 (ex. width, height 등) */}
                <ZzalMetaInfoView meta={zzalData.zzalMetaInfo} />
            </div>
        </div>
    );
};

export default ZzalDetail;
