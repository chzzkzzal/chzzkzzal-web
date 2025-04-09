import React, { useState, KeyboardEvent } from 'react';
import zzalHashtagRepository from '../api/server/zzalHashtagRepository';
import './TagEditor.css';

interface TagEditorProps {
    zzalId: number;
    onDone?: () => void;   // 태그 등록 완료 후 실행할 콜백
}

const TagEditor: React.FC<TagEditorProps> = ({ zzalId, onDone }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const maxTagLen = 20;      // 태그 글자수 제한 예시

    /* 엔터(또는 쉼표) 입력 시 태그 추가 */
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' && e.key !== ',') return;

        e.preventDefault();
        const trimmed = input.trim();

        if (!trimmed) return;
        if (trimmed.length > maxTagLen) {
            alert(`태그는 최대 ${maxTagLen}글자까지 가능합니다`);
            return;
        }
        if (tags.includes(trimmed)) return; // 중복 방지

        setTags([...tags, trimmed]);
        setInput('');
    };

    /* 태그 삭제 */
    const removeTag = (tag: string) =>
        setTags(tags.filter(t => t !== tag));

    /* 백엔드 전송 */
    const submit = async () => {
        if (tags.length === 0) {
            alert('최소 1개 이상의 태그를 입력해 주세요.');
            return;
        }
        try {
            setLoading(true);
            await zzalHashtagRepository.tagZzal(zzalId, tags);
            alert('태그가 저장되었습니다!');
            onDone?.();
        } catch (err: any) {
            console.error(err);
            alert('태그 저장 중 오류가 발생했습니다 🥲');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tag-editor">
            <label className="tag-editor-label">태그 입력</label>
            <input
                type="text"
                placeholder="태그 입력 후 Enter"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
            />

            <ul className="tag-list">
                {tags.map(tag => (
                    <li key={tag} className="tag-chip">
                        {tag}
                        <button
                            className="tag-remove"
                            onClick={() => removeTag(tag)}
                            disabled={loading}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>

            <button
                className="tag-submit-button"
                onClick={submit}
                disabled={loading}
            >
                {loading ? '저장 중...' : '태그 저장'}
            </button>
        </div>
    );
};

export default TagEditor;
