import React, { ChangeEvent } from "react";
import "./MediaPreview.css";

interface MediaPreviewProps {
    file: File | null;
    onFileSelect: (file: File | null) => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ file, onFileSelect }) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div className="media-preview-container">
            {file ? (
                <img src={URL.createObjectURL(file)} alt="미리보기" className="media-preview-image" />
            ) : (
                <div className="media-preview-placeholder">
                    <span>JPG,PNG/GIF 선택</span>
                </div>
            )}
            <input type="file" accept="image/*, video/*" onChange={handleFileChange} className="media-preview-input" />
        </div>
    );
};

export default MediaPreview;
