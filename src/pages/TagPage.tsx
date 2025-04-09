// src/pages/TagPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TagEditor from '../components/TagEditor';

const TagPage: React.FC = () => {
    const { id } = useParams();          // /zzals/:id/tag
    const navigate = useNavigate();

    if (!id) return <p>잘못된 경로입니다</p>;

    return (
        <TagEditor
            zzalId={Number(id)}
            onDone={() => navigate('/')}
        />
    );
};

export default TagPage;
