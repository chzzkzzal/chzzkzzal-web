import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import streamerRepository, { GetStreamerResponse } from '../api/server/StreamerRepository';
import './StreamerList.css';

const StreamerList: React.FC = () => {
    const [streamers, setStreamers] = useState<GetStreamerResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // "더보기" 버튼 상태
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        const fetchStreamers = async () => {
            try {
                setIsLoading(true);
                const data = await streamerRepository.getAllStreamers();
                setStreamers(data);
            } catch (err) {
                console.error('Failed to fetch streamers:', err);
                setError('스트리머 목록을 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStreamers();
    }, []);

    if (isLoading) {
        return <div className="streamer-list-loading">스트리머 목록 로딩 중...</div>;
    }

    if (error) {
        return <div className="streamer-list-error">{error}</div>;
    }

    if (streamers.length === 0) {
        return <div className="streamer-list-empty">등록된 스트리머가 없습니다.</div>;
    }

    // expanded 상태면 전체, 아니면 최대 4개만 보이도록 슬라이스
    const displayedStreamers = expanded ? streamers : streamers.slice(0, 4);

    return (
        <div>
            {/* 실제 그리드 컨테이너 */}
            <div className="streamer-list-container">
                {displayedStreamers.map((streamer) => (
                    <Link
                        to={`/streamer/${streamer.streamerId}`}
                        key={streamer.streamerId}
                        className="streamer-card"
                    >
                        <img
                            src={streamer.channelImageUrl}
                            alt={streamer.channelName}
                            className="streamer-card-image"
                        />
                        <div className="streamer-card-info">
                            {/* 글리치 효과: data-text에 스트리머명 삽입 */}
                            <h3
                                className="streamer-card-name"
                                data-text={streamer.channelName}
                            >
                                {streamer.channelName}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

            {/* 5개 이상일 때만 "더보기" 버튼 표시 (이미 확장된 상태라면 숨김) */}
            {streamers.length > 4 && !expanded && (
                <button className="streamer-more-btn" onClick={() => setExpanded(true)}>
                    더보기 ({streamers.length - 4})
                </button>
            )}
        </div>
    );
};

export default StreamerList;
