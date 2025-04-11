import React from 'react';
import './TagList.css';

interface TagListProps {
    tags: string[];
    onClick?: (tag: string) => void; // 태그 클릭 시 실행할 콜백 (옵션)
}

const TagList: React.FC<TagListProps> = ({ tags, onClick }) => {
    // 태그가 없을 때 메시지 표시
    if (!tags || tags.length === 0) {
        return <div className="tag-list-empty">등록된 태그가 없습니다</div>;
    }

    return (
        <div className="tag-list-container">
            {tags.map(tag => (
                <span
                    key={tag}
                    className="tag-item"
                    onClick={() => onClick && onClick(tag)}
                >
          #{tag}
        </span>
            ))}
        </div>
    );
};

export default TagList;
