import axios from 'axios';
import { ZzalDetailResponse } from './zzalRepository';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 실제 서버 주소
    withCredentials: true,
});

export interface GetStreamerResponse {
    // 스트리머 PK (문자열)
    streamerId: string;
    channelId: string;
    channelName: string;
    channelImageUrl: string;
    followerCount: number;
}

class StreamerRepository {
    /**
     * 모든 스트리머 목록 조회
     */
    async getAllStreamers(): Promise<GetStreamerResponse[]> {
        const response = await apiClient.get('/streamers');
        // { status, code, message, result: [...스트리머목록...] }
        const { result } = response.data;
        return Array.isArray(result) ? result : [];
    }

    /**
     * 특정 스트리머 상세 조회
     */
    async getStreamerById(streamerId: string): Promise<GetStreamerResponse | null> {
        const response = await apiClient.get(`/streamers/${streamerId}`);
        const { result } = response.data;
        return result || null;
    }

    /**
     * 특정 스트리머의 짤 목록 조회
     */
    async getStreamerZzals(streamerId: string): Promise<ZzalDetailResponse[]> {
        const response = await apiClient.get(`/streamers/${streamerId}/zzals`);
        const { result } = response.data;
        return Array.isArray(result) ? result : [];
    }
}

const streamerRepository = new StreamerRepository();
export default streamerRepository;
