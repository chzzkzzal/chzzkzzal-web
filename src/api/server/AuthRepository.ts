// src/api/server/AuthRepository.ts
import axios from 'axios';
import AUTH_CONFIG from "../../config/AppConfig";
/**
 * Axios 클라이언트 설정
 *  - baseURL: 설정 파일의 API 기본 주소를 사용
 *  - withCredentials: 세션 쿠키를 사용하기 위해 true로 설정
 */
const apiClient = axios.create({
    baseURL: AUTH_CONFIG.apiBaseUrl, // 하드코딩 대신 설정값 사용
    withCredentials: true,
});

export interface CustomResponse<T> {
    status: string;
    code: string;
    message: string;
    result: T;
}

interface LoginCheckResponse {
    loggedIn: boolean;
}

export class AuthRepository {
    async checkLogin(): Promise<boolean> {
        const response = await apiClient.get<CustomResponse<LoginCheckResponse>>('/api/auth/check');
        return response.data.result.loggedIn;
    }
    async logout(): Promise<void> {
        await apiClient.post('/api/auth/logout');
    }
}

const authRepository = new AuthRepository();
export default authRepository;
