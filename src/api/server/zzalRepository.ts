import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 실제 서버 주소/포트에 맞추어 변경
    withCredentials: true // 반드시 이 설정이 있어야 쿠키 전송됨
});

export interface ZzalCreateRequest {
    title: string;
}

export interface ZzalDetailResponse {
    zzalId: number;
    url: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    writerId: number;
    writerChannelName: string;
    zzalMetaInfo: ZzalMetaInfo;   // <-- 중요: 아래에서 정의한 Union Type
}

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

export interface PicMetaInfo {
    zzalType: 'PIC';
    size: number;
    width: number;
    height: number;
    contentType: string;
    fileName: string;
}

export type ZzalMetaInfo = GifMetaInfo | PicMetaInfo;

export class ZzalRepository {
    /**
     * [POST] /zzals
     * 파일 업로드
     */
    async uploadZzal(file: File, title: string): Promise<number> {
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
        const res = await apiClient.post('/zzals', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        // 백엔드가 Long 하나(예: 123 또는 "123") 를 반환
        const id = Number(res.data);
        if (!Number.isFinite(id)) {
            throw new Error(`Upload response was not a valid number. data=${res.data}`);
        }
        return id;
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
