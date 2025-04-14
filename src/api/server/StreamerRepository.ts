// src/api/server/StreamerRepository.ts
import axios from 'axios';
import AUTH_CONFIG from "../../config/AppConfig";
const apiClient = axios.create({
    baseURL: AUTH_CONFIG.apiBaseUrl,
    withCredentials: true,
});

export interface GetStreamerResponse {
    streamerId: string;
    channelId: string;
    channelName: string;
    channelImageUrl: string;
    followerCount: number;
}

class StreamerRepository {
    async getAllStreamers(): Promise<GetStreamerResponse[]> {
        const response = await apiClient.get('/streamers');
        const { result } = response.data;
        return Array.isArray(result) ? result : [];
    }
    async getStreamerById(channelId: string): Promise<GetStreamerResponse | null> {
        const response = await apiClient.get(`/streamers/${channelId}`);
        const { result } = response.data;
        return result || null;
    }
    async getStreamerZzals(channelId: string): Promise<any[]> {
        const response = await apiClient.get(`/streamers/${channelId}/zzals`);
        const { result } = response.data;
        return Array.isArray(result) ? result : [];
    }
}

const streamerRepository = new StreamerRepository();
export default streamerRepository;
