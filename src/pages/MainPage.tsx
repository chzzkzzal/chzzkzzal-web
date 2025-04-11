// src/pages/MainPage.tsx
import React, { useState } from "react";
import ZzalList from "../components/ZzalList";
import StreamerList from "../components/StreamerList";
import "./MainPage.css";

const MainPage: React.FC = () => {
    const [selectedStreamerId, setSelectedStreamerId] = useState<string | null>(null);

    const handleStreamerSelect = (streamerId: string) => {
        setSelectedStreamerId((prev) => (prev === streamerId ? null : streamerId));
    };

    return (
        <div className="main-page-container">
            <StreamerList onSelect={handleStreamerSelect} selectedStreamerId={selectedStreamerId} />
            <ZzalList streamerId={selectedStreamerId || undefined} />
        </div>
    );
};

export default MainPage;
