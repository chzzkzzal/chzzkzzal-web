import React, { useEffect, useState } from "react";
import streamerRepository, { GetStreamerResponse } from "../api/server/StreamerRepository";
import "./StreamerSelect.css";

interface StreamerSelectProps {
    selectedStreamerId: string | null;
    onChange: (id: string) => void;
}

const StreamerSelect: React.FC<StreamerSelectProps> = ({ selectedStreamerId, onChange }) => {
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
                value={selectedStreamerId || ""}
                onChange={(e) => onChange(e.target.value)}
                className="streamer-select"
            >
                <option value="" disabled>
                    스트리머 선택
                </option>
                {streamers.map((streamer) => (
                    <option key={streamer.streamerId} value={streamer.streamerId}>
                        {streamer.channelName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StreamerSelect;
