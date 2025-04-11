// src/components/ZzalList.tsx
import React, { useEffect, useState } from "react";
import zzalRepository from "../../../../api/server/zzalRepository";
import streamerRepository, { GetStreamerResponse } from "../../../../api/server/StreamerRepository";
import { ZzalDetailResponse } from "../../../../api/server/zzalRepository";
import "./ZzalList.css";

interface ZzalListProps {
    streamerId?: string; // 선택된 스트리머가 있으면 해당 ID, 없으면 전체 짤 목록 호출
}

const ZzalList: React.FC<ZzalListProps> = ({ streamerId }) => {
    const [zzals, setZzals] = useState<ZzalDetailResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [streamerInfo, setStreamerInfo] = useState<GetStreamerResponse | null>(null);

    useEffect(() => {
        const fetchZzals = async () => {
            setLoading(true);
            try {
                if (streamerId) {
                    const [zzalData, info] = await Promise.all([
                        streamerRepository.getStreamerZzals(streamerId),
                        streamerRepository.getStreamerById(streamerId)
                    ]);
                    setZzals(zzalData);
                    setStreamerInfo(info);
                } else {
                    // 전체 짤 목록 조회
                    const zzalData = await zzalRepository.getAllZzals();
                    setZzals(zzalData);
                    setStreamerInfo(null);
                }
            } catch (err) {
                console.error("Failed to fetch zzals:", err);
                setError("짤 목록을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchZzals();
    }, [streamerId]);

    // if (loading) {
    //     return <div className="zzal-list-loading">로딩 중...</div>;
    // }
    if (error) {
        return <div className="zzal-list-error">{error}</div>;
    }
    if (zzals.length === 0) {
        return <div className="zzal-list-empty">등록된 짤이 없습니다.</div>;
    }

    const titleText =
        streamerId && streamerInfo
            ? `${streamerInfo.channelName} 짤`
            : "짤";

    return (
        <div className="zzal-list-container">
            <h1 className="zzal-list-title glitch" data-text={titleText}>
                {titleText}
            </h1>
            <ul className="zzal-list">
                {zzals.map((zzal) => (
                    <li key={zzal.zzalId} className="zzal-list-item">
                        <a href={`/zzal/${zzal.zzalId}`} className="zzal-list-link">
                            <img
                                src={zzal.url}
                                alt={`zzal-${zzal.zzalId}`}
                                className="zzal-image"
                                loading="lazy"
                            />
                            <p className="zzal-title">{zzal.title}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ZzalList;
