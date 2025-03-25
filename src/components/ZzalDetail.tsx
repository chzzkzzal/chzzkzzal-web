// src/components/ZzalDetail.tsx
import React, { useEffect, useState } from 'react';
import zzalRepository, { ZzalDetailResponse } from '../api/server/zzalRepository';
import ZzalMetaInfoView from './ZzalMetaInfoView';  // 추가

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
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h1>{zzalData.zzalId}번 짤 상세</h1>
            <p>멤버 ID: {zzalData.writerId}</p>
            <p>생성일: {zzalData.createdAt}</p>

            <img src={zzalData.url} alt="zzal" style={{ width: '300px', display: 'block' }} />

            {/* 메타정보 컴포넌트로 분리 */}
            <ZzalMetaInfoView meta={zzalData.zzalMetaInfo} />
        </div>
    );
};

export default ZzalDetail;
