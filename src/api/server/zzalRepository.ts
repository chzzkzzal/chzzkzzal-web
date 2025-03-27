import axios from 'axios';


/**
 * 예: ZzalCreateRequest
 * 서버측에서 title 받는 DTO
 */
export interface ZzalCreateRequest {
    title: string;
}
/**
 * 공통 응답 타입
 */
export interface ZzalDetailResponse {
    zzalId: number;
    url: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    writerId: number;
    writerChannelName: string;
    zzalMetaInfo: ZzalMetaInfo;   // <-- 중요: 아래서 정의한 Union Type
}

/**
 * "GIF" 타입의 메타정보
 */
export interface GifMetaInfo {
    zzalType: 'GIF';
    size: number;
    width: number;
    height: number;
    frameCount: number;
    totalDuration: number;
    contentType: string;
    fileName: string;
}

/**
 * "PIC" 타입의 메타정보
 */
export interface PicMetaInfo {
    zzalType: 'PIC';
    size: number;
    width: number;
    height: number;
    contentType: string;
    fileName: string;
    // 필요하면 PicInfo만의 추가 필드를 여기에
}

/**
 * ZzalMetaInfo = GifMetaInfo | PicMetaInfo
 * (타입 식별자 'zzalType'으로 분기)
 */
export type ZzalMetaInfo = GifMetaInfo | PicMetaInfo;
// axios 공통 설정 (Base URL 등)
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 실제 서버 주소/포트에 맞추어 변경
});

/**
 * ZzalRepository:
 * Zzal 관련 API 호출을 전담하는 Repository 클래스
 */
export class ZzalRepository {
    /**
     * [POST] /zzals
     * 파일 업로드
     */
    async uploadZzal(file: File, title: string): Promise<void> {
        const formData = new FormData();

        // 멀티파트 "file" 파트에 단일 파일
        formData.append('file', file);

        // "zzalCreateRequest" 파트에 JSON (예: { title: '...' })
        const createRequest = { title };
        const jsonBlob = new Blob([JSON.stringify(createRequest)], {
            type: 'application/json',
        });
        formData.append('zzalCreateRequest', jsonBlob);

        // 전송
        await apiClient.post('/zzals', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
    /**
     * [GET] /zzals/{zzalId}
     * 특정 ZzalId에 대한 상세 정보
     */
    async getZzalDetail(zzalId: number): Promise<ZzalDetailResponse> {
        const response = await apiClient.get<ZzalDetailResponse>(`/zzals/${zzalId}`);
        return response.data;
    }

    /**
     * [GET] /zzals
     * 모든 Zzal 목록
     */
    async getAllZzals(): Promise<ZzalDetailResponse[]> {
        const response = await apiClient.get<ZzalDetailResponse[]>('/zzals');
        console.log(response);

        return response.data;
    }
}

// 인스턴스 싱글턴 활용 예시
const zzalRepository = new ZzalRepository();
export default zzalRepository;
