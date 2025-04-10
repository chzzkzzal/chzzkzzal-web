// src/components/ZzalList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import zzalRepository, { ZzalDetailResponse } from '../api/server/zzalRepository';
import './ZzalList.css';

const ZzalList: React.FC = () => {
    const [zzals, setZzals] = useState<ZzalDetailResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchZzals = async () => {
            try {
                setIsLoading(true);
                const data = await zzalRepository.getAllZzals();
                setZzals(data);
            } catch (err) {
                console.error('Failed to fetch zzals:', err);
                setError('짤 목록을 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchZzals();
    }, []);

    if (isLoading) {
        return <div className="zzal-list-loading">Loading...</div>;
    }

    if (error) {
        return <div className="zzal-list-error">{error}</div>;
    }

    return (
        <div className="zzal-list-container">
            <h1 className="zzal-list-title glitch" data-text="전체 짤 목록">
                전체 짤 목록
            </h1>

            {zzals.length === 0 ? (
                <p className="zzal-list-empty">등록된 짤이 없습니다.</p>
            ) : (
                <ul className="zzal-list">
                    {zzals.map((zzal) => (
                        <li key={zzal.zzalId} className="zzal-list-item">
                            <Link to={`/zzal/${zzal.zzalId}`} className="zzal-list-link">
                                <img
                                    src={zzal.url}
                                    alt={`zzal-${zzal.zzalId}`}
                                    className="zzal-image"
                                    loading="lazy" // 지연 로딩
                                />
                                <p className="zzal-writer">
                                    작성자: {zzal.writerChannelName}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ZzalList;
