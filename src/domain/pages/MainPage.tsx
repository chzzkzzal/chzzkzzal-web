import React, { useState } from "react";
import ZzalList from "../component/body/home/ZzalList";
import StreamerList from "../component/body/home/StreamerList";
import "./MainPage.css";

const MainPage: React.FC = () => {
    // 상태 변수명을 selectedChannelId로 변경
    const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

    const handleStreamerSelect = (channelId: string) => {
        setSelectedChannelId((prev) => (prev === channelId ? null : channelId));
    };

    return (
        <div className="main-page-container">
            <StreamerList onSelect={handleStreamerSelect} selectedChannelId={selectedChannelId} />
            <ZzalList channelId={selectedChannelId || undefined} />
        </div>
    );
};

export default MainPage;
