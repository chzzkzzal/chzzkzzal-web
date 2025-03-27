// src/components/ZzalList.tsx
import React, { useEffect, useState } from 'react';
import zzalRepository, { ZzalDetailResponse } from '../api/server/zzalRepository';
import { Link } from 'react-router-dom';
import './ZzalList.css';  // 추가

const ZzalList: React.FC = () => {
    const [zzals, setZzals] = useState<ZzalDetailResponse[]>([]);

    useEffect(() => {
        const fetchZzals = async () => {
            try {
                const data = await zzalRepository.getAllZzals();
                setZzals(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchZzals();
    }, []);

    return (
        <div className="zzal-list-container">
            {/* 제목에 글리치 효과를 주기 위해 data-text 속성 사용 */}
            <h1
                className="zzal-list-title glitch"
                data-text="전체 짤 목록"
            >
                전체 짤 목록
            </h1>

            <ul className="zzal-list">
                {zzals.map((zzal) => (
                    <li key={zzal.zzalId} className="zzal-list-item">
                        <Link to={`/zzal/${zzal.zzalId}`} className="zzal-list-link">
                            <img
                                src={zzal.url}
                                alt={`zzal-${zzal.zzalId}`}
                                className="zzal-list-image"
                            />
                            <p className="zzal-list-writer">작성자: {zzal.writerChannelName}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ZzalList;
