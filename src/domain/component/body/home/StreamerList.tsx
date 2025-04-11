// src/components/StreamerList.tsx
import React, { useEffect, useState } from "react";
import streamerRepository, { GetStreamerResponse } from "../../../../api/server/StreamerRepository";
import "./StreamerList.css";

interface StreamerListProps {
    onSelect: (streamerId: string) => void;
    selectedStreamerId: string | null;
}

const StreamerList: React.FC<StreamerListProps> = ({ onSelect, selectedStreamerId }) => {
    const [streamers, setStreamers] = useState<GetStreamerResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStreamers = async () => {
            try {
                const data = await streamerRepository.getAllStreamers();
                setStreamers(data);
            } catch (err) {
                setError("스트리머 목록을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchStreamers();
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="streamer-list-container">
            {streamers.map((streamer) => (
                <div
                    key={streamer.streamerId}
                    className={`streamer-card ${selectedStreamerId === streamer.streamerId ? 'selected' : ''}`}
                    onClick={() => onSelect(streamer.streamerId)}
                >
                    <img src={streamer.channelImageUrl} alt={streamer.channelName} className="streamer-card-image" />
                    <div className="streamer-card-info">
                        <h3 className="streamer-card-name">{streamer.channelName}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StreamerList;
