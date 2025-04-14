// src/components/StreamerSelect.tsx
import React, { useEffect, useState } from "react";
import streamerRepository, { GetStreamerResponse } from "../../../../api/server/StreamerRepository";
import "./StreamerSelect.css";

interface StreamerSelectProps {
    selectedChannelId: string | null;
    onChange: (channelId: string) => void;
}

const StreamerSelect: React.FC<StreamerSelectProps> = ({ selectedChannelId, onChange }) => {
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
        <div className="streamer-select-container">
            <select
                value={selectedChannelId || ""}
                onChange={(e) => onChange(e.target.value)}
                className="streamer-select"
            >
                <option value="" disabled>
                    스트리머 선택
                </option>
                {streamers.map((streamer) => (
                    <option key={streamer.channelId} value={streamer.channelId}>
                        {streamer.channelName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StreamerSelect;
