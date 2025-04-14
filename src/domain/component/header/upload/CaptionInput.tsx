import React, { ChangeEvent } from "react";
import "./CaptionInput.css";

interface CaptionInputProps {
    caption: string;
    onCaptionChange: (caption: string) => void;
    maxLength: number;
}

const CaptionInput: React.FC<CaptionInputProps> = ({ caption, onCaptionChange, maxLength }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxLength) {
            onCaptionChange(e.target.value);
        }
    };
    return (
        <div className="caption-input-container">
      <textarea
          value={caption}
          onChange={handleChange}
          placeholder="짤 내용(제목)을 입력해주세요."
          className="caption-input"
      ></textarea>
            <div className="caption-char-count">{caption.length}/{maxLength}</div>
        </div>
    );
};

export default CaptionInput;
