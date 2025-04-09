import React from 'react';
import './TagList.css';

interface TagListProps {
    tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    if (tags.length === 0) return null;

    return (
        <ul className="tag-view-list">
            {tags.map(tag => (
                <li key={tag} className="tag-view-chip">
                    #{tag}
                </li>
            ))}
        </ul>
    );
};

export default TagList;
