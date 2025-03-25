// src/components/ZzalList.tsx
import React, { useEffect, useState } from 'react';
import zzalRepository, { ZzalDetailResponse } from '../api/server/zzalRepository';
import { Link } from 'react-router-dom';

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
        <div>
            <h1>전체 짤 목록</h1>
            <ul>
                {zzals.map(zzal => (
                    <li key={zzal.zzalId} style={{ margin: '10px 0' }}>
                        {/* Link로 감싸서 클릭 시 상세 페이지 이동 */}
                        <Link to={`/zzal/${zzal.zzalId}`}>
                            <img
                                src={zzal.url}
                                alt={`zzal-${zzal.zzalId}`}
                                style={{ width: '200px', display: 'block' }}
                            />
                            <p>멤버 ID: {zzal.writerId}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ZzalList;
