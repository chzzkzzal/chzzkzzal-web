import React, { KeyboardEvent, useState, ChangeEvent } from "react";
import "./HashtagInput.css";

interface HashtagInputProps {
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    maxTags: number;
    maxTagLength: number;
}

const HashtagInput: React.FC<HashtagInputProps> = ({ tags, onTagsChange, maxTags, maxTagLength }) => {
    const [input, setInput] = useState("");
    const [isComposing, setIsComposing] = useState(false);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // 입력 중일 때는 이벤트 무시
        if (isComposing) return;

        if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = input.trim();
            if (!trimmed) return;
            if (trimmed.length > maxTagLength) {
                alert(`태그는 최대 ${maxTagLength} 글자까지 가능합니다.`);
                return;
            }
            if (tags.includes(trimmed)) {
                setInput("");
                return;
            }
            if (tags.length >= maxTags) {
                alert("최대 태그 수에 도달했습니다.");
                setInput("");
                return;
            }
            onTagsChange([...tags, trimmed]);
            setInput("");
        }
    };

    const handleRemove = (tag: string) => {
        onTagsChange(tags.filter(t => t !== tag));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
        setIsComposing(false);
    };

    return (
        <div className="hashtag-input-container">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                placeholder="최소 1개의 태그 입력 & Enter"
                className="hashtag-text-input"
            />
            <div className="hashtag-chips">
                {tags.map(tag => (
                    <span key={tag} className="hashtag-chip">
                        {tag} <span className="remove-chip" onClick={() => handleRemove(tag)}>×</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default HashtagInput;
