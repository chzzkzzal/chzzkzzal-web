// src/components/ZzalDetailPage.tsx
import React, { useEffect, useState } from 'react';
import zzalRepository, { ZzalDetailResponse } from '../api/server/zzalRepository';
import ZzalMetaInfoView from '../components/ZzalMetaInfoView';
import './ZzalDetailPage.css';
import TagList from "../components/TagList";
import zzalHashtagRepository from "../api/server/zzalHashtagRepository";
import { Link } from 'react-router-dom';

interface Props {
    zzalId: number;
}

// 날짜를 "YYYY-MM-DD HH:MM" 형식으로 포맷팅하는 함수
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const ZzalDetailPage: React.FC<Props> = ({ zzalId }) => {
    const [zzalData, setZzalData] = useState<ZzalDetailResponse | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let isUnmounted = false; // cleanup에서 unmounted 여부 확인용

        const fetchDetailAndTags = async () => {
            try {
                setIsLoading(true);

                // 상세 정보와 태그를 병렬로 받아온다.
                const [detail, tagList] = await Promise.all([
                    zzalRepository.getZzalDetail(zzalId),
                    zzalHashtagRepository.getTags(zzalId)
                ]);

                if (isUnmounted) return;

                if (!detail) {
                    setError('짤 정보를 불러올 수 없습니다.');
                    return;
                }

                setZzalData(detail);

                // 태그 세팅 (백엔드에서 제대로 내려주고 있는지 확인)
                console.log("태그 데이터:", tagList);
                setTags(Array.isArray(tagList) ? tagList : []);
            } catch (e) {
                console.error('Failed to fetch zzal details:', e);
                setError('짤 정보를 불러오는 데 실패했습니다.');
            } finally {
                if (!isUnmounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchDetailAndTags();

        return () => {
            isUnmounted = true;
        };
    }, [zzalId]);

    // 태그를 클릭하면 검색 페이지로 이동
    const handleTagClick = (tag: string) => {
        window.location.href = `/search?keyword=${encodeURIComponent(tag)}`;
    };

    if (isLoading) {
        return <div className="zzal-detail-container loading">로딩 중...</div>;
    }

    if (error) {
        return <div className="zzal-detail-container error">{error}</div>;
    }

    if (!zzalData) {
        return <div className="zzal-detail-container not-found">짤을 찾을 수 없습니다.</div>;
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

                {/* 해시태그 섹션 */}
                <div className="zzal-detail-tags-section">
                    <div className="zzal-detail-tags-header">
                        <h3>태그</h3>
                    </div>
                    {/* TagList에서 클릭 이벤트를 사용하려면 주석 해제 */}
                    <TagList tags={tags} /* onClick={handleTagClick} */ />
                </div>

                <div className="zzal-detail-info">
                    <p className="zzal-detail-writer">
                        <span className="info-label">By</span> {zzalData.writerChannelName}
                    </p>
                    <p className="zzal-detail-created">
                        <span className="info-label"></span> {formatDate(zzalData.createdAt)}
                    </p>
                </div>

                <ZzalMetaInfoView meta={zzalData.zzalMetaInfo} />
            </div>
        </div>
    );
};

export default ZzalDetailPage;
