// src/components/ZzalMetaInfoView.tsx

import React from 'react';
import { ZzalMetaInfo } from '../api/server/zzalRepository';

interface Props {
  meta: ZzalMetaInfo;
}

const ZzalMetaInfoView: React.FC<Props> = ({ meta }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>메타 정보</h3>

      {/* 공통 필드 */}
      <p>size: {meta.size}</p>
      <p>width: {meta.width}</p>
      <p>height: {meta.height}</p>
      <p>contentType: {meta.contentType}</p>
      <p>fileName: {meta.fileName}</p>

      {/* 타입이 GIF라면, GIF 전용 필드를 표시 */}
      {meta.zzalType === 'GIF' && (
        <>
          <p>frameCount: {meta.frameCount}</p>
          <p>totalDuration: {meta.totalDuration}</p>
        </>
      )}

      {/* PIC라면, PIC 전용 필드를 표시 (필요하다면) */}
      {meta.zzalType === 'PIC' && (
        <>
          {/* PIC만의 필드가 있으면 표시: 예) */}
          {/* <p>somePicField: {meta.somePicField}</p> */}
        </>
      )}
    </div>
  );
};

export default ZzalMetaInfoView;
