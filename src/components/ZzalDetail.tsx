import React, { useEffect, useState, useRef } from 'react';
import zzalRepository, { ZzalDetailResponse } from '../api/server/zzalRepository';
import ZzalMetaInfoView from './ZzalMetaInfoView';
import './ZzalDetail.css';
import TagList from "./TagList";
import zzalHashtagRepository from "../api/server/zzalHashtagRepository";

interface Props {
    zzalId: number;
}
const ZzalDetail: React.FC<Props> = ({ zzalId }) => {
    const [zzalData, setZzalData] = useState<ZzalDetailResponse | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const alreadyFetchedRef = useRef(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // 상세 + 태그를 병렬로 요청
                const [detail, tagList] = await Promise.all([
                    zzalRepository.getZzalDetail(zzalId),
                    zzalHashtagRepository.getTags(zzalId)
                ]);
                setZzalData(detail);
                setTags(tagList);
            } catch (error) {
                console.error(error);
            }
        };

        if (!alreadyFetchedRef.current) {
            alreadyFetchedRef.current = true;
            fetchDetail();
        }
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

                {/* 해시태그 표시 */}
                <TagList tags={tags} />

                <div className="zzal-detail-info">
                    <p className="zzal-detail-writer">
                        <span className="info-label">작성자</span>: {zzalData.writerChannelName}
                    </p>
                    <p className="zzal-detail-created">
                        <span className="info-label">생성일</span>: {zzalData.createdAt}
                    </p>
                </div>

                <ZzalMetaInfoView meta={zzalData.zzalMetaInfo} />
            </div>
        </div>
    );
};

export default ZzalDetail;
