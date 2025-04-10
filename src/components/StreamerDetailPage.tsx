import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import streamerRepository, { GetStreamerResponse } from '../api/server/StreamerRepository';
import { ZzalDetailResponse } from '../api/server/zzalRepository';

const StreamerDetailPage: React.FC = () => {
    const { streamerId } = useParams<{ streamerId: string }>();

    const [streamer, setStreamer] = useState<GetStreamerResponse | null>(null);
    const [zzals, setZzals] = useState<ZzalDetailResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!streamerId) {
            setError('스트리머 ID가 제공되지 않았습니다.');
            setLoading(false);
            return;
        }

        const fetchAll = async () => {
            setLoading(true);
            try {
                // 문자열 ID로 스트리머 정보 & 짤 목록 병렬 호출
                const [streamerInfo, zzalList] = await Promise.all([
                    streamerRepository.getStreamerById(streamerId),
                    streamerRepository.getStreamerZzals(streamerId),
                ]);

                if (!streamerInfo) {
                    setError('해당 스트리머 정보를 찾을 수 없습니다.');
                    return;
                }

                setStreamer(streamerInfo);
                setZzals(zzalList);
            } catch (err) {
                console.error('Failed to fetch streamer data:', err);
                setError('스트리머 데이터를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [streamerId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    if (!streamer) {
        return <div>해당 스트리머가 존재하지 않습니다.</div>;
    }

    return (
        <div style={{ margin: '16px' }}>
            <h2>스트리머 상세 정보</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <img
                    src={streamer.channelImageUrl}
                    alt={streamer.channelName}
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <div>
                    <p>채널명: {streamer.channelName}</p>
                    <p>채널 ID: {streamer.channelId}</p>
                    <p>팔로워 수: {streamer.followerCount}</p>
                </div>
            </div>

            <hr />

            <h3>해당 스트리머의 짤 목록</h3>
            {zzals.length === 0 ? (
                <div>등록된 짤이 없습니다.</div>
            ) : (
                <ul>
                    {zzals.map((zzal) => (
                        <li key={zzal.zzalId} style={{ marginBottom: '12px' }}>
                            <div>
                                <strong>{zzal.title}</strong> (짤 ID: {zzal.zzalId})
                            </div>
                            <img
                                src={zzal.url}
                                alt={zzal.title}
                                style={{ width: '160px', marginTop: '8px' }}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StreamerDetailPage;
