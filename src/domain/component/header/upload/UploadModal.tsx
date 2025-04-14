// src/components/UploadModal.tsx
import React, { useState, useEffect } from "react";
import MediaPreview from "./MediaPreview";
import CaptionInput from "./CaptionInput";
import HashtagInput from "./HashtagInput";
import StreamerSelect from "./StreamerSelect";
import Button from "./Button";
import ErrorMessage from "../../common/ErrorMessage";
import ChzzkLoginButton from "../../header/login/ChzzkLoginButton";
import zzalRepository from "../../../../api/server/zzalRepository";           // 짤 업로드 API 호출 모듈
import zzalHashtagRepository from "../../../../api/server/zzalHashtagRepository"; // 해시태그 API 호출 모듈
import authRepository from "../../../../api/server/AuthRepository"; // 로그인 체크를 위한 모듈
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
    // 스트리머의 식별값은 이제 채널ID (string)로 관리
    const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    const maxCaptionLength = 20;
    const maxTags = 5;
    const maxTagLength = 20;

    // 모달 마운트 시 로그인 상태 확인
    useEffect(() => {
        const checkUserLogin = async () => {
            try {
                const loggedIn = await authRepository.checkLogin();
                setIsUserLoggedIn(loggedIn);
                if (!loggedIn) {
                    setErrorMsg("로그인이 필요합니다.");
                }
            } catch (err) {
                console.error("로그인 체크 오류:", err);
                setErrorMsg("로그인이 필요합니다.");
            }
        };
        checkUserLogin();
    }, []);

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
        if (!selectedChannelId) {
            setErrorMsg("스트리머를 선택하세요.");
            return;
        }
        setErrorMsg("");

        try {
            setIsUploading(true);
            // 업로드 API 호출 시 channelId (string)을 그대로 전달
            const uploadId = await zzalRepository.uploadZzal(
                selectedFile,
                caption,
                selectedChannelId
            );
            if (!uploadId) {
                setErrorMsg("업로드 실패: 서버에서 ID를 반환하지 않았습니다.");
                return;
            }
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

    // 로그인하지 않은 경우 업로드 UI 대신 메시지와 치지직 로그인 버튼 렌더링
    if (!isUserLoggedIn) {
        return (
            <div className="upload-modal-overlay">
                <div className="upload-modal-container">
                    <h2 className="upload-modal-title">짤 업로드</h2>
                    <ErrorMessage message={errorMsg} />
                    <div className="upload-modal-buttons">
                        <Button onClick={onClose} label="닫기" variant="secondary" />
                        {/* 치지직 로그인 버튼 렌더링 */}
                        <ChzzkLoginButton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="upload-modal-overlay">
            <div className="upload-modal-container">
                <h2 className="upload-modal-title">짤 업로드</h2>
                {/* 스트리머 선택 */}
                <StreamerSelect
                    selectedChannelId={selectedChannelId}
                    onChange={setSelectedChannelId}
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
