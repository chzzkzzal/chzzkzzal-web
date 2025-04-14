import axios from 'axios';
import AUTH_CONFIG from "../../config/AppConfig";
const apiClient = axios.create({
    baseURL: AUTH_CONFIG.apiBaseUrl,
    withCredentials: true // 반드시 이 설정이 있어야 쿠키 전송됨
});

// 실제 서버 응답 형식에 맞춘 인터페이스
export interface ServerResponse<T> {
    status: string;
    code: string;
    message: string;
    result: T;
}

// 이제 ZzalCreateRequest는 숫자형 streamerId 대신 문자열 channelId를 사용합니다.
export interface ZzalCreateRequest {
    title: string;
    channelId: string;
}

export interface ZzalDetailResponse {
    zzalId: number;
    url: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    writerId: number;
    writerChannelName: string;
    zzalMetaInfo: ZzalMetaInfo;
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
    async uploadZzal(file: File, title: string, channelId: string): Promise<number> {
        const formData = new FormData();
        // 멀티파트 "file" 파트에 단일 파일
        formData.append('file', file);

        // "zzalCreateRequest" 파트에 JSON으로 { title, channelId } 전송
        const createRequest: ZzalCreateRequest = { title, channelId };
        const jsonBlob = new Blob([JSON.stringify(createRequest)], {
            type: 'application/json',
        });
        formData.append('zzalCreateRequest', jsonBlob);

        try {
            // 전송
            const res = await apiClient.post<ServerResponse<number>>('/zzals', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            console.log('Upload response:', res.data);

            // ServerResponse 형식 처리
            if (res.data && res.data.result !== undefined) {
                const id = res.data.result;
                if (!Number.isFinite(id)) {
                    throw new Error(`Upload response was not a valid number. result=${res.data.result}`);
                }
                return id;
            } else {
                throw new Error(`Invalid response format: ${JSON.stringify(res.data)}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data);
                throw new Error(`Upload failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    /**
     * [GET] /zzals/{zzalId}
     * 특정 ZzalId에 대한 상세 정보
     */
    async getZzalDetail(zzalId: number): Promise<ZzalDetailResponse> {
        try {
            const response = await apiClient.get<ServerResponse<ZzalDetailResponse>>(`/zzals/${zzalId}`);

            if (response.data && response.data.result) {
                return response.data.result;
            }
            throw new Error(`Invalid response format: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error(`Error fetching zzal detail for ID ${zzalId}:`, error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data);
            }
            throw error;
        }
    }

    /**
     * [GET] /zzals
     * 모든 Zzal 목록
     */
    async getAllZzals(): Promise<ZzalDetailResponse[]> {
        try {
            const response = await apiClient.get<ServerResponse<ZzalDetailResponse[]>>('/zzals');
            console.log('getAllZzals response:', response.data);

            if (response.data && Array.isArray(response.data.result)) {
                return response.data.result;
            } else {
                console.error('Invalid getAllZzals response format:', response.data);
                return [];
            }
        } catch (error) {
            console.error('Error fetching all zzals:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data);
            }
            return [];
        }
    }
}

// 인스턴스 싱글턴 활용 예시
const zzalRepository = new ZzalRepository();
export default zzalRepository;
