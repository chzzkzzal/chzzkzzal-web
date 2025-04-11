import React, { useState, useEffect } from "react";
import MediaPreview from "./MediaPreview";
import CaptionInput from "./CaptionInput";
import HashtagInput from "./HashtagInput";
import StreamerSelect from "./StreamerSelect";
import Button from "./Button";
import ErrorMessage from "../../common/ErrorMessage";
import zzalRepository from "../../../../api/server/zzalRepository";           // 짤 업로드 API 호출 모듈
import zzalHashtagRepository from "../../../../api/server/zzalHashtagRepository"; // 해시태그 API 호출 모듈
import "./UploadModal.css";

export interface UploadData {
    file: File;
    caption: string;
    tags: string[];
}

interface UploadModalProps {
    onClose: () => void;
    onUploadSuccess: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [selectedStreamerId, setSelectedStreamerId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const maxCaptionLength = 20;
    const maxTags = 5;
    const maxTagLength = 20;

    // Esc 키를 눌렀을 때 모달 닫기 처리
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const handleUpload = async () => {
        // 검증: 파일, 캡션, 해시태그, 스트리머 모두 필요
        if (!selectedFile) {
            setErrorMsg("파일을 선택하세요.");
            return;
        }
        if (!caption) {
            setErrorMsg("제목을 입력하세요.");
            return;
        }
        if (tags.length === 0) {
            setErrorMsg("최소 1개의 해시태그가 필요합니다.");
            return;
        }
        if (tags.length > maxTags) {
            setErrorMsg(`최대 ${maxTags}개의 해시태그만 입력할 수 있습니다.`);
            return;
        }
        if (!selectedStreamerId) {
            setErrorMsg("스트리머를 선택하세요.");
            return;
        }
        setErrorMsg("");

        try {
            setIsUploading(true);
            // 1. 파일, 캡션, 스트리머 ID를 함께 업로드하여 짤 ID 받아오기
            const uploadId = await zzalRepository.uploadZzal(
                selectedFile,
                caption,
                Number(selectedStreamerId)
            );
            if (!uploadId) {
                setErrorMsg("업로드 실패: 서버에서 ID를 반환하지 않았습니다.");
                return;
            }
            // 2. 업로드 성공 후, 해시태그 등록 (태그 API 호출)
            await zzalHashtagRepository.tagZzal(uploadId, tags);
            alert("업로드 성공!");
            onUploadSuccess();
        } catch (error) {
            console.error("업로드 에러:", error);
            setErrorMsg("업로드에 실패했습니다.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="upload-modal-overlay">
            <div className="upload-modal-container">
                <h2 className="upload-modal-title">짤 업로드</h2>
                {/* 스트리머 선택 */}
                <StreamerSelect
                    selectedStreamerId={selectedStreamerId}
                    onChange={setSelectedStreamerId}
                />
                <MediaPreview file={selectedFile} onFileSelect={setSelectedFile} />
                <CaptionInput
                    caption={caption}
                    onCaptionChange={setCaption}
                    maxLength={maxCaptionLength}
                />
                <HashtagInput
                    tags={tags}
                    onTagsChange={setTags}
                    maxTags={maxTags}
                    maxTagLength={maxTagLength}
                />
                {errorMsg && <ErrorMessage message={errorMsg} />}
                <div className="upload-modal-buttons">
                    <Button onClick={onClose} label="취소" variant="secondary" disabled={isUploading} />
                    <Button onClick={handleUpload} label={isUploading ? "업로드 중..." : "업로드"} variant="primary" disabled={isUploading} />
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
